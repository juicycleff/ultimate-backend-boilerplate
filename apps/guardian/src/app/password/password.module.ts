import { Module } from '@nestjs/common';
import { PasswordMutationsResolver } from './password-mutations.resolver';
import { PasswordController } from './password.controller';
import { PasswordResolver } from './password.resolver';
import { PasswordService } from './password.service';

@Module({
  providers: [PasswordService, PasswordResolver, PasswordMutationsResolver],
  controllers: [PasswordController],
  exports: [PasswordService],
})
export class PasswordModule {}
