import { Injectable } from '@nestjs/common';
import {
  KratosModuleOptions,
  KratosModuleOptionsFactory,
} from '@ub-boilerplate/common/auth/kratos/kratos.options';

@Injectable()
export class KratosClassConfig implements KratosModuleOptionsFactory {
  createConfigOptions(): Promise<KratosModuleOptions> | KratosModuleOptions {
    return {
      public: {
        basePath: 'http://127.0.0.1:4433',
        baseOptions: {
          // Setting this is very important as axios will send the CSRF cookie otherwise
          // which causes problems with ORY Kratos' security detection.
          // Timeout after 5 seconds.
          withCredentials: false,
          timeout: 10000,
        },
      },
      admin: {
        configuration: {
          basePath: 'http://127.0.0.1:4434',
        },
      },
    };
  }
}
