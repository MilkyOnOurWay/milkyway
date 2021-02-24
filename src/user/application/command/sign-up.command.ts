import { ICommand } from "@nestjs/cqrs";

export class SignUpCommand implements ICommand {
  constructor(public readonly name: string){}
}
