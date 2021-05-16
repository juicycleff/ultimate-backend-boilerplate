import {
  Injectable,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { BaseDatastore } from "./base.datastore";
import { ConfigValue } from "@ultimate-backend/config";
import { DatastoreConfig, handleRetry } from "../../common";
import { defer } from "rxjs";
import { open, Database } from "sqlite";
import * as sqlite3 from "sqlite3";

// @Injectable()
export class SqliteDatastoreProvider
  extends BaseDatastore<Database>
  implements OnApplicationBootstrap, OnApplicationShutdown {
  logger = new Logger(SqliteDatastoreProvider.name);

  @ConfigValue("datastore", {})
  private config: DatastoreConfig;

  async connect(): Promise<void> {
    if (!this.config) {
      throw new Error("Missing database configuration");
    }

    try {
      return await defer(async () => {
        this.client = await open({
          filename: `/tmp/${this.config.dbName}.db`,
          driver: sqlite3.cached.Database,
        });
        this.logger.log("sqlite client connected successfully");
      })
        .pipe(
          handleRetry(
            this.config.retryAttempts,
            this.config.retryDelays,
            SqliteDatastoreProvider.name
          )
        )
        .toPromise();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async close(): Promise<void> {
    return await this.client.close();
  }

  async onApplicationBootstrap() {
    await this.connect();
  }

  async onApplicationShutdown() {
    try {
      await this.close();
    } catch (e) {
      //
    }
  }
}
