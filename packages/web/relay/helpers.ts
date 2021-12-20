import {
  CacheConfig,
  RequestParameters,
  Observable,
  SubscribeFunction,
  FetchFunction,
  PayloadData,
} from 'relay-runtime';
import { Subscription } from 'sse-z';
import { GraphQLError } from 'graphql';
import { meros } from 'meros/browser';

export interface ExecutionPatchResult<TData = { [key: string]: any }, TExtensions = { [key: string]: any }> {
  errors?: ReadonlyArray<GraphQLError>;
  data?: TData | null;
  path?: ReadonlyArray<string | number>;
  label?: string;
  hasNext: boolean;
  extensions?: TExtensions;
}

export const isMutation = (request: RequestParameters) => request.operationKind === 'mutation';

export const isQuery = (request: RequestParameters) => request.operationKind === 'query';

export const forceFetch = (cacheConfig: CacheConfig) => !!(cacheConfig && cacheConfig.force);

export const setupSubscription: SubscribeFunction = (operation, variables) => {
  return Observable.create((sink) => {
    return new Subscription({
      url: 'http://localhost:5001/graphql',
      searchParams: {
        operationName: operation.name,
        query: operation.text!,
        variables: JSON.stringify(variables),
      },
      onNext: (data) => {
        sink.next(JSON.parse(data));
      },
    });
  });
};

export const fetchQuery: FetchFunction = (params, variables) => {
  return Observable.create((sink) => {
    (async () => {
      const response = await fetch('http://localhost:5001/graphql', {
        body: JSON.stringify({
          query: params.text,
          variables,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const parts = await meros<ExecutionPatchResult>(response);

      if (isAsyncIterable(parts)) {
        for await (const part of parts) {
          if (!part.json) {
            sink.error(new Error('Failed to parse part as json.'));
            break;
          }

          const { data, path, hasNext, label } = part.body;

          if (hasNext)
            sink.next({
              data: data as PayloadData,
              path: path as (string | number)[],
              label,
              extensions: {
                is_final: !hasNext,
              },
            });
        }
      } else {
        sink.next(await parts.json());
      }

      sink.complete();
    })();
  });
};

function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
  return (
    typeof input === 'object' &&
    input !== null &&
    // Some browsers still don't have Symbol.asyncIterator implemented (iOS Safari)
    // That means every custom AsyncIterable must be built using a AsyncGeneratorFunction (async function * () {})
    ((input as any)[Symbol.toStringTag] === 'AsyncGenerator' || Symbol.asyncIterator in input)
  );
}
