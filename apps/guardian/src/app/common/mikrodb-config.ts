import { IDatabaseDriver } from '@mikro-orm/core';
import { BootConfig } from '@ultimate-backend/bootstrap';
import { Injectable } from '@nestjs/common';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@ub-boilerplate/common/database/mikro-orm';
import {
  getMikroORMOptions,
  importAllEntities,
  importAll,
} from '@ub-boilerplate/common/database';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const migrations = importAll(require.context('../../migrations', false, /\.ts$/));
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const entities = importAllEntities(require.context('./entities', false, /\.ts$/));

@Injectable()
export class MikroDBConfig implements MikroOrmOptionsFactory {
  constructor(private readonly store: BootConfig) {}

  async createMikroOrmOptions(): Promise<MikroOrmModuleOptions<IDatabaseDriver>> {
    return getMikroORMOptions(this.store, { migrations, entities });
  }
}
