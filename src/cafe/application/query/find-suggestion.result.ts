import { IQueryResult } from '@nestjs/cqrs';

import { SuggestionStatus, SuggestionType } from 'src/cafe/domain/constant';

class Suggestion {
  public readonly id: string;
  public readonly name: string;
  public readonly address: string;
  public readonly status: SuggestionStatus;
  public readonly type: SuggestionType;
}

export class FindSuggestionQueryResult
  extends Array<Suggestion>
  implements IQueryResult {}
