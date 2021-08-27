import { Test, TestingModule } from '@nestjs/testing';
import { RolesMutationsResolver } from './roles-mutations.resolver';

describe('RolesMutationsResolver', () => {
  let resolver: RolesMutationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesMutationsResolver],
    }).compile();

    resolver = module.get<RolesMutationsResolver>(RolesMutationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
