import { ICommand } from '@nestjs/cqrs';

export class AcceptSuggestionCommand implements ICommand {
  constructor(public readonly id: string) {}
}
