import { Controller, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateUserDto } from 'src/user/interface/dto/create-user.dto';
import { SignInDto } from 'src/user/interface/dto/sign-in.dto';
import { UpdateUserDto } from 'src/user/interface/dto/update-user.dto';

import { DeleteCommand } from 'src/user/application/command/delete.command';
import { SignInCommand } from 'src/user/application/command/sign-in.command';
import { SignUpCommand } from 'src/user/application/command/sign-up.command';
import { UpdateCommand } from 'src/user/application/command/update.command';

@Controller('users')
export class UserController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  public async create(@Body() dto: CreateUserDto): Promise<void> {
    await this.commandBus.execute(new SignUpCommand(dto.name));
  }

  @Post('signin')
  public async signIn(@Body() dto: SignInDto): Promise<void> {
    await this.commandBus.execute(new SignInCommand(dto.id, dto.name));
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<void> {
    await this.commandBus.execute(new UpdateCommand(id, dto.name));
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    await this.commandBus.execute(new DeleteCommand(id));
  }
}
