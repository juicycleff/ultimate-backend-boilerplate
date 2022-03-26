import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationsGrpcService } from './organisations-grpc.service';

describe('Organisations Grpc Service', () => {
  let controller: OrganisationsGrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationsGrpcService],
    }).compile();

    controller = module.get<OrganisationsGrpcService>(OrganisationsGrpcService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
