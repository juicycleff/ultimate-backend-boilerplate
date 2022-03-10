import { AppModule } from './app/app.module';
import { CommandFactory } from 'nest-commander';
import { LogService } from './app/helpers/log.service';

async function bootstrap() {
  await CommandFactory.run(AppModule, new LogService());
}

(async () => await bootstrap())();
