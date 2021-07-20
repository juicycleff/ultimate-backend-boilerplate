import { Test, TestingModule } from '@nestjs/testing';
import { SessionMutationsResolver } from './session-mutations.resolver';

describe('SessionMutationsResolver', () => {
  let resolver: SessionMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionMutationsResolver],
    }).compile();

    resolver = module.get<SessionMutationsResolver>(SessionMutationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
