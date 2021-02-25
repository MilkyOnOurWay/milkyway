import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';

import { UserRepositoryImplement } from 'src/user/infrastructure/repository';

import { UserController } from 'src/user/interface/user.controller';

import { DeleteHandler } from 'src/user/application/command/delete.handler';
import { SignInHandler } from 'src/user/application/command/sign-in.handler';
import { SignUpHandler } from 'src/user/application/command/sign-up.handler';
import { UpdateHandler } from 'src/user/application/command/update.handler';

const repositories = [UserRepositoryImplement];

const commandHandlers = [
  SignUpHandler,
  SignInHandler,
  UpdateHandler,
  DeleteHandler,
];

@Module({
  imports: [CqrsModule, ConfigModule],
  controllers: [UserController],
  providers: [...commandHandlers, ...repositories],
})
export class UserModule {}
