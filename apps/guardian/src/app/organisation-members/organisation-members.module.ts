import { Module } from '@nestjs/common';
import { OrganisationMembersGrpcService } from './organisation-members-grpc.service';

@Module({
  controllers: [OrganisationMembersGrpcService],
})
export class OrganisationMembersModule {}
