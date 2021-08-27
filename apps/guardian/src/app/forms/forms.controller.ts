import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FormsService } from './forms.service';

@ApiBearerAuth()
@ApiTags('forms')
@Controller('forms')
export class FormsController {
  constructor(private readonly formService: FormsService) {}

  @Get('/login')
  async login() {
    return await this.formService.loginSchema();
  }

  @Get('/registration')
  async registration() {
    return await this.formService.registrationSchema();
  }
}
