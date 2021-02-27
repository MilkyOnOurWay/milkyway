import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CancelSuggestionCommand } from 'src/cafe/application/command/cancel-suggestion.command';

import { SuggestionRepository } from 'src/cafe/domain/repository';

@CommandHandler(CancelSuggestionCommand)
export class CancelSuggestionHandler
  implements ICommandHandler<CancelSuggestionCommand> {
  constructor(
    @Inject('SuggestionRepositoryImplement')
    private readonly suggestionRepository: SuggestionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(command: CancelSuggestionCommand): Promise<void> {
    const data = await this.suggestionRepository.findById(command.id);
    if (!data) throw new NotFoundException();

    const suggestion = this.eventPublisher.mergeObjectContext(data);

    suggestion.cancel();

    await this.suggestionRepository.save(suggestion);

    suggestion.commit();
  }
}
