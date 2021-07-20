import { Test, TestingModule } from '@nestjs/testing';
import { AccountsQueriesResolver } from './accounts-queries.resolver';

describe('AccountsQueriesResolver', () => {
  let resolver: AccountsQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountsQueriesResolver],
    }).compile();

    resolver = module.get<AccountsQueriesResolver>(AccountsQueriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
