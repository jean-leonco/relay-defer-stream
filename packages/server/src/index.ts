/* eslint-disable no-console */

import { createServer } from 'http';

import { connectDatabase } from './database';
import app from './app';
import { PROTOCOL, GRAPHQL_HOST, GRAPHQL_PORT, isProduction } from './config';

const runServer = async () => {
  try {
    console.log('\n🔗 Connecting to database...');
    await connectDatabase();
  } catch (error) {
    console.error('Could not connect to database', { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(GRAPHQL_PORT, () => {
    console.info(`\n🚀 Server started at ${PROTOCOL}://${GRAPHQL_HOST}:${GRAPHQL_PORT}`);

    if (!isProduction) {
      console.info(`\n🎠 GraphQL Playground available at ${PROTOCOL}://${GRAPHQL_HOST}:${GRAPHQL_PORT}/playground\n`);
    }
  });
};

(async () => {
  console.log('\n📡 Server starting...');
  await runServer();
})();
