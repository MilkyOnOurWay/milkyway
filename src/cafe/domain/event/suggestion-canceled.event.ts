import { IEvent } from '@nestjs/cqrs';

export class SuggestionCanceledEvent implements IEvent {
  constructor(public readonly suggestionId) {}
}
