import { NestFactory } from '@nestjs/core';
import { UBServiceFactory } from '@ultimate-backend/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await UBServiceFactory.create(app)
    .withSwagger()
    // .withGrpc()

    // .withPoweredBy()
    .withPrefix('api')
    .start();
}

(async () => await bootstrap())();
