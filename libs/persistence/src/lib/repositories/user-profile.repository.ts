import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserProfile as UserProfileModel, Prisma } from '@prisma/client';

@Injectable()
export class UserProfileRepository {
  constructor(private prisma: PrismaService) {}

  // get a profile by ID or account ID
  async user(
    userWhereUniqueInput: Prisma.UserProfileWhereUniqueInput,
  ): Promise<UserProfileModel | null> {
    return this.prisma.userProfile.findUnique({
      where: userWhereUniqueInput,
    });
  }

  // create user
  async createUser(args: Prisma.UserProfileCreateArgs): Promise<UserProfileModel | null> {
    return this.prisma.userProfile.create(args);
  }
}
