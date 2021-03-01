import { Inject, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindSuggestionByIdQuery } from 'src/cafe/application/query/find-suggestion-by-id.query';
import { FindSuggestionByIdResult } from 'src/cafe/application/query/find-suggestion-by-id.result';
import { SuggestionQuery } from 'src/cafe/application/query/suggestion.query';

@QueryHandler(FindSuggestionByIdQuery)
export class FindSuggestionByIdHandler
  implements IQueryHandler<FindSuggestionByIdQuery> {
  constructor(
    @Inject('SuggestionQueryImplement')
    private readonly suggestionQuery: SuggestionQuery,
  ) {}

  public async execute(
    query: FindSuggestionByIdQuery,
  ): Promise<FindSuggestionByIdResult> {
    const suggestion = await this.suggestionQuery.findById(query.id);
    if (!suggestion) throw new NotFoundException();
    return suggestion;
  }
}
