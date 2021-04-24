import { NestFactory } from "@nestjs/core";
import { UBServiceFactory } from "@ultimate-backend/core";

import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await UBServiceFactory.create(app)
    .withSwagger()
    .withGrpc()
    .withPoweredBy()
    .withPrefix("api")
    .start();
}

(async () => await bootstrap())();
