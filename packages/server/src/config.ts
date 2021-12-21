import path from 'path';

import dotenv from 'dotenv';
import { cleanEnv, str, url } from 'envalid';

const cwd = process.cwd();
const root = path.join.bind(cwd);

dotenv.config({
  path: root('.env'),
});

export const { NODE_ENV, MONGO_URI } = cleanEnv(process.env, {
  NODE_ENV: str({
    desc: 'Application node environment.',
    choices: ['development', 'test', 'production'],
  }),
  MONGO_URI: url({
    desc: 'MongoDB connection URI.',
    default: 'mongodb://localhost/relay',
  }),
});
