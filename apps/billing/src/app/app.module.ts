import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BootstrapModule } from '@ultimate-backend/bootstrap';
import * as path from 'path';

@Module({
  imports: [
    BootstrapModule.forRoot({
      filePath: path.resolve(__dirname, 'assets/bootstrap.yaml'),
      enableEnv: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
