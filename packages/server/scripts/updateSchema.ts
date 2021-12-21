import fs from 'fs';
import path from 'path';

import { printSchema } from 'graphql';

import schema from '../src/schema/schema';

fs.writeFileSync(path.join(__dirname, `../../schema/schema.graphql`), printSchema(schema));
