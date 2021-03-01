import { FindSuggestionByIdResult } from 'src/cafe/application/query/find-suggestion-by-id.result';
import { Option } from 'src/cafe/application/query/find-suggestion.query';
import { FindSuggestionQueryResult } from 'src/cafe/application/query/find-suggestion.result';

export interface SuggestionQuery {
  findById(id: string): Promise<FindSuggestionByIdResult>;
  find(option: Option): Promise<FindSuggestionQueryResult>;
}
