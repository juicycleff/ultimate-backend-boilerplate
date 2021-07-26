import { ApolloError } from 'apollo-server-fastify';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { Auth, Identity, Secure } from '@ub-boilerplate/common';

import { AccountMutations } from './account.types';
import { AccountsService } from './accounts.service';
import { CreateAccountRequest, UpdateAccountRequest } from './commands';
import { AccountResponse } from './queries';

@Resolver(() => AccountMutations)
export class AccountsMutationResolver {
  constructor(private readonly accountService: AccountsService) {}

  @ResolveField(() => AccountResponse)
  async create(@Args('input') input: CreateAccountRequest): Promise<AccountResponse> {
    try {
      const resp = await this.accountService.create(input);
      return resp.toResponse();
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Secure({ claim: 'account' })
  @ResolveField(() => AccountResponse)
  update(
    @Args('input') input: UpdateAccountRequest,
    @Auth() identity: Identity,
  ): Promise<AccountResponse> {
    try {
      return this.accountService.update(identity.sessionId, input);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Secure({ claim: 'service' })
  @ResolveField(() => Boolean)
  async expirePassword(@Args('accountId') accountId: string): Promise<boolean> {
    try {
      return await this.accountService.passwordExpire(accountId);
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @Secure({ claim: 'account' })
  @ResolveField(() => Boolean)
  async delete(@Auth() identity: Identity): Promise<boolean> {
    try {
      return await this.accountService.delete(identity);
    } catch (e) {
      throw new ApolloError(e);
    }
  }
}
