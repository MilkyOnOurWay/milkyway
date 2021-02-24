import { EventsHandler, IEventHandler } from "@nestjs/cqrs";

import { UserSignedInEvent } from "src/user/domain/event/user-signed-in.event";

@EventsHandler(UserSignedInEvent)
export class UserDeletedHandler implements IEventHandler<UserSignedInEvent> {
  public handle(event: UserSignedInEvent) {
    console.log('user signed up', event);
  }
}
