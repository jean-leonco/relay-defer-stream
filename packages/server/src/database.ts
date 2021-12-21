/* eslint-disable no-console */

import mongoose from 'mongoose';

import { MONGO_URI } from './config';

export const connectDatabase = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', (error) => {
        console.log('\n❌ ERROR: Connection to DB failed');
        reject(error);
      })

      .on('close', () => {
        console.log('\n🛑 ERROR: Connection to DB lost');
        process.exit(1);
      })
      .once('open', () => {
        const infos = mongoose.connections;
        infos.map((info) => console.log(`⛓️  Connected to ${info.host}:${info.port}/${info.name}`));
        resolve();
      });

    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });
};
