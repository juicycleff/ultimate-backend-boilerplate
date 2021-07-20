import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthResolver } from './oauth.resolver';

@Module({
  providers: [OauthResolver],
  controllers: [OauthController],
})
export class OauthModule {}
