import 'core-js';
// eslint-disable-next-line import/no-unresolved
import fs from 'fs/promises';
import path from 'path';

import { printSchema } from 'graphql/utilities';

import schema from '../src/schema/schema';

(async () => {
  await fs.writeFile(
    path.join(__dirname, `../../schema/schema.graphql`),
    printSchema(schema)
  );
  process.exit(0);
})();
