/* eslint-disable no-console */

import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from '@koa/router';
import { koaPlayground } from 'graphql-playground-middleware';
import { getGraphQLParameters, processRequest, shouldRenderGraphiQL, renderGraphiQL } from 'graphql-helix';

import { KoaContext } from './types';
import schema from './schema/schema';
import { getDataloaders } from './modules/loader/loaderRegister';

const app = new Koa<any, KoaContext>();
const router = new Router<any, KoaContext>();

app.use(bodyParser());
app.use(cors({ maxAge: 86400, origin: '*' }));

app.on('error', error => {
  console.error('Error while answering request', { error });
});

app.use(logger());

router.all('/playground', koaPlayground({ endpoint: '/graphql' }));

app.use(async (ctx, next) => {
  ctx.dataloaders = getDataloaders();
  await next();
});

router.all('/graphql', async ctx => {
  const { dataloaders, req, res, request, response } = ctx;
  req.body = req.body || request.body;

  // Determine whether we should render GraphiQL instead of returning an API response
  if (shouldRenderGraphiQL(req)) {
    response.type = 'text/html';
    response.body = renderGraphiQL();
  } else {
    // Extract the GraphQL parameters from the request
    const { operationName, query, variables } = getGraphQLParameters(req);

    // Validate and execute the query
    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => ({ dataloaders, koaContext: ctx }),
    });

    // processRequest returns one of three types of results depending on how the server should respond
    // 1) RESPONSE: a regular JSON payload
    // 2) MULTIPART RESPONSE: a multipart response (when @stream or @defer directives are used)
    // 3) PUSH: a stream of events to push back down the client for a subscription
    if (result.type === 'RESPONSE') {
      // We set the provided status and headers and just the send the payload back to the client
      result.headers.forEach(({ name, value }) => response.set(name, value));
      response.type = 'application/json';
      response.body = result.payload;
    } else if (result.type === 'MULTIPART_RESPONSE') {
      // Indicate we're sending a multipart response
      response.set({
        Connection: 'keep-alive',
        'Content-Type': 'multipart/mixed; boundary="-"',
        'Transfer-Encoding': 'chunked',
      });

      // If the request is closed by the client, we unsubscribe and stop executing the request
      res.on('close', () => {
        result.unsubscribe();
      });

      response.body = '---';

      // Subscribe and send back each result as a separate chunk. We await the subscribe
      // call. Once we're done executing the request and there are no more results to send
      // to the client, the Promise returned by subscribe will resolve and we can end the response.
      await result.subscribe(result => {
        const chunk = Buffer.from(JSON.stringify(result), 'utf8');
        const data = [
          '',
          'Content-Type: application/json; charset=utf-8',
          'Content-Length: ' + String(chunk.length),
          '',
          chunk,
        ];

        if (result.hasNext) {
          data.push('---');
        }

        res.write(data.join('\r\n'));
      });

      res.write('\r\n-----\r\n');
      res.end();
    } else {
      console.log('subscription');

      // Indicate we're sending an event stream to the client
      response.set({
        'Content-Type': 'text/event-stream',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache',
      });

      // If the request is closed by the client, we unsubscribe and stop executing the request
      res.on('close', () => {
        result.unsubscribe();
      });

      // We subscribe to the event stream and push any new events to the client
      await result.subscribe(result => {
        res.write(`data: ${JSON.stringify(result)}\n\n`);
      });
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
