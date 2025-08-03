'use strict';

import { logger } from '@ayushya100/common-node-lib';

const log = logger('DB: uuid-extension');

const up = (knex) => {
  log.info('UUID extension created');
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
};

const down = (knex) => {
  log.info('UUID extension destroyed');
  return knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};

export { up, down };
