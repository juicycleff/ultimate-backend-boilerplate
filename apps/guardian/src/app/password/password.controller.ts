import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PasswordScoreRequest } from './dtos';
import { PasswordService } from './password.service';

@ApiBearerAuth()
@ApiTags('password')
@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('/reset')
  reset() {
    return;
  }

  @Post('/score')
  score(@Body() body: PasswordScoreRequest): string {
    return this.passwordService.scorePassword(body.password);
  }
}
