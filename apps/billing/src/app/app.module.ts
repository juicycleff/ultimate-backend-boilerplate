import { Module } from '@nestjs/common';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import * as path from 'path';
import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
import { KubernetesModule } from '@ultimate-backend/kubernetes';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const sharedImports =
  process.env.NODE_ENV === 'development' ? [] : [KubernetesModule.forRoot()];

@Module({
  imports: [
    BootstrapModule.forRoot({
      filePath: path.resolve(__dirname, 'assets/bootstrap.yaml'),
      enableEnv: true,
    }),
    ConfigModule.forRoot({
      global: true,
      load: [
        {
          source: ConfigSource.File,
          filePath: path.resolve(__dirname, 'assets/config.yaml'),
        },
        {
          source: ConfigSource.Env,
          prefix: 'ULTIMATE_BACKEND',
        },
      ],
    }),
    ...sharedImports,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
