import { ICommand } from '@nestjs/cqrs';

export class CancelSuggestionCommand implements ICommand {
  constructor(public readonly id: string) {}
}
