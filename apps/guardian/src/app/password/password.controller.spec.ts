import { Test, TestingModule } from '@nestjs/testing';
import { PasswordController } from './password.controller';

describe('PasswordController', () => {
  let controller: PasswordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasswordController],
    }).compile();

    controller = module.get<PasswordController>(PasswordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
