import { Knex } from 'knex';

export const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'yourdatabase',
    timezone: '+09:00',
    connectTimeout: 30000,
  },
  debug: false,
};
