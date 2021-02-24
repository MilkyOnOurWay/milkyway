import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CafeModule } from './cafe/cafe.module';
import { UniverseModule } from './universe/universe.module';
import AppService from 'src/app.service';

@Module({
  imports: [UserModule, CafeModule, UniverseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
