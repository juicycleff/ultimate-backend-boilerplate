import { Field, ObjectType } from '@nestjs/graphql';
import { SecurityConfig } from '@ub-boilerplate/common';

@ObjectType()
export class ApiFeaturesConfig {
  @Field()
  enableGraphql: boolean;
}

@ObjectType()
export class AuthFeaturesConfig {
  @Field()
  enabled: boolean;

  @Field()
  enableJwt: boolean;

  @Field()
  enableSession: boolean;

  @Field()
  enableAnonymousAuth: boolean;

  @Field()
  loginRequireConfirmation: boolean;

  @Field()
  securityLevel: string;
}

export class LoggingConfig {
  sentry: SentryLoggingConfig;
}

@ObjectType()
export class FeaturesConfig {
  @Field(() => ApiFeaturesConfig)
  api: ApiFeaturesConfig;

  @Field(() => AuthFeaturesConfig)
  auth: AuthFeaturesConfig;
}

export class SentryLoggingConfig {
  dsn: string;
  environment: string;
}

export class FilesConfig {
  securityCert: string;
  securityKey: string;
}

@ObjectType()
export class GuardianConfig {
  @Field(() => SecurityConfig)
  security: SecurityConfig;

  @Field(() => FeaturesConfig)
  features: FeaturesConfig;

  logging: LoggingConfig;

  files: FilesConfig;
}
