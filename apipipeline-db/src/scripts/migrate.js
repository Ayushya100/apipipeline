'use strict';

import knex from 'knex';
import pg from 'pg';
import 'dotenv/config';
import { logger } from '@ayushya100/common-node-lib';
import knexConfig from '../knexfile.js';

const log = logger('migration');

async function verifyDatabaseExists() {
  log.info('Verifying Requested database existence');

  const defaultDB = new pg.Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await defaultDB.connect();
    const dbName = process.env.DB_NAME;

    const res = await defaultDB.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (res.rowCount === 0) {
      log.info(`Database ${dbName} does not exist. Creating...`);
      await defaultDB.query(`CREATE DATABASE "${dbName}"`);
      log.info(`Database ${dbName} created successfully.`);
    } else {
      log.info(`Database ${dbName} already exists.`);
    }
  } catch (err) {
    log.error(`Error checking/creating database: ${err.message}`);
    process.exit(1);
  } finally {
    log.info('Database verification operation completed - closing connection');
    await defaultDB.end();
  }
}

(async () => {
  try {
    await verifyDatabaseExists();

    log.info('Running migrations...');
    await knex(knexConfig[process.env.DB_ENV]).migrate.latest();

    log.info('Migrations completed successfully');
    process.exit(0);
  } catch (err) {
    log.error(`Migrations failed: ${err}`);
    process.exit(1);
  }
})();
