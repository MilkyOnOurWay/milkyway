import { Module } from '@nestjs/common';
import { UniverseService } from './universe.service';
import { UniverseController } from './universe.controller';

@Module({
  controllers: [UniverseController],
  providers: [UniverseService]
})
export class UniverseModule {}
