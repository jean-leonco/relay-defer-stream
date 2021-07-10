import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import { setupSubscription, fetchQuery } from './helpers';

const relayEnvironment = new Environment({
  network: Network.create(fetchQuery, setupSubscription),
  store: new Store(new RecordSource()),
});

export default relayEnvironment;
