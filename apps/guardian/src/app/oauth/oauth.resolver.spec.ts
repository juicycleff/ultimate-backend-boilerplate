import { Test, TestingModule } from '@nestjs/testing';
import { OauthResolver } from './oauth.resolver';

describe('OauthResolver', () => {
  let resolver: OauthResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OauthResolver],
    }).compile();

    resolver = module.get<OauthResolver>(OauthResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
