import { Test, TestingModule } from '@nestjs/testing';
import { CafeController } from './cafe.controller';

describe('CafeController', () => {
  let controller: CafeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CafeController],
      providers: [],
    }).compile();

    controller = module.get<CafeController>(CafeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
