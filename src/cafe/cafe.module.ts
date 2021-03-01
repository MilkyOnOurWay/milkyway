import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SuggestionRepositoryImplement } from 'src/cafe/infrastructure/repository/suggestion.repository';
import { CafeRepositoryImplement } from 'src/cafe/infrastructure/repository/cafe.repository';
import { SuggestionQueryImplement } from 'src/cafe/infrastructure/suggestion.query';

import { CafeController } from 'src/cafe/interface/cafe.controller';
import { SuggestionController } from 'src/cafe/interface/suggestion.controller';

import { AcceptSuggestionHandler } from 'src/cafe/application/command/accept-suggestion.handler';
import { CancelSuggestionHandler } from 'src/cafe/application/command/cancel-suggestion.handler';
import { CreateSuggestionHandler } from 'src/cafe/application/command/create-suggestion.handler';
import { RejectSuggestionHandler } from 'src/cafe/application/command/reject-suggestion.handler';
import { CafeRegisteredHandler } from 'src/cafe/application/event/cafe-registered.handler';
import { CafeUnregisteredHandler } from 'src/cafe/application/event/cafe-unregistered.handler';
import { CafeUpdatedHandler } from 'src/cafe/application/event/cafe-updated.handler';
import { SuggestionAcceptedHandler } from 'src/cafe/application/event/suggestion-accepted.handler';
import { SuggestionCanceledHandler } from 'src/cafe/application/event/suggestion-canceled.handler';
import { SuggestionCreatedHandler } from 'src/cafe/application/event/suggestion-created.handler';
import { SuggestionRejectedHandler } from 'src/cafe/application/event/suggestion-rejected.handler';
import { FindSuggestionHandler } from 'src/cafe/application/query/find-suggestion.handler';
import { FindSuggestionByIdHandler } from 'src/cafe/application/query/find-suggestion-by-id.handler';

const commandHandlers = [
  CreateSuggestionHandler,
  AcceptSuggestionHandler,
  CancelSuggestionHandler,
  RejectSuggestionHandler,
];

const queryHandlers = [FindSuggestionHandler, FindSuggestionByIdHandler];

const eventHandlers = [
  SuggestionCreatedHandler,
  SuggestionAcceptedHandler,
  SuggestionCanceledHandler,
  SuggestionRejectedHandler,
  CafeUpdatedHandler,
  CafeRegisteredHandler,
  CafeUnregisteredHandler,
];

const repositories = [SuggestionRepositoryImplement, CafeRepositoryImplement];

const queries = [SuggestionQueryImplement];

@Module({
  imports: [CqrsModule],
  controllers: [CafeController, SuggestionController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...repositories,
    ...queries,
  ],
})
export class CafeModule {}
