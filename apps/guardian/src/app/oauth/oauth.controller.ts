import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('oauth')
@Controller('oauth')
export class OauthController {
  @Get('/:providerName')
  providerName() {
    return;
  }

  @Get('/:providerName/return')
  getProvider() {
    return;
  }
}
