import { Test, TestingModule } from '@nestjs/testing';
import { SessionQueriesResolver } from './session-queries.resolver';

describe('SessionQueriesResolver', () => {
  let resolver: SessionQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionQueriesResolver],
    }).compile();

    resolver = module.get<SessionQueriesResolver>(SessionQueriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
