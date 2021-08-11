import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsResolver } from './forms.resolver';
import { FormsQueriesResolver } from './forms-queries.resolver';
import { FormsService } from './forms.service';

@Module({
  providers: [FormsService, FormsResolver, FormsQueriesResolver],
  controllers: [FormsController],
  exports: [FormsService],
})
export class FormsModule {}
