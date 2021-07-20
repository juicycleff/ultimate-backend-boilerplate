import { DynamicModule, Module } from '@nestjs/common';
import { HYDRA_OPTIONS_PROVIDER, HydraModuleOptions } from './hydra.options';
import { HydraService } from './hydra.service';

@Module({})
export class HydraModule {
  static forRoot(options: HydraModuleOptions): DynamicModule {
    return {
      module: HydraModule,
      providers: [
        {
          provide: HYDRA_OPTIONS_PROVIDER,
          useValue: options,
        },
        HydraService,
      ],
      exports: [HydraService],
      global: options.global || true,
    };
  }
}
