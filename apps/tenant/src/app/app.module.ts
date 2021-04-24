import {Module} from "@nestjs/common";
import {BootstrapModule} from "@ultimate-backend/bootstrap";
import {ConfigModule, ConfigSource} from "@ultimate-backend/config";
import * as path from "path";

import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
  imports: [
    BootstrapModule.forRoot({
      filePath: path.resolve(__dirname, 'assets/bootstrap.development.yaml'),
    }),
    ConfigModule.forRoot({
      load: [
        {
          source: ConfigSource.Env,
          ignoreEnvFile: true,
          envFilePath: path.resolve(__dirname, '/assets/dev.env'),
          prefix: 'ULTIMATE_BACKEND',
        }
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
