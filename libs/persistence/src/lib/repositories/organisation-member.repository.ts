import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OrganisationMembers as OrganisationMembersModel, Prisma, } from '@prisma/client';

@Injectable()
export class OrganisationMemberRepository {
  constructor(private prisma: PrismaService) {}

  // get a member
  async member(
    args: Prisma.OrganisationMembersFindUniqueArgs
  ): Promise<OrganisationMembersModel | null> {
    return this.prisma.organisationMembers.findUnique(args);
  }

  // create user
  async createMember(args: Prisma.OrganisationMembersCreateArgs): Promise<OrganisationMembersModel | null> {
    return this.prisma.organisationMembers.create(args);
  }
}
