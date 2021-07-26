import { Module } from '@nestjs/common';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KubernetesModule } from '@ultimate-backend/kubernetes';
import { TenantsModule } from './tenants/tenants.module';
import { MembersModule } from './members/members.module';

@Module({
  imports: [
    BootstrapModule.forRoot({
      filePath: path.resolve(__dirname, 'assets/bootstrap.yaml'),
      enableEnv: true,
    }),
    ConfigModule.forRoot({
      load: [
        {
          source: ConfigSource.Env,
          ignoreEnvFile: true,
          envFilePath: path.resolve(__dirname, '/assets/dev.env'),
          prefix: 'ULTIMATE_BACKEND',
        },
        /* {
          source: ConfigSource.Kubernetes,
          name: 'ultimate-backend-tenant-config',
          key: 'config.yml',
        }, */
      ],
    }),
    KubernetesModule.forRoot(),
    TenantsModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
