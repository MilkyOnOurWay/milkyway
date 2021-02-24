import { Inject, NotFoundException } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";

import { DeleteCommand } from "src/user/application/command/delete.command";

import { UserRepository } from "src/user/domain/repository";

@CommandHandler(DeleteCommand)
export class DeleteHandler implements ICommandHandler {
  constructor(
    @Inject('UserRepositoryImplement') private readonly userRepository: UserRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(command: DeleteCommand): Promise<void> {
    const data = await this.userRepository.findById(command.id);
    if (!data) throw new NotFoundException();

    const user = this.eventPublisher.mergeObjectContext(data);

    user.delete();

    await this.userRepository.save(user);

    user.commit();
  }
}
