import { Mutation, Resolver } from '@nestjs/graphql';
import { PasswordMutations } from './password.types';

@Resolver()
export class PasswordResolver {
  /**
   * @description Root mutation for all password related mutations
   */
  @Mutation(() => PasswordMutations, {
    nullable: true,
    description: 'Root mutation for all password related mutations',
    name: 'password',
  })
  passwordMutation(): PasswordMutations {
    return {};
  }
}
