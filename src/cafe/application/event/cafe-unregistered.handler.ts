import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CafeUnregisteredEvent } from 'src/cafe/domain/event/cafe-unregistered.event';

@EventsHandler(CafeUnregisteredEvent)
export class CafeUnregisteredHandler
  implements IEventHandler<CafeUnregisteredEvent> {
  public async handle(event: CafeUnregisteredEvent): Promise<void> {
    console.log('cafe unregistered', event);
  }
}
