import { Module } from '@nestjs/common';
import { PrismaService } from './repositories/prisma.service';
import { UserProfileRepository } from './repositories/user-profile.repository';

@Module({
  controllers: [],
  providers: [PrismaService, UserProfileRepository],
  exports: [PrismaService, UserProfileRepository],
})
export class PersistenceModule {}
