import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { PasswordModule } from '../password/password.module';
import { AccountsMutationResolver } from './accounts-mutation.resolver';
import { AccountsQueriesResolver } from './accounts-queries.resolver';
import { AccountsController } from './accounts.controller';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { PersistenceModule, UserProfileRepository } from '@ub-boilerplate/persistence';
import { AccountCommandHandlers } from './commands';
import { AccountQueryHandlers } from './queries';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [PersistenceModule, PasswordModule, SessionsModule],
  providers: [
    AccountsService,
    ...AccountCommandHandlers,
    ...AccountQueryHandlers,
    UserProfileRepository,
    AccountsResolver,
    AccountsMutationResolver,
    AccountsQueriesResolver,
    makeCounterProvider({
      name: 'account_create',
      help: 'metric_help',
    }),
  ],
  controllers: [AccountsController],
})
export class AccountsModule {}
