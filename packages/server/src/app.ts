/* eslint-disable no-console */

import { PassThrough } from 'stream';

import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from '@koa/router';
import { getGraphQLParameters, processRequest, shouldRenderGraphiQL, renderGraphiQL } from 'graphql-helix';

import schema from './schema/schema';
import { getDataloaders } from './loader/loaderRegister';

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(cors({ maxAge: 86400, origin: '*' }));

app.use(logger());

router.all('/graphql', async (ctx) => {
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.type = 'text/html';
    ctx.body = renderGraphiQL();
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => ({ dataloaders: getDataloaders(), koaContext: ctx }),
    });

    if (result.type === 'RESPONSE') {
      result.headers.forEach(({ name, value }) => ctx.response.set(name, value));
      ctx.status = result.status;
      ctx.body = result.payload;
    } else if (result.type === 'PUSH') {
      ctx.req.socket.setTimeout(0);
      ctx.req.socket.setNoDelay(true);
      ctx.req.socket.setKeepAlive(true);

      ctx.set({
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      });

      const stream = new PassThrough();

      stream.on('close', () => {
        result.unsubscribe();
      });

      ctx.status = 200;
      ctx.body = stream;

      result.subscribe((result) => {
        stream.write(`data: ${JSON.stringify(result)}\n\n`);
      });
    } else {
      ctx.req.socket.setTimeout(0);
      ctx.req.socket.setNoDelay(true);
      ctx.req.socket.setKeepAlive(true);

      ctx.set({
        Connection: 'keep-alive',
        'Content-Type': 'multipart/mixed; boundary="-"',
        'Transfer-Encoding': 'chunked',
      });

      const stream = new PassThrough();

      stream.on('close', () => {
        result.unsubscribe();
      });

      ctx.status = 200;
      ctx.body = stream;

      stream.write('---');

      result
        .subscribe((result) => {
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

          stream.write(data.join('\r\n'));
        })
        .then(() => {
          stream.write('\r\n-----\r\n');
          stream.end();
        });
    }
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
