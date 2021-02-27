import { IEvent } from '@nestjs/cqrs';

export class SuggestionCreatedEvent implements IEvent {
  constructor(public readonly suggestionId: string) {}
}
