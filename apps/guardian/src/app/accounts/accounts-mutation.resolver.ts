import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AccountMutations } from './account.types';
import { AccountsService } from './accounts.service';
import { CreateAccountRequest, UpdateAccountRequest } from './commands';
import { AccountResponse } from './queries';
import { Auth, Identity, Secure } from '@ub-boilerplate/common';

@Resolver(() => AccountMutations)
export class AccountsMutationResolver {
  constructor(private readonly accountService: AccountsService) {}

  @ResolveField(() => AccountResponse)
  async create(@Args('input') input: CreateAccountRequest): Promise<AccountResponse> {
    const resp = await this.accountService.create(input);
    return resp.toResponse();
  }

  @Secure({ claim: 'account' })
  @ResolveField(() => AccountResponse)
  update(@Args('input') input: UpdateAccountRequest): AccountResponse {
    return null;
  }

  @Secure({ claim: 'service' })
  @ResolveField(() => Boolean)
  async lock(@Args('accountId') accountId: string): Promise<boolean> {
    return await this.accountService.lock(accountId);
  }

  @Secure({ claim: 'service' })
  @ResolveField(() => Boolean)
  async unlock(@Args('accountId') accountId: string): Promise<boolean> {
    return await this.accountService.unlock(accountId);
  }

  @Secure({ claim: 'service' })
  @ResolveField(() => Boolean)
  async expirePassword(@Args('accountId') accountId: string): Promise<boolean> {
    return await this.accountService.passwordExpire(accountId);
  }

  @Secure({ claim: 'account' })
  @ResolveField(() => Boolean)
  async delete(@Auth() identity: Identity): Promise<boolean> {
    return await this.accountService.delete(identity);
  }

  @Secure({ claim: 'service' })
  @ResolveField(() => Boolean, { name: 'import' })
  importAccount(): boolean {
    return null;
  }
}
