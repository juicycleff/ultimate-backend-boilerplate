import { Module } from '@nestjs/common';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';
import { PasswordModule } from '../password/password.module';
import { AccountsMutationResolver } from './accounts-mutation.resolver';
import { AccountsQueriesResolver } from './accounts-queries.resolver';
import { AccountsController } from './accounts.controller';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import { PersistenceModule } from '@ub-boilerplate/persistence';

@Module({
  imports: [PersistenceModule, PasswordModule],
  providers: [
    AccountsService,
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
