import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CafeModule } from './cafe/cafe.module';
import { SuggestionModule } from './suggestion/suggestion.module';
import { UniverseModule } from './universe/universe.module';

@Module({
  imports: [UserModule, CafeModule, SuggestionModule, UniverseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
