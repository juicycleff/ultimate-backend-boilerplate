import { Module } from '@nestjs/common';
import { OrganisationsGrpcService } from './organisations-grpc.service';
import { OrganisationCommandHandlers } from '../common/commands';

@Module({
  providers: [...OrganisationCommandHandlers],
  controllers: [OrganisationsGrpcService],
})
export class OrganisationsModule {}
