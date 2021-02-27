import { IEvent } from '@nestjs/cqrs';

export class CafeRegisteredEvent implements IEvent {
  constructor(public readonly cafeId: string) {}
}
