'use strict';

import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { logger } from 'common-node-lib';

const log = logger('seed-data');

const files = [
  'user_role.csv',
  'user_scope.csv',
  'role_scope.csv',
  'dashboard_setup_header.csv',
  'dashboard_setup.csv',
  'problem_type.csv',
  'support_language.csv',
  'tags.csv',
];

const runSeeder = async (knex) => {
  const seedDir = path.resolve('src/init-data');
  try {
    for (const file of files) {
      const tableName = path.basename(file, '.csv');
      const filePath = path.join(seedDir, file);
      const primaryKey = 'id';

      const records = await new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', () => resolve(results))
          .on('error', reject);
      });

      for (const record of records) {
        const recordExist = await knex.raw(
          `SELECT ID FROM ${tableName} WHERE ${primaryKey} = '${record[primaryKey]}'`
        );
        if (recordExist.rowCount > 0) {
          log.info(
            `[SKIP] ${tableName}: ${primaryKey}=${record[primaryKey]} already exists`
          );
          continue;
        }

        await knex(tableName).insert(record);
        log.info(`[INSERT] ${tableName}: ${primaryKey}=${record[primaryKey]}`);
      }
    }
  } catch (err) {
    console.log(`Error while seeding: ${err}`);
  }
};

export default runSeeder;
