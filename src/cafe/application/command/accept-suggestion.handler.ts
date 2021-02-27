import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AcceptSuggestionCommand } from 'src/cafe/application/command/accept-suggestion.command';

import { SuggestionRepository } from 'src/cafe/domain/repository';

@CommandHandler(AcceptSuggestionCommand)
export class AcceptSuggestionHandler
  implements ICommandHandler<AcceptSuggestionCommand> {
  constructor(
    @Inject('SuggestionRepositoryImplement')
    private readonly suggestionRepository: SuggestionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(command: AcceptSuggestionCommand): Promise<void> {
    const data = await this.suggestionRepository.findById(command.id);
    if (!data) throw new NotFoundException();

    const suggestion = this.eventPublisher.mergeObjectContext(data);

    suggestion.accept();

    await this.suggestionRepository.save(suggestion);

    suggestion.commit();
  }
}
