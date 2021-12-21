import { Environment, Network, RecordSource, Store, Observable, FetchFunction, PayloadData } from 'relay-runtime';
import { ExecutionPatchResult } from 'graphql';
import { meros } from 'meros/browser';

const fetchFn: FetchFunction = (params, variables) => {
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

      const parts = await meros<ExecutionPatchResult<PayloadData>>(response);

      if (isAsyncIterable(parts)) {
        for await (const part of parts) {
          if (!part.json) {
            sink.error(new Error('Failed to parse part as json.'));
            break;
          }

          sink.next(part.body);
        }
      } else {
        sink.next(await parts.json());
      }

      sink.complete();
    })();
  });
};

// https://github.com/maraisr/meros/blob/main/examples/relay-with-helix/app/relay.ts#L71
function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
  return (
    typeof input === 'object' &&
    input !== null &&
    // Some browsers still don't have Symbol.asyncIterator implemented (iOS Safari)
    // That means every custom AsyncIterable must be built using a AsyncGeneratorFunction (async function * () {})
    ((input as any)[Symbol.toStringTag] === 'AsyncGenerator' || Symbol.asyncIterator in input)
  );
}

export const environment = new Environment({
  network: Network.create(fetchFn),
  store: new Store(new RecordSource()),
});
