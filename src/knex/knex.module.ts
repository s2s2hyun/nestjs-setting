import { Module, Global } from '@nestjs/common';
import knex from 'knex';
import { knexConfig } from './knex.config';

@Global()
@Module({
  providers: [
    {
      provide: 'KNEX_CONNECTION',
      useValue: knex(knexConfig),
    },
  ],
  exports: ['KNEX_CONNECTION'],
})
export class KnexModule {}
