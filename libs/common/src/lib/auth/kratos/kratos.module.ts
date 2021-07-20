import { DynamicModule, Module } from '@nestjs/common';
import { KRATOS_OPTIONS_PROVIDER, KratosModuleOptions } from './kratos.options';
import { KratosService } from './kratos.service';

@Module({})
export class KratosModule {
  static forRoot(options: KratosModuleOptions): DynamicModule {
    return {
      module: KratosModule,
      providers: [
        {
          provide: KRATOS_OPTIONS_PROVIDER,
          useValue: options,
        },
        KratosService,
      ],
      exports: [KratosService],
      global: options.global || true,
    };
  }
}
