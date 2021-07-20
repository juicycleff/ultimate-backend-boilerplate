import { ModuleMetadata, Type } from '@nestjs/common';
import { Configuration } from '@ory/hydra-client';
import { AxiosInstance } from 'axios';

export const HYDRA_OPTIONS_PROVIDER = 'HYDRA_OPTIONS_PROVIDER';

export interface HydraOptions {
  configuration?: Omit<Configuration, 'isJsonMime'>;
  basePath?: string;
  axios?: AxiosInstance;
}

export interface HydraModuleOptions {
  admin?: HydraOptions;
  public?: HydraOptions;
  global?: boolean;
  debug?: boolean;
}

export interface HydraModuleOptionsFactory {
  createConfigOptions(): Promise<HydraModuleOptions> | HydraModuleOptions;
}

/**
 * Options available when creating the module asynchronously.  You should use only one of the
 * useExisting, useClass, or useFactory options for creation.
 */
export interface HydraModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  /** Reuse an injectable factory class created in another module. */
  useExisting?: Type<HydraModuleOptionsFactory>;

  /**
   * Use an injectable factory class to populate the module options, such as URI and database name.
   */
  useClass?: Type<HydraModuleOptionsFactory>;

  /**
   * A factory function that will populate the module options, such as URI and database name.
   */
  useFactory?: (...args: never[]) => Promise<HydraModuleOptions> | HydraModuleOptions;

  /**
   * Inject any dependencies required by the module, such as a configuration service
   */
  inject?: never[];

  global?: boolean;
}
