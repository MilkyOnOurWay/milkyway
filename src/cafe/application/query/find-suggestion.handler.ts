import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { FindSuggestionQuery } from 'src/cafe/application/query/find-suggestion.query';
import { FindSuggestionQueryResult } from 'src/cafe/application/query/find-suggestion.result';
import { SuggestionQuery } from 'src/cafe/application/query/suggestion.query';

@QueryHandler(FindSuggestionQuery)
export class FindSuggestionHandler
  implements IQueryHandler<FindSuggestionQuery> {
  constructor(
    @Inject('SuggestionQueryImplement')
    private readonly suggestionQuery: SuggestionQuery,
  ) {}

  public async execute(
    query: FindSuggestionQuery,
  ): Promise<FindSuggestionQueryResult> {
    return this.suggestionQuery.find(query.option);
  }
}
