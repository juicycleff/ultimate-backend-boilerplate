import { MikroOrmModuleOptions } from '../mikro-orm';
import { IDatabaseDriver } from '@mikro-orm/core';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { Logger } from '@nestjs/common';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { BaseEntity, IsolatedEntity } from '../entities';

const logger = new Logger('MikroORM');

export async function getMikroORMOptions(
  store: BootConfig,
  { migrations, entities }: { migrations: Record<string, any>; entities: any[] },
): Promise<MikroOrmModuleOptions<IDatabaseDriver>> {
  const migrationsList = Object.keys(migrations).map((migrationName) => ({
    name: migrationName,
    class: migrations[migrationName],
  }));

  return {
    entities: [...entities, BaseEntity, IsolatedEntity],
    highlighter: new SqlHighlighter(),
    debug: true,
    logger: logger.log.bind(logger),
    autoLoadEntities: true,
    migrations: {
      migrationsList,
      transactional: true, // wrap each migration in a transaction
      disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
      allOrNothing: false, // wrap all migrations in master transaction
      dropTables: true, // allow to disable table dropping
      safe: false,
      emit: 'ts',
    },
    ...store.get('orm.mikro', {}),
  };
}
