import { Module } from '@nestjs/common';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import { ConfigModule, ConfigSource } from '@ultimate-backend/config';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KubernetesModule } from '@ultimate-backend/kubernetes';
import { OrganisationsModule } from './organisations/organisations.module';
import { OrganisationMembersModule } from './organisation-members/organisation-members.module';
import { SharedServiceModule } from '@ub-boilerplate/common/modules';

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
    SharedServiceModule,
    OrganisationsModule,
    OrganisationMembersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
