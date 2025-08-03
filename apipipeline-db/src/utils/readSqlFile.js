'use strict';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readSqlFile = (relativePath, filename) => {
  const filePath = path.join(
    __dirname,
    `../schemas/${relativePath}/${filename}.sql`
  );
  return fs.readFileSync(filePath, 'utf8');
};

export default readSqlFile;
