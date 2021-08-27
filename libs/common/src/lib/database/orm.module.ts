import { Module } from '@nestjs/common';
import { MikroOrmModule } from './mikro-orm';

@Module({
  imports: [MikroOrmModule.forRoot()],
  exports: [MikroOrmModule],
})
export class OrmModule {}
