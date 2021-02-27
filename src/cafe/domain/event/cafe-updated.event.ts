import { IEvent } from '@nestjs/cqrs';

export class CafeUpdatedEvent implements IEvent {
  constructor(public readonly cafeId: string) {}
}
