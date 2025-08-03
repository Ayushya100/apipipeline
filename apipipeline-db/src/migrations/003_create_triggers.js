'use strict';

import { logger } from '@ayushya100/common-node-lib';
import { readSqlFile } from '../utils/index.js';

const up = async (knex) => {
  const log = logger('DB: triggers-migration-up');
  log.info('Trigger migration up operation initiated');

  const triggerFunction = readSqlFile('triggers/functions', 'update_version');
  const trigger = readSqlFile('triggers', 'triggers');

  knex
    .raw(triggerFunction)
    .then(() => {
      knex
        .raw(trigger)
        .then(() => {
          log.info('Triggers defined in db');
        })
        .catch((err) => {
          log.error(`Error defining triggers in db: ${err}`);
        });
    })
    .catch((err) => {
      log.error(`Error defining trigger function in db: ${err}`);
    });
};

const down = async (knex) => {
  const log = logger('DB: triggers-migration-down');
  log.info('Down migration skipped. No trigger to drop.');
};

export { up, down };
