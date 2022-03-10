import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import * as path from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard, IdentityMiddleware, KratosModule } from '@ub-boilerplate/common';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { BullConfig, GqlConfigProvider, KratosClassConfig } from './common';
import { APP_GUARD } from '@nestjs/core';
import { OauthModule } from './oauth/oauth.module';
import { PasswordModule } from './password/password.module';
import { SessionsModule } from './sessions/sessions.module';
import { SecurityModule } from './security/security.module';
import { AccountsModule } from './accounts/accounts.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { RedisModule } from '@ultimate-backend/redis';
import { GraphQLModule } from '@nestjs/graphql';
import { BullModule } from '@nestjs/bull';
import { ConfigSource } from '@ultimate-backend/common';
import { ConfigModule } from '@ultimate-backend/config';
import { AppResolver } from './app.resolver';
import { FormsModule } from './forms/forms.module';
import { PermissionsModule } from '@ultimate-backend/permissions';
import { PermissionsConfig } from './common/permissions.config';
import { PrismaService } from '@ub-boilerplate/persistence';
import { SharedServiceModule } from '@ub-boilerplate/common/modules';

@Module({
  imports: [
    SharedServiceModule,
    KratosModule.forRootAsync({
      useClass: KratosClassConfig,
    }),
    PrometheusModule.register({
      path: 'mymetrics',
      defaultMetrics: {
        enabled: false,
      },
    }),
    GraphQLModule.forRootAsync<ApolloFederationDriverConfig>({
      useClass: GqlConfigProvider,
      driver: ApolloFederationDriver,
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
    BullModule.forRootAsync({
      useClass: BullConfig,
    }),
    RedisModule.forRoot({ useCluster: false }),
    ThrottlerModule.forRoot({
      ttl: 60000,
      limit: 3,
    }),
    BootstrapModule.forRoot({
      filePath: path.resolve(__dirname, 'assets/bootstrap.yaml'),
      enableEnv: true,
    }),
    PermissionsModule.forRootAsync({
      useClass: PermissionsConfig,
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
    PrismaService,
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
