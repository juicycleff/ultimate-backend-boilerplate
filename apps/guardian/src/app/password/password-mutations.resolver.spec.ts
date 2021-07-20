import { Test, TestingModule } from '@nestjs/testing';
import { PasswordMutationsResolver } from './password-mutations.resolver';

describe('SessionMutationsResolver', () => {
  let resolver: PasswordMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordMutationsResolver],
    }).compile();

    resolver = module.get<PasswordMutationsResolver>(PasswordMutationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
