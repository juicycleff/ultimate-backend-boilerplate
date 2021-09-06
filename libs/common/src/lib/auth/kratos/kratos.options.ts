import { ModuleMetadata, Type } from '@nestjs/common';
import { Configuration } from '@ory/kratos-client';
import { AxiosInstance } from 'axios';

export const KRATOS_OPTIONS_PROVIDER = 'KRATOS_OPTIONS_PROVIDER';
export const KRATOS_MODULE_OPTIONS = 'KRATOS_MODULE_OPTIONS';

export interface KratosOptions {
  configuration: Omit<Configuration, 'isJsonMime'>;
  basePath?: string;
  axios?: AxiosInstance;
}

export interface KratosModuleOptions {
  config?: Omit<Configuration, 'isJsonMime'>;
  admin?: KratosOptions;
  global?: boolean;
  debug?: boolean;
}

export interface KratosModuleOptionsFactory {
  createConfigOptions(): Promise<KratosModuleOptions> | KratosModuleOptions;
}

/**
 * Options available when creating the module asynchronously.  You should use only one of the
 * useExisting, useClass, or useFactory options for creation.
 */
export interface KratosModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /** Reuse an injectable factory class created in another module. */
  useExisting?: Type<KratosModuleOptionsFactory>;

  /**
   * Use an injectable factory class to populate the module options, such as URI and database name.
   */
  useClass?: Type<KratosModuleOptionsFactory>;

  /**
   * A factory function that will populate the module options, such as URI and database name.
   */
  useFactory?: (...args: never[]) => Promise<KratosModuleOptions> | KratosModuleOptions;

  /**
   * Inject any dependencies required by the module, such as a configuration service
   */
  inject?: never[];

  global?: boolean;
}
