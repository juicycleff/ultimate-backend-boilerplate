import {
  DataStoreModuleOptions,
  DataStoreModuleOptionsFactory,
} from "./data-store.options";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DataStoreConfigClass implements DataStoreModuleOptionsFactory {
  createDataStoreOptions():
    | Promise<DataStoreModuleOptions>
    | DataStoreModuleOptions {
    return {
      driver: "sqlite",
    };
  }
}
