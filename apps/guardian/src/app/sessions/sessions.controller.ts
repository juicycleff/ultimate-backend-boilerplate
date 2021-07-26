import { Body, Controller, Delete, Post, Put, Req, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateAccountRequest } from '../accounts/commands';
import { CreateSessionRequest } from './commands';
import { SessionResponse } from './queries';
import { SessionsService } from './sessions.service';
import { IFastifyReply, IFastifyRequest, Secure } from '@ub-boilerplate/common';

@ApiBearerAuth()
@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('/')
  async create(
    @Body() body: CreateSessionRequest,
    @Req() req: IFastifyRequest,
    @Res({ passthrough: true }) res: IFastifyReply,
  ): Promise<SessionResponse> {
    return await this.sessionsService.create(body, req.identity, res);
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
