import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccountsService } from './accounts.service';
import {
  AccountAvailableRequest,
  AccountResponse,
  CreateAccountRequest,
  UpdateAccountPasswordRequest,
  UpdateAccountRequest,
} from './dtos';
import {
  Auth,
  Identity,
  IExpressResponse,
  IFastifyReply,
  IFastifyRequest,
  Secure,
} from '@ub-boilerplate/common';
import { GetAccountQuery } from './queries';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  CreateAccountCommand,
  RequestAccountRecoveryCommand,
  UpdateAccountCommand,
  UpdateAccountPasswordCommand,
} from './commands';

@ApiTags('accounts')
@Controller('accounts')
@ApiBearerAuth()
export class AccountsController {
  constructor(
    private readonly accountService: AccountsService,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  /**
   * Retrieves the current logged in account or throws a 401 response
   */
  @Get('/')
  @Secure({ claim: 'account' })
  async getAccount(@Auth() identity: Identity): Promise<AccountResponse> {
    const rsp = await this.queryBus.execute(new GetAccountQuery(identity.sessionId));
    return rsp.identity;
  }

  @Post('/')
  async create(@Body() body: CreateAccountRequest): Promise<AccountResponse> {
    return await this.commandBus.execute(new CreateAccountCommand(body));
  }

  @Secure({ claim: 'account' })
  @Put('/')
  @Patch('/')
  async update(
    @Param('accountId') accountId: string,
    @Body() body: UpdateAccountRequest,
  ): Promise<AccountResponse> {
    return this.commandBus.execute(new UpdateAccountCommand(accountId, body));
  }

  @Get('/available')
  async available(@Body() body: AccountAvailableRequest): Promise<boolean> {
    return await this.accountService.isAvailable(body.identity);
  }

  @Post('/update-password')
  async updatePassword(
    @Auth() identity: Identity,
    @Body() body: UpdateAccountPasswordRequest,
    @Req() req: IFastifyRequest,
    @Res({ passthrough: true }) res: IFastifyReply | IExpressResponse,
  ): Promise<boolean> {
    return this.commandBus.execute(
      new UpdateAccountPasswordCommand(identity, body, {
        res: res,
        reply: res,
        req: req,
      }),
    );
  }

  @Post('/recover')
  async requestAccountRecovery(
    @Query('email') email: string,
    @Auth() identity: Identity,
  ): Promise<boolean> {
    return this.commandBus.execute(
      new RequestAccountRecoveryCommand(email, identity.sessionId),
    );
  }

  @Secure({ claim: 'account' })
  @Delete('/')
  async delete(@Auth() identity: Identity): Promise<boolean> {
    return await this.accountService.delete(identity);
  }
}
