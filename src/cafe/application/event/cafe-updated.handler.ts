import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CafeUpdatedEvent } from 'src/cafe/domain/event/cafe-updated.event';

@EventsHandler(CafeUpdatedEvent)
export class CafeUpdatedHandler implements IEventHandler<CafeUpdatedEvent> {
  public async handle(event: CafeUpdatedEvent): Promise<void> {
    console.log('cafe updated', event);
  }
}
