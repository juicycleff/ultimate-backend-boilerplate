import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { Auth, Identity, KratosService, Secure } from '@ub-boilerplate/common';
import { AccountQueries } from './account.types';
import { AccountsService } from './accounts.service';
import { AccountAvailableRequest, AccountResponse } from './dtos';
import { QueryBus } from '@nestjs/cqrs';
import { GetAccountQuery } from './queries';

@Resolver(() => AccountQueries)
export class AccountsQueriesResolver {
  constructor(
    private readonly accountService: AccountsService,
    private readonly kratos: KratosService,
    private readonly queryBus: QueryBus,
  ) {}

  /**
   * @description Retrieves the current logged in account or throws a 401 response
   */
  @Secure({ claim: 'account' })
  @ResolveField(() => AccountResponse, {
    description: 'Retrieves the current logged in account or throws a 401 response',
  })
  async me(@Auth() identity: Identity): Promise<AccountResponse> {
    const rsp = await this.queryBus.execute(new GetAccountQuery(identity.sessionId));
    return rsp.identity;
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
}
