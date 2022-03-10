import { ApolloError } from 'apollo-server-fastify';
import { Args, Context, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus } from '@nestjs/cqrs';
import { Auth, GqlContext, Identity, Secure } from '@ub-boilerplate/common';

import { AccountMutations } from './account.types';
import { AccountsService } from './accounts.service';
import {
  AccountResponse,
  CreateAccountRequest,
  UpdateAccountPasswordRequest,
  UpdateAccountRequest,
} from './dtos';
import {
  CreateAccountCommand,
  RequestAccountRecoveryCommand,
  UpdateAccountCommand,
  UpdateAccountPasswordCommand,
} from './commands';
import { HttpException } from '@nestjs/common';

@Resolver(() => AccountMutations)
export class AccountsMutationResolver {
  constructor(
    private readonly accountService: AccountsService,
    private readonly commandBus: CommandBus,
  ) {}

  @ResolveField(() => AccountResponse)
  async create(@Args('input') input: CreateAccountRequest): Promise<AccountResponse> {
    try {
      return await this.commandBus.execute(new CreateAccountCommand(input));
    } catch (e) {
      if (e instanceof HttpException) {
        throw new ApolloError(e.getResponse()[0].text, (e as any).status);
      }
      throw new ApolloError(e.message);
    }
  }

  @Secure({ claim: 'account' })
  @ResolveField(() => AccountResponse)
  update(
    @Args('input') input: UpdateAccountRequest,
    @Auth() identity: Identity,
  ): Promise<AccountResponse> {
    try {
      return this.commandBus.execute(new UpdateAccountCommand(identity.sessionId, input));
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField(() => Boolean)
  async requestAccountRecovery(
    @Args('email') email: string,
    @Auth() identity: Identity,
  ): Promise<boolean> {
    try {
      return this.commandBus.execute(
        new RequestAccountRecoveryCommand(email, identity.sessionId),
      );
    } catch (e) {
      throw new ApolloError(e);
    }
  }

  @ResolveField(() => Boolean)
  async updatePassword(
    @Args('input') input: UpdateAccountPasswordRequest,
    @Auth() identity: Identity,
    @Context() ctx: GqlContext,
  ): Promise<boolean> {
    try {
      return this.commandBus.execute(
        new UpdateAccountPasswordCommand(identity, input, ctx),
      );
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
