import { DataStoreInputKeys } from "./data-stores.enum";
import { ModuleMetadata, Type } from "@nestjs/common";

export interface DataStoreModuleOptions {
  driver?: DataStoreInputKeys;
}

export interface DataStoreModuleOptionsFactory {
  createDataStoreOptions():
    | Promise<DataStoreModuleOptions>
    | DataStoreModuleOptions;
}

/**
 * Options available when creating the module asynchronously.  You should use only one of the
 * useExisting, useClass, or useFactory options for creation.
 */
export interface DataStoreModuleAsyncOptions
  extends Pick<ModuleMetadata, "imports"> {
  /** Reuse an injectable factory class created in another module. */
  useExisting?: Type<DataStoreModuleOptionsFactory>;

  /**
   * Use an injectable factory class to populate the module options, such as URI and database name.
   */
  useClass?: Type<DataStoreModuleOptionsFactory>;

  /**
   * A factory function that will populate the module options, such as URI and database name.
   */
  useFactory?: (
    ...args: never[]
  ) => Promise<DataStoreModuleOptions> | DataStoreModuleOptions;

  /**
   * Inject any dependencies required by the module, such as a configuration service
   */
  inject?: never[];
}
