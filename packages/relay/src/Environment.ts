import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { cacheHandler } from './helpers';

const network = Network.create(cacheHandler);
const relayEnvironment = new Environment({
  network,
  store: new Store(new RecordSource(), {
    gcReleaseBufferSize: 10,
  }),
});

export default relayEnvironment;
