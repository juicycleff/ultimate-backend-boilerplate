import { DataStoreModuleOptions } from "./data-store.options";
import { Provider } from "@nestjs/common";
import {
  MongoDatastoreProvider,
  MysqlDatastoreProvider,
  PostgresDatastoreProvider,
  SqliteDatastoreProvider,
} from "./stores";
import { BaseDatastore } from "./stores";
import { DATA_STORE_CONFIG_OPTIONS } from "./data-store.constant";
import { ConfigStore } from "@ultimate-backend/config";

export function createDatastoreProvider(
  opts: DataStoreModuleOptions
): Provider {
  const provider: Provider = {
    provide: BaseDatastore,
    useClass: SqliteDatastoreProvider,
  };

  switch (opts?.driver) {
    case "mysql":
      provider.useClass = MysqlDatastoreProvider;
      break;
    case "mongodb":
      provider.useClass = MongoDatastoreProvider;
      break;
    case "postgres":
      provider.useClass = PostgresDatastoreProvider;
      break;
    case "sqlite":
      provider.useClass = SqliteDatastoreProvider;
      break;
    default:
      provider.useClass = SqliteDatastoreProvider;
      break;
  }

  return provider;
}

export function createDatastoreProviderFactory(): Provider {
  return {
    provide: "BaseDatastore",
    useFactory: (modOpts: DataStoreModuleOptions) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new createDatastoreProvider(modOpts)();
    },
    inject: [DATA_STORE_CONFIG_OPTIONS, ConfigStore],
  };
}
