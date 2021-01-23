import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { cacheHandler, setupSubscription } from './helpers';

const network = Network.create(cacheHandler, setupSubscription);

const store = new Store(new RecordSource(), {
  gcReleaseBufferSize: 10,
});

const relayEnvironment = new Environment({
  network,
  store,
});

export default relayEnvironment;
