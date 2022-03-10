import { Body, Controller, Delete, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateAccountRequest } from '../accounts/dtos';
import { CreateSessionRequest } from './dtos';
import { SessionResponse } from './dtos';
import { SessionsService } from './sessions.service';
import {
  IExpressResponse,
  IFastifyReply,
  IFastifyRequest,
  Secure,
} from '@ub-boilerplate/common';
import { CreateSessionCommand } from './commands';
import { CommandBus } from '@nestjs/cqrs';

@ApiBearerAuth()
@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/')
  async create(
    @Body() body: CreateSessionRequest,
    @Req() req: IFastifyRequest,
    @Res({ passthrough: true }) res: IFastifyReply | IExpressResponse,
  ): Promise<SessionResponse> {
    return await this.commandBus.execute(
      new CreateSessionCommand(body, req.identity, { res: res, reply: res, req: req }),
    );
  }

  @Secure({ claim: 'account' })
  @Delete('/')
  async delete(
    @Req() req: IFastifyRequest,
    @Res({ passthrough: true }) res: IFastifyReply,
  ): Promise<boolean> {
    return await this.sessionsService.delete(req.identity, res);
  }

  @Secure({ claim: 'account' })
  @Put('/refresh')
  refresh(@Body() body: UpdateAccountRequest) {
    return;
  }
}
