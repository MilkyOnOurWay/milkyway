import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UpdateCommand } from 'src/user/application/command/update.command';

import { UserRepository } from 'src/user/domain/repository';

@CommandHandler(UpdateCommand)
export class UpdateHandler implements ICommandHandler<UpdateCommand> {
  constructor(
    @Inject('UserRepositoryImplement')
    private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}
  public async execute(command: UpdateCommand): Promise<any> {
    const data = await this.userRepository.findById(command.id);
    if (!data) throw new NotFoundException();

    const user = this.eventPublisher.mergeObjectContext(data);

    user.update({ name: command.name });

    await this.userRepository.save(user);

    user.commit();
  }
}
