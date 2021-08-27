import { Module } from '@nestjs/common';
import { RolesMutationsResolver } from './roles-mutations.resolver';
import { RolesController } from './roles.controller';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, RolesResolver, RolesMutationsResolver],
  controllers: [RolesController],
  exports: [RolesService],
})
export class RolesModule {}
