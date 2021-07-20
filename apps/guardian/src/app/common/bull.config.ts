import { SharedBullConfigurationFactory } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { BootConfig } from '@ultimate-backend/bootstrap';
import * as Bull from 'bull';

@Injectable()
export class BullConfig implements SharedBullConfigurationFactory {
  constructor(private readonly boot: BootConfig) {}
  createSharedConfiguration(): Promise<Bull.QueueOptions> | Bull.QueueOptions {
    return {
      redis: this.boot.get('clients.redis.redisOptions'),
    };
  }
}
