import {Injectable} from "@nestjs/common";
import {SharedBullConfigurationFactory} from "@nestjs/bull";
import * as Bull from "bull";
import {BootConfig} from "@ultimate-backend/bootstrap";

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
  constructor(private readonly boot: BootConfig) {
  }
  createSharedConfiguration(): Promise<Bull.QueueOptions> | Bull.QueueOptions {
    return {
      redis: this.boot.get('clients.redis.redisOptions'),
    };
  }
}
