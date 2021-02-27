import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { CreateSuggestionDto } from 'src/cafe/interface/dto/create-suggestion.dto';

import { CreateSuggestionCommand } from 'src/cafe/application/command/create-suggestion.command';
import { AcceptSuggestionCommand } from 'src/cafe/application/command/accept-suggestion.command';
import { CancelSuggestionCommand } from 'src/cafe/application/command/cancel-suggestion.command';
import { RejectSuggestionCommand } from 'src/cafe/application/command/reject-suggestion.command';

import { Cafe } from 'src/cafe/domain/suggestion';

@Controller('suggestions')
export class SuggestionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  public async create(@Body() dto: CreateSuggestionDto): Promise<void> {
    const { type, cafeId } = dto;
    const cafeData: Cafe = { ...dto, id: cafeId };
    const command = new CreateSuggestionCommand(type, cafeData);
    await this.commandBus.execute(command);
  }

  @Put('/:id/accept')
  public async accept(@Param('id') id: string): Promise<void> {
    const command = new AcceptSuggestionCommand(id);
    await this.commandBus.execute(command);
  }

  @Put('/:id/cancel')
  public async cancel(@Param('id') id: string): Promise<void> {
    const command = new CancelSuggestionCommand(id);
    await this.commandBus.execute(command);
  }

  @Put('/:id/reject')
  public async reject(@Param('id') id: string): Promise<void> {
    const command = new RejectSuggestionCommand(id);
    await this.commandBus.execute(command);
  }
}
