import { Test, TestingModule } from '@nestjs/testing';
import { FormsQueriesResolver } from './forms-queries.resolver';

describe('FormsQueriesResolver', () => {
  let resolver: FormsQueriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormsQueriesResolver],
    }).compile();

    resolver = module.get<FormsQueriesResolver>(FormsQueriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
