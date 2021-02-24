import { Test, TestingModule } from '@nestjs/testing';
import { UniverseController } from './universe.controller';
import { UniverseService } from './universe.service';

describe('UniverseController', () => {
  let controller: UniverseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniverseController],
      providers: [UniverseService],
    }).compile();

    controller = module.get<UniverseController>(UniverseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
