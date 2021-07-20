import { Module } from '@nestjs/common';
import { SecurityService } from './security.service';

@Module({
  providers: [SecurityService],
})
export class SecurityModule {}
