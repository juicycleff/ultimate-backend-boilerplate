import { Module } from '@nestjs/common';
import { PrismaService } from './repository/prisma.service';
import { UserProfileRepository } from './repository/user-profile.repository';

@Module({
  controllers: [],
  providers: [PrismaService, UserProfileRepository],
  exports: [PrismaService, UserProfileRepository],
})
export class PersistenceModule {}
