import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { PasswordModule } from '../password/password.module';
import { SessionMutationsResolver } from './session-mutations.resolver';
import { SessionsController } from './sessions.controller';
import { SessionsResolver } from './sessions.resolver';
import { SessionsService } from './sessions.service';
import { SessionCommandHandlers } from './commands';

@Module({
  imports: [PasswordModule],
  controllers: [SessionsController],
  providers: [
    ...SessionCommandHandlers,
    SessionsResolver,
    SessionsService,
    SessionMutationsResolver,
    makeCounterProvider({
      name: 'metric_session_create',
      help: 'metric_help',
    }),
  ],
  exports: [SessionsService],
})
export class SessionsModule {}
