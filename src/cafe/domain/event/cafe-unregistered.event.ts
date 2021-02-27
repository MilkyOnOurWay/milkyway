import { IEvent } from '@nestjs/cqrs';

export class CafeUnregisteredEvent implements IEvent {
  constructor(public readonly cafeId: string) {}
}
