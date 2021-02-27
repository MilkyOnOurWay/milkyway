import { ICommand } from '@nestjs/cqrs';

import { SuggestionType } from 'src/cafe/domain/constant';
import { Cafe } from 'src/cafe/domain/suggestion';

export class CreateSuggestionCommand implements ICommand {
  constructor(
    public readonly type: SuggestionType,
    public readonly cafe: Cafe,
  ) {}
}
