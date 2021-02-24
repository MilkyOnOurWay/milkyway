import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { UserUpdatedEvent } from "src/user/domain/event/user-updated.event";

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  public handle(event: UserUpdatedEvent) {
    console.log('user updated', event);
  }
}
