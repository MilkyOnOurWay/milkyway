import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateSuggestionCommand } from 'src/cafe/application/command/create-suggestion.command';

import { SuggestionStatus } from 'src/cafe/domain/constant';
import { SuggestionRepository } from 'src/cafe/domain/repository';
import { Suggestion } from 'src/cafe/domain/suggestion';

@CommandHandler(CreateSuggestionCommand)
export class CreateSuggestionHandler
  implements ICommandHandler<CreateSuggestionCommand> {
  constructor(
    @Inject('SuggestionRepositoryImplement')
    private readonly suggestionRepository: SuggestionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async execute(command: CreateSuggestionCommand): Promise<void> {
    const suggestion = new (this.eventPublisher.mergeClassContext(Suggestion))({
      id: await this.suggestionRepository.findNewId(),
      type: command.type,
      cafe: command.cafe,
      status: SuggestionStatus.REQUESTED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    suggestion.suggest();

    await this.suggestionRepository.save(suggestion);

    suggestion.commit();
  }
}
