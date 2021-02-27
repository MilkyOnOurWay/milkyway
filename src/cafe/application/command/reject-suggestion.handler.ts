import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { RejectSuggestionCommand } from 'src/cafe/application/command/reject-suggestion.command';

import { SuggestionRepository } from 'src/cafe/domain/repository';

@CommandHandler(RejectSuggestionCommand)
export class RejectSuggestionHandler
  implements ICommandHandler<RejectSuggestionCommand> {
  constructor(
    @Inject('SuggestionRepositoryImplement')
    private readonly suggestionRepository: SuggestionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(command: RejectSuggestionCommand): Promise<void> {
    const data = await this.suggestionRepository.findById(command.id);
    if (!data) throw new NotFoundException();

    const suggestion = this.eventPublisher.mergeObjectContext(data);

    suggestion.reject();

    await this.suggestionRepository.save(suggestion);

    suggestion.commit();
  }
}
