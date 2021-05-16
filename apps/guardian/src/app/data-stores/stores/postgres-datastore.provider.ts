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
import { Pool } from "pg";

@Injectable()
export class PostgresDatastoreProvider
  extends BaseDatastore<Pool>
  implements OnApplicationBootstrap, OnApplicationShutdown {
  logger = new Logger(PostgresDatastoreProvider.name);

  @ConfigValue("datastore", {})
  private config: DatastoreConfig;

  async connect(): Promise<void> {
    if (!this.config) {
      throw new Error("Missing database configuration");
    }

    try {
      return await defer(async () => {
        this.client = new Pool({
          connectionString: this.config.dbUrl,
        });
        await this.client.connect();
        this.logger.log("postgres client connected successfully");
      })
        .pipe(
          handleRetry(
            this.config.retryAttempts,
            this.config.retryDelays,
            PostgresDatastoreProvider.name
          )
        )
        .toPromise();
    } catch (e) {
      this.logger.error(e);
    }
  }

  async close(): Promise<void> {
    return await this.client.end();
  }

  async onApplicationBootstrap() {
    await this.connect();
  }

  async onApplicationShutdown() {
    await this.close();
  }
}
