import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { UBServiceFactory } from '@ultimate-backend/core';

import { AppModule } from './app/app.module';
import * as path from 'path';
import { runMigrations } from '@ub-boilerplate/common/database';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const migrationPath = path.resolve(
    __dirname,
    '../../../',
    'apps/guardian/src/migrations',
  );
  await runMigrations(app, migrationPath);

  await UBServiceFactory.create(app, true)
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
        // preflightContinue: true,
        credentials: true,
        optionsSuccessStatus: 200,
      },
    })
    .withCookie()
    .start();
}

(async () => await bootstrap())();
