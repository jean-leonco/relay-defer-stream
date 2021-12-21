/* eslint-disable no-console */

import { createServer } from 'http';

import app from './app';
import { connectDatabase } from './database';

const runServer = async () => {
  try {
    console.log('\n🔗 Connecting to database...');
    await connectDatabase();
  } catch (error) {
    console.error('Could not connect to database', { error });
    throw error;
  }

  const server = createServer(app.callback());

  server.listen(5001, () => {
    console.info(`\n🚀 Server started at http://127.0.01:5001/graphql`);
  });
};

(async () => {
  console.log('📡 Server starting...');
  await runServer();
})();
