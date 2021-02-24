import { Test, TestingModule } from '@nestjs/testing';
import { UniverseService } from './universe.service';

describe('UniverseService', () => {
  let service: UniverseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniverseService],
    }).compile();

    service = module.get<UniverseService>(UniverseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
