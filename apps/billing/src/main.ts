import { NestFactory } from '@nestjs/core';
import { UBServiceFactory } from '@ultimate-backend/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await UBServiceFactory.create(app, true)
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
