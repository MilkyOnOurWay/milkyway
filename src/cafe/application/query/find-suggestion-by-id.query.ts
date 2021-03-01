import { IQuery } from '@nestjs/cqrs';

export class FindSuggestionByIdQuery implements IQuery {
  constructor(public readonly id: string) {}
}
