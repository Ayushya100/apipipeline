'use strict';

import knex from 'knex';
import 'dotenv/config';
import { logger } from '@ayushya100/common-node-lib';
import knexConfig from '../knexfile.js';
import runSeeder from '../db-loader/seed-data.js';

const log = logger('seeding');

(async () => {
  try {
    log.info('Running seeds...');
    const db = knex(knexConfig[process.env.DB_ENV]);
    await runSeeder(db);

    log.info('Seeding completed successfully');
    process.exit(0);
  } catch (err) {
    log.error(`Seeding failed: ${err}`);
    process.exit(1);
  }
})();
