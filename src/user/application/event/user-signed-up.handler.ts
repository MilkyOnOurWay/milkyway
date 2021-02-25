import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserSignedUpEvent } from 'src/user/domain/event/user-signed-up.event';

@EventsHandler(UserSignedUpEvent)
export class UserSignedUpHandler implements IEventHandler<UserSignedUpEvent> {
  public handle(event: UserSignedUpEvent) {
    console.log('user signed in', event);
  }
}
