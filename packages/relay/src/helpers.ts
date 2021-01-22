import { CacheConfig, GraphQLResponse, QueryResponseCache, RequestParameters, Variables } from 'relay-runtime';

import fetchQuery from './fetchQuery';

export const isMutation = (request: RequestParameters) => request.operationKind === 'mutation';

export const isQuery = (request: RequestParameters) => request.operationKind === 'query';

export const forceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);

export const GRAPHQL_URL = process.env.GRAPHQL_URL!;

export const handleData = (response: Response): Promise<GraphQLResponse | string> => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();
  }

  return response.text();
};

export const getRequestBody = (request: RequestParameters, variables: Variables) => {
  return JSON.stringify({
    name: request.name,
    query: request.text,
    variables,
  });
};

export const relayResponseCache = new QueryResponseCache({
  size: 250,
  ttl: 60 * 1000,
});

export const cacheHandler = async (request: RequestParameters, variables: Variables, cacheConfig: CacheConfig) => {
  const queryID = request.text!;

  if (isMutation(request)) {
    relayResponseCache.clear();
    return fetchQuery(request, variables);
  }

  const fromCache = relayResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchQuery(request, variables);
  if (fromServer) {
    relayResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};
