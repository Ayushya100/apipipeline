'use strict';

import knex from 'knex';
import 'dotenv/config';
import { logger } from '@ayushya100/common-node-lib';
import knexConfig from '../knexfile.js';

const log = logger('migration');

(async () => {
  try {
    log.info('Running migrations...');
    await knex(knexConfig[process.env.DB_ENV]).migrate.latest();

    log.info('Migrations completed successfully');
    process.exit(0);
  } catch (err) {
    log.error(`Migrations failed: ${err}`);
    process.exit(1);
  }
})();
