import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SuggestionCanceledEvent } from 'src/cafe/domain/event/suggestion-canceled.event';

@EventsHandler(SuggestionCanceledEvent)
export class SuggestionCanceledHandler
  implements IEventHandler<SuggestionCanceledEvent> {
  public async handle(event: SuggestionCanceledEvent): Promise<void> {
    console.log('suggestion canceled', event);
  }
}
