import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { SignInCommand } from 'src/user/application/command/sign-in.command';

import { UserRepository } from 'src/user/domain/repository';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  constructor(
    @Inject('UserRepositoryImplement')
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  public async execute(command: SignInCommand): Promise<void> {
    const data = await this.userRepository.findById(command.id);
    if (!data) throw new NotFoundException();

    const user = this.eventPublisher.mergeObjectContext(data);
    user.signIn();

    await this.userRepository.save(user);

    user.commit();
  }
}
