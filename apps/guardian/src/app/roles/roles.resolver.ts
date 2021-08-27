import { Mutation, Resolver } from '@nestjs/graphql';
import { RolesMutations } from './roles.types';

@Resolver()
export class RolesResolver {
  /**
   * @description Root mutation for all password related mutations
   */
  @Mutation(() => RolesMutations, {
    nullable: true,
    description: 'Root mutation for all password related mutations',
    name: 'password',
  })
  passwordMutation(): RolesMutations {
    return {};
  }
}
