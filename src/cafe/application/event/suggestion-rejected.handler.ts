import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SuggestionRejectedEvent } from 'src/cafe/domain/event/suggestion-rejected.event';

@EventsHandler(SuggestionRejectedEvent)
export class SuggestionRejectedHandler
  implements IEventHandler<SuggestionRejectedEvent> {
  public async handle(event: SuggestionRejectedEvent): Promise<void> {
    console.log('suggestion rejected', event);
  }
}
