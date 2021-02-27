import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { CafeRegisteredEvent } from 'src/cafe/domain/event/cafe-registered.event';

@EventsHandler(CafeRegisteredEvent)
export class CafeRegisteredHandler
  implements IEventHandler<CafeRegisteredEvent> {
  public async handle(event: CafeRegisteredEvent): Promise<void> {
    console.log('cafe registered', event);
  }
}
