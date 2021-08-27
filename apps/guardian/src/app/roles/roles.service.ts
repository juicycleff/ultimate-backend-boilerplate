import { Injectable } from '@nestjs/common';
import { ConfigValue } from '@ultimate-backend/config';
import { SecurityConfig } from '@ub-boilerplate/common';

@Injectable()
export class RolesService {
  @ConfigValue('security', {})
  securityConfig: SecurityConfig;
}
