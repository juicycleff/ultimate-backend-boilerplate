import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { AccountQueries } from './account.types';
import { AccountsService } from './accounts.service';
import { AccountAvailableRequest } from './commands';
import { AccountResponse } from './queries';
import { Auth, Identity, KratosService, Secure } from '@ub-boilerplate/common';

@Resolver(() => AccountQueries)
export class AccountsQueriesResolver {
  constructor(
    private readonly accountService: AccountsService,
    private readonly kratos: KratosService,
  ) {}

  /**
   * @description Retrieves the current logged in account or throws a 401 response
   */
  @Secure({ claim: 'account' })
  @ResolveField(() => AccountResponse, {
    description: 'Retrieves the current logged in account or throws a 401 response',
  })
  async currentAccount(@Auth() identity: Identity): Promise<AccountResponse> {
    return this.kratos.whoami(identity.sessionId);
  }

  /**
   * @description check to see if an account by and identity is available
   * @param {AccountAvailableRequest} input
   */
  @ResolveField(() => Boolean, {
    description: 'check to see if an account by and identity is available',
  })
  async available(@Args() input: AccountAvailableRequest): Promise<boolean> {
    return await this.accountService.isAvailable(input.identity);
  }

  @ResolveField(() => String)
  token(): string {
    return 'token';
  }
}
