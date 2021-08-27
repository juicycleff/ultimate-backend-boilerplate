import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@ub-boilerplate/common/database/mikro-orm';
import { IDatabaseDriver } from '@mikro-orm/core';
import { RolesEntity } from './entities';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { Injectable, Logger } from '@nestjs/common';
import * as path from 'path';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const logger = new Logger('MikroORM');

@Injectable()
export class DbConfig implements MikroOrmOptionsFactory {
  constructor(private readonly store: BootConfig) {}

  async createMikroOrmOptions(): Promise<MikroOrmModuleOptions<IDatabaseDriver>> {
    const dbConfig = this.store.get('database.postgres', {});
    return {
      entities: [RolesEntity],
      type: 'postgresql',
      dbName: 'guardian_db',
      highlighter: new SqlHighlighter(),
      debug: true,
      logger: logger.log.bind(logger),
      migrations: {
        path: path.join(__dirname, 'migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
        transactional: true, // wrap each migration in a transaction
        disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
        allOrNothing: false, // wrap all migrations in master transaction
        dropTables: true, // allow to disable table dropping
        safe: false,
        emit: 'ts',
      },
      ...dbConfig,
    };
  }
}
