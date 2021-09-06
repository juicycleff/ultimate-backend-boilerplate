import { NestFactory } from '@nestjs/core';
import { UBServiceFactory } from '@ultimate-backend/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';
import * as path from 'path';
import { runMigrations } from '@ub-boilerplate/common/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const migrationPath = path.resolve(
    __dirname,
    '../../../',
    'apps/organisation/src/migrations',
  );
  await runMigrations(app, migrationPath, {
    generateMigration: false,
    initialize: false,
  });

  await UBServiceFactory.create(app, false)
    .withGrpc()
    .withSwagger()
    .withPrefix('api')
    .withValidation({
      skipMissingProperties: false,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      enableDebugMessages: true,
    })
    .hardenedSecurity({
      cors: {
        origin: true,
        credentials: true,
        optionsSuccessStatus: 200,
      },
    })
    .withCookie()
    .start();
}

(async () => await bootstrap())();
