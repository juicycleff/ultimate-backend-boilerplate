import { MikroORM } from '@mikro-orm/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { INestApplication } from '@nestjs/common';

export async function runMigrations(
  app: NestFastifyApplication | INestApplication,
  migrationPath: string,
  options: { generateMigration?: boolean; initialize?: boolean } = {},
) {
  const orm = app.get<MikroORM>(MikroORM);

  const migrator = orm.getMigrator();
  try {
    if (options.generateMigration) {
      await migrator.createMigration(migrationPath, false, options.initialize);
    }
  } catch (e) {
    console.error(e);
  }

  try {
    await migrator.up();

    const generator = orm.getSchemaGenerator();
    // there is also `generate()` method that returns drop + create queries
    await generator.generate();

    // or you can run those queries directly, but be sure to check them first!
    await generator.dropSchema();
    await generator.createSchema();
    await generator.updateSchema();
  } catch (e) {
    console.error(e);
  }
}
