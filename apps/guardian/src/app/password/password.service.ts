import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import zxcvbn from 'zxcvbn-typescript';
import { PasswordScoreEnum } from './dtos';
import { SecurityConfig } from '@ub-boilerplate/common';

@Injectable()
export class PasswordService {
  @ConfigValue('security', {})
  securityConfig: SecurityConfig;

  private static getScore(score): PasswordScoreEnum {
    switch (score) {
      case 0:
        return PasswordScoreEnum.TooWeak;
      case 1:
        return PasswordScoreEnum.Weak;
      case 2:
        return PasswordScoreEnum.Medium;
      case 3:
        return PasswordScoreEnum.Strong;
      case 4:
        return PasswordScoreEnum.VeryStrong;
      default:
        throw new BadRequestException('invalid password score');
    }
  }

  scorePassword(password: string): PasswordScoreEnum {
    const passwordScore = zxcvbn(password);
    return PasswordService.getScore(passwordScore.score);
  }
}
