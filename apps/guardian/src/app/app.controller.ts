import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { GuardianConfig } from './common/guardian.config';
import { Secure } from '@ub-boilerplate/common';

@ApiTags('index')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Secure({ claim: 'service' })
  @Get('/configuration')
  configuration(): GuardianConfig {
    return this.appService.getConfig();
  }

  @Secure({ claim: 'service' })
  @Get('/metrics')
  metrics() {
    return this.appService.getData();
  }

  @Secure({ claim: 'service' })
  @Get('/jwks')
  jwks() {
    return this.appService.getData();
  }

  @Secure({ claim: 'service' })
  @Get('/stats')
  stats() {
    return this.appService.getData();
  }
}
