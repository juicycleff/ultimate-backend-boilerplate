import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpSecurityConfig {
  @Field({ nullable: true })
  duration: number;
  @Field({ nullable: true })
  length: number;
}

@ObjectType()
export class SecurityConfig {
  @Field({ nullable: true })
  authSalt: string;

  @Field({ nullable: true })
  cookieId?: string;

  @Field({ nullable: true })
  jwtExpiration: number;

  @Field({ nullable: true })
  jwtKey: string;

  @Field({ nullable: true })
  jwtIssuer: string;

  @Field({ nullable: true })
  sessionKey: string;

  @Field({ nullable: true })
  sessionName: string;

  @Field({ nullable: true })
  sessionSecure: boolean;

  @Field({ nullable: true })
  sessionMaxAgeSecs: number;

  @Field({ nullable: true })
  sessionPath: string;

  @Field(() => OtpSecurityConfig, { nullable: true })
  otp: OtpSecurityConfig;
}
