import { Module } from '@nestjs/common';

import { LogService } from './helpers/log.service';
import { MigrateCommand } from './migrate.command';
import { StudioCommand } from './studio.command';

@Module({
  providers: [LogService, MigrateCommand, StudioCommand],
})
export class AppModule {}
