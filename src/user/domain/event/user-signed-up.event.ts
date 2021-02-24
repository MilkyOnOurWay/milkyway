import { IEvent } from "@nestjs/cqrs";

export class UserSignedUpEvent implements IEvent {
  constructor(private readonly userId: string) {}
}
