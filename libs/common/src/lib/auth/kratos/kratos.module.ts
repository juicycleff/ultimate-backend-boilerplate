import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import {
  KRATOS_MODULE_OPTIONS,
  KRATOS_OPTIONS_PROVIDER,
  KratosModuleAsyncOptions,
  KratosModuleOptions,
  KratosModuleOptionsFactory,
} from './kratos.options';
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

  static forRootAsync(options: KratosModuleAsyncOptions) {
    const configProvider: Provider = {
      provide: KRATOS_OPTIONS_PROVIDER,
      useFactory: async (modOptions: KratosModuleOptions) => {
        return modOptions;
      },
      inject: [KRATOS_MODULE_OPTIONS],
    };

    return {
      module: KratosModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options), KratosService, configProvider],
      exports: [KratosService],
      global: true,
    };
  }

  private static createAsyncProviders(options: KratosModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: KratosModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        useFactory: options.useFactory,
        inject: options.inject,
        provide: KRATOS_MODULE_OPTIONS,
      };
    }

    const inject = [
      (options.useClass || options.useExisting) as Type<KratosModuleOptionsFactory>,
    ];

    return {
      provide: KRATOS_MODULE_OPTIONS,
      useFactory: async (optionsFactory: KratosModuleOptionsFactory) =>
        await optionsFactory.createConfigOptions(),
      inject,
    };
  }
}
