import { Test, TestingModule } from '@nestjs/testing';
import { OrganisationMembersGrpcService } from './organisation-members-grpc.service';

describe('Organisations Member Grpc Service', () => {
  let controller: OrganisationMembersGrpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisationMembersGrpcService],
    }).compile();

    controller = module.get<OrganisationMembersGrpcService>(
      OrganisationMembersGrpcService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
