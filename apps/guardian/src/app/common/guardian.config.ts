export interface GuardianConfig {
  DatastoreConfig: DatastoreConfig;
  security: SecurityConfig;
  features: FeaturesConfig;
  logging: LoggingConfig;
  integration: IntegrationConfig;
  files: FilesConfig;
}

export interface DatastoreConfig {
  dbUrl: string;
  dbName: string;
  redisUrl: string;
  retryAttempts?: number;
  retryDelays?: number;
}

export interface SecurityConfig {
  authSalt: string;
  jwtExpiration: number;
  jwtKey: string;
  jwtIssuer: string;
  sessionKey: string;
  sessionName: string;
  sessionSecure: boolean;
  sessionMaxAgeSecs: number;
  sessionPath: string;
  passwordStrength: number;
  onetimeCodeDuration: number;
  onetimeCodeLength: number;
}

export interface FeaturesConfig {
  api: Api;
  auth: Auth;
}

export interface Api {
  enableGraphql: boolean;
}

export interface Auth {
  enableSignup: boolean;
  enableLogin: boolean;
  enableJwt: boolean;
  enableSession: boolean;
  enableAnonymousAuth: boolean;
  loginRequireConfirmation: boolean;
  loginWithSignup: boolean;
  securityLevel: string;
}

export interface LoggingConfig {
  sentry: Sentry;
}

export interface Sentry {
  dsn: string;
  environment: string;
}

export interface IntegrationConfig {
  sendgrid: Sendgrid;
}

export interface Sendgrid {
  apiKey: string;
}

export interface FilesConfig {
  securityCert: string;
  securityKey: string;
}
