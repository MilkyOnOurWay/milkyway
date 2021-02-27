import { IEvent } from '@nestjs/cqrs';

export class SuggestionRejectedEvent implements IEvent {
  constructor(public readonly suggestionId: string) {}
}
