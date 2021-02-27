import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SuggestionCreatedEvent } from 'src/cafe/domain/event/suggestion-created.event';

@EventsHandler(SuggestionCreatedEvent)
export class SuggestionCreatedHandler
  implements IEventHandler<SuggestionCreatedEvent> {
  public async handle(event: SuggestionCreatedEvent): Promise<void> {
    console.log('suggestion created', event);
  }
}
