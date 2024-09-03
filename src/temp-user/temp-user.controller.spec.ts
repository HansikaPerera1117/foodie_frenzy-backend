import { Test, TestingModule } from '@nestjs/testing';
import { TempUserController } from './temp-user.controller';

describe('TempUserController', () => {
  let controller: TempUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempUserController],
    }).compile();

    controller = module.get<TempUserController>(TempUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
