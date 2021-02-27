import { ICommand } from '@nestjs/cqrs';

export class RejectSuggestionCommand implements ICommand {
  constructor(public readonly id: string) {}
}
