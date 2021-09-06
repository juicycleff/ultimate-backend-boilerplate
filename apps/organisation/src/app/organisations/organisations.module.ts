import { Module } from '@nestjs/common';
import { OrganisationsGrpcService } from './organisations-grpc.service';
import { MikroOrmModule } from '@ub-boilerplate/common/database/mikro-orm';
import { OrganisationEntity } from '../common/entities';
import { OrganisationEntityRepository } from '../common/repository';
import { OrganisationCommandHandlers } from '../common/commands';

@Module({
  imports: [MikroOrmModule.forFeature([OrganisationEntity])],
  providers: [OrganisationEntityRepository, ...OrganisationCommandHandlers],
  controllers: [OrganisationsGrpcService],
})
export class OrganisationsModule {}
