import { MikroORM } from '@mikro-orm/core';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

export async function runMigrations(app: NestFastifyApplication) {
  const orm = app.get<MikroORM>(MikroORM);

  const migrator = orm.getMigrator();
  await migrator.up();

  const generator = orm.getSchemaGenerator();
  // there is also `generate()` method that returns drop + create queries
  await generator.generate();

  // or you can run those queries directly, but be sure to check them first!
  await generator.dropSchema();
  await generator.createSchema();
  await generator.updateSchema();
}
