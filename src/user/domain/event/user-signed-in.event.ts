import { IEvent } from '@nestjs/cqrs';

export class UserSignedInEvent implements IEvent {
  constructor(private readonly userId: string) {}
}
