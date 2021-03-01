import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';

import { CreateSuggestionDto } from 'src/cafe/interface/dto/create-suggestion.dto';
import { FindSuggestionDto } from 'src/cafe/interface/dto/find-suggestion.dto';

import { CreateSuggestionCommand } from 'src/cafe/application/command/create-suggestion.command';
import { AcceptSuggestionCommand } from 'src/cafe/application/command/accept-suggestion.command';
import { CancelSuggestionCommand } from 'src/cafe/application/command/cancel-suggestion.command';
import { RejectSuggestionCommand } from 'src/cafe/application/command/reject-suggestion.command';
import { FindSuggestionByIdQuery } from 'src/cafe/application/query/find-suggestion-by-id.query';
import { FindSuggestionByIdResult } from 'src/cafe/application/query/find-suggestion-by-id.result';

import { Cafe } from 'src/cafe/domain/suggestion';
import { FindSuggestionQueryResult } from 'src/cafe/application/query/find-suggestion.result';
import { FindSuggestionQuery } from 'src/cafe/application/query/find-suggestion.query';

@ApiTags('Suggestions')
@Controller('suggestions')
export class SuggestionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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

  @Get('/:id')
  public async findById(
    @Param('id') id: string,
  ): Promise<FindSuggestionByIdResult> {
    const query = new FindSuggestionByIdQuery(id);
    return this.queryBus.execute(query);
  }

  @Get()
  public async find(
    @Query() dto: FindSuggestionDto,
  ): Promise<FindSuggestionQueryResult> {
    const option = {
      location: undefined,
      pagination: undefined,
      other: undefined,
    };

    const { maxLatitude, maxLongitude, minLatitude, minLongitude } = dto;
    if (!!maxLatitude && !!maxLongitude && !!minLatitude && !!minLongitude)
      option.location = {
        maxLatitude,
        maxLongitude,
        minLatitude,
        minLongitude,
      };

    const { offset = 0, limit = 10 } = dto;
    option.pagination = { offset, limit };

    const { name, address, status, type } = dto;
    option.other = { name, address, status, type };

    return this.queryBus.execute(new FindSuggestionQuery(option));
  }
}
