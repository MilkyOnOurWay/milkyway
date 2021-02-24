import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { SignUpCommand } from "src/user/application/command/sign-up.command";

import { UserRepository } from "src/user/domain/repository";
import { User } from "src/user/domain/user";

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @Inject('UserRepositoryImplement') private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  public async execute(command: SignUpCommand): Promise<any> {
    const id = await this.userRepository.findNewId();
    const UserModel = this.eventPublisher.mergeClassContext(User);
    
    const user = new UserModel({ id, name: command.name });
    
    user.signUp();
    
    await this.userRepository.save(user);
    
    user.commit();
  }
}
