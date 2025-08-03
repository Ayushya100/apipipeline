// Update with your config settings.

import 'dotenv/config';

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const knexConfig = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/migrations',
    },
    seeds: {
      directory: './src/db-loader',
    },
  },
};

export default knexConfig;
