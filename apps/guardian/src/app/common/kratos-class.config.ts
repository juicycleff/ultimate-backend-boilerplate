import { Injectable } from '@nestjs/common';
import {
  KratosModuleOptions,
  KratosModuleOptionsFactory,
} from '@ub-boilerplate/common/auth/kratos/kratos.options';
import { BootConfig } from '@ultimate-backend/bootstrap';

@Injectable()
export class KratosClassConfig implements KratosModuleOptionsFactory {
  constructor(private readonly config: BootConfig) {}

  createConfigOptions(): Promise<KratosModuleOptions> | KratosModuleOptions {
    return this.config.get('kratos');
  }
}
