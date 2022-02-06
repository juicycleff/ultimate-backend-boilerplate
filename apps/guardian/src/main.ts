import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { UBServiceFactory } from '@ultimate-backend/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await UBServiceFactory.create(app, false)
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
