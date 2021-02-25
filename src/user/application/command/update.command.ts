import { ICommand } from '@nestjs/cqrs';

export class UpdateCommand implements ICommand {
  constructor(public readonly id: string, public readonly name: string) {}
}
