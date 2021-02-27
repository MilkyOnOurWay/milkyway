import { IEvent } from '@nestjs/cqrs';

export class SuggestionAcceptedEvent implements IEvent {
  constructor(public readonly suggestionId: string) {}
}
