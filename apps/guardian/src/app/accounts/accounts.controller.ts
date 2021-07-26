import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import {
  AccountAvailableRequest,
  CreateAccountRequest,
  UpdateAccountRequest,
} from './commands';
import { AccountResponse } from './queries';
import { Auth, Identity, KratosService, Secure } from '@ub-boilerplate/common';

@ApiTags('accounts')
@Controller('accounts')
@ApiBearerAuth()
export class AccountsController {
  constructor(
    private readonly accountService: AccountsService,
    private readonly kratos: KratosService,
  ) {}

  /**
   * Retrieves the current logged in account or throws a 401 response
   */
  @Get('/')
  @Secure({ claim: 'account' })
  async getAccount(@Auth() identity: Identity): Promise<AccountResponse> {
    return this.kratos.whoami(identity.sessionId);
  }

  @Post('/')
  async create(@Body() body: CreateAccountRequest): Promise<AccountResponse> {
    const resp = await this.accountService.create(body);
    return resp.toResponse();
  }

  @Secure({ claim: 'account' })
  @Put('/')
  @Patch('/')
  async update(
    @Param('accountId') accountId: string,
    @Body() body: UpdateAccountRequest,
  ): Promise<AccountResponse> {
    return await this.accountService.update(accountId, body);
  }

  @Get('/available')
  async available(@Body() body: AccountAvailableRequest): Promise<boolean> {
    return await this.accountService.isAvailable(body.identity);
  }

  @Secure({ claim: 'service' })
  @Put('/:accountId/expirePassword')
  async expirePassword(@Param('accountId') accountId: string): Promise<boolean> {
    return await this.accountService.passwordExpire(accountId);
  }

  @Secure({ claim: 'account' })
  @Delete('/')
  async delete(@Auth() identity: Identity): Promise<boolean> {
    return await this.accountService.delete(identity);
  }
}
