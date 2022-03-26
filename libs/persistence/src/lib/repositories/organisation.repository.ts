import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Organisations as OrganisationsModel } from '@prisma/client';

@Injectable()
export class OrganisationRepository {
  constructor(private prisma: PrismaService) {}

  // get an organisation
  async organisation(
    args: Prisma.OrganisationsFindUniqueArgs,
  ): Promise<OrganisationsModel | null> {
    return this.prisma.organisations.findUnique(args);
  }

  // create an organisation
  async createOrganisation(
    args: Prisma.OrganisationsCreateArgs,
  ): Promise<OrganisationsModel | null> {
    return this.prisma.organisations.create(args);
  }
}
