export enum DataStoresEnum {
  Mongo = "mongodb",
  Postgres = "pg",
  Sqlite = "sqlite",
  Mysql = "Mysql",
}

export interface DataStoreInput {
  mongodb: boolean;
  postgres: boolean;
  mysql: boolean;
  sqlite: boolean;
}

export type DataStoreInputKeys = keyof DataStoreInput;
