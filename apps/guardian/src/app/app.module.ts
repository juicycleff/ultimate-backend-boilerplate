import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard, IdentityMiddleware, KratosModule } from '@ub-boilerplate/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { BullConfig, GqlConfigProvider } from './common';
import { APP_GUARD } from '@nestjs/core';
import { OauthModule } from './oauth/oauth.module';
import { PasswordModule } from './password/password.module';
import { SessionsModule } from './sessions/sessions.module';
import { SecurityModule } from './security/security.module';
import { AccountsModule } from './accounts/accounts.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@ultimate-backend/redis';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { BullModule } from '@nestjs/bull';
import { ConfigSource } from '@ultimate-backend/common';
import { ConfigModule } from '@ultimate-backend/config';
import { AppResolver } from './app.resolver';
import {FormsModule} from "./forms/forms.module";

@Module({
  imports: [
    BootstrapModule.forRoot({
      filePath: path.resolve(__dirname, 'assets/bootstrap.yaml'),
      enableEnv: true,
    }),
    KratosModule.forRoot({
      public: {
        basePath: 'http://127.0.0.1:4433',
        baseOptions: {
          // Setting this is very important as axios will send the CSRF cookie otherwise
          // which causes problems with ORY Kratos' security detection.
          // Timeout after 5 seconds.
          withCredentials: false,
          timeout: 10000,
        },
      },
      admin: {
        configuration: {
          basePath: 'http://127.0.0.1:4434',
        },
      },
    }),
    PrometheusModule.register({
      path: 'mymetrics',
      defaultMetrics: {
        enabled: false,
      },
    }),
    ConfigModule.forRoot({
      global: true,
      load: [
        {
          source: ConfigSource.File,
          filePath: path.resolve(__dirname, 'assets/config.yaml'),
        },
      ],
    }),
    BullModule.forRootAsync({
      useClass: BullConfig,
    }),
    GraphQLFederationModule.forRootAsync({
      useClass: GqlConfigProvider,
    }),
    RedisModule.forRoot({ useCluster: false }),
    ThrottlerModule.forRoot({
      ttl: 60000,
      limit: 3,
    }),
    AccountsModule,
    SessionsModule,
    SecurityModule,
    PasswordModule,
    OauthModule,
    FormsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppResolver,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IdentityMiddleware).forRoutes(':splat*');
  }
}
