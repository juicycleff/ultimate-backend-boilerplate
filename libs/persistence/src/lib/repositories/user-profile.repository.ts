import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserProfile as UserProfileModel, Prisma } from '@prisma/client';

@Injectable()
export class UserProfileRepository {
  constructor(private prisma: PrismaService) {}

  // get a user
  async user(
    args: Prisma.UserProfileFindUniqueArgs,
  ): Promise<UserProfileModel | null> {
    return this.prisma.userProfile.findUnique(args);
  }

  // create user
  async createUser(args: Prisma.UserProfileCreateArgs): Promise<UserProfileModel | null> {
    return this.prisma.userProfile.create(args);
  }
}
