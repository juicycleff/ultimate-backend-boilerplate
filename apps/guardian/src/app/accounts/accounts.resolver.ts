import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountMutations, AccountQueries } from './account.types';
import { AccountResponse } from './dtos';

@Resolver(() => AccountResponse)
export class AccountsResolver {
  /**
   * @description Root query for all accounts related queries
   */
  @Query(() => AccountQueries, {
    nullable: true,
    description: 'Root query for all accounts related queries',
  })
  account() {
    return {};
  }

  /**
   * @description Root mutation for all accounts related mutations
   */
  @Mutation(() => AccountMutations, {
    nullable: true,
    description: 'Root mutation for all accounts related mutations',
    name: 'account',
  })
  accountMutation() {
    return {};
  }
}
