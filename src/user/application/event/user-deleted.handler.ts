import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UserDeletedEvent } from "src/user/domain/event/user-deleted.event";

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  public handle(event: UserDeletedEvent) {
    console.log('user deleted', event);
  }
}
