import { Knex } from 'knex';
import * as dotenv from 'dotenv';

// .env 파일에서 환경 변수 불러오기
dotenv.config();

export const knexConfig: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    timezone: process.env.DB_TIMEZONE,
    connectTimeout: Number(process.env.DB_CONNECT_TIMEOUT), // 숫자로 변환
  },
  debug: false,
};
