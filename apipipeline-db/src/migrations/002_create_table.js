'use strict';

import { logger } from '@ayushya100/common-node-lib';
import { readSqlFile } from '../utils/index.js';

const dbTables = [
  'svc_config',
  'path_config',
  'user_role',
  'user_scope',
  'role_scope',
  'dashboard_setup_header',
  'dashboard_setup',
  'role_dashboard',
  'users',
  'user_metadata',
  'user_dashboard',
  'problem_type',
  'support_language',
  'tags',
  'problems',
  'api_problem_meta',
  'problem_examples',
  'problem_hints',
  'problem_tags',
  'problem_test_cases',
  'user_submission_hdr',
  'user_submission_dtl',
  'user_problems',
  'code_execution_job',
  'execution_testcase_response',
  'playlist',
  'playlist_items',
  'problem_snippet',
  'problem_solution',
  'problem_validation_runs',
];

const up = async (knex) => {
  const log = logger('DB: schemas-migration-up');
  log.info('Schema migration up operation initiated');

  for (const table of dbTables) {
    const schema = readSqlFile('tables', table);

    knex
      .raw(schema)
      .then(() => {
        log.info(`${table} table defined in db`);
      })
      .catch((err) => {
        log.error(`Error defining ${table} table in db: ${err}`);
      });
  }
};

const down = async (knex) => {
  const log = logger('DB: schemas-migration-down');
  log.info('Down migration skipped. No schema to drop.');
};

export { up, down };
