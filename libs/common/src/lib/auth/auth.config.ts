import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpSecurityConfig {
  @Field()
  duration: number;
  @Field()
  length: number;
}

@ObjectType()
export class SecurityConfig {
  authSalt: string;
  cookieId?: string;
  jwtExpiration: number;
  jwtKey: string;
  jwtIssuer: string;
  sessionKey: string;

  @Field()
  sessionName: string;

  @Field()
  sessionSecure: boolean;

  @Field()
  sessionMaxAgeSecs: number;

  @Field()
  sessionPath: string;

  @Field(() => OtpSecurityConfig)
  otp: OtpSecurityConfig;
}
