import { Inject, NotFoundException } from '@nestjs/common';
import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { SuggestionAcceptedEvent } from 'src/cafe/domain/event/suggestion-accepted.event';
import { Cafe } from 'src/cafe/domain/cafe';
import {
  CafeRepository,
  SuggestionRepository,
} from 'src/cafe/domain/repository';
import { Suggestion } from 'src/cafe/domain/suggestion';
import { SuggestionType } from 'src/cafe/domain/constant';

@EventsHandler(SuggestionAcceptedEvent)
export class SuggestionAcceptedHandler
  implements IEventHandler<SuggestionAcceptedEvent> {
  constructor(
    @Inject('CafeRepositoryImplement')
    private readonly cafeRepository: CafeRepository,
    @Inject('SuggestionRepositoryImplement')
    private readonly suggestionRepository: SuggestionRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  public async handle(event: SuggestionAcceptedEvent): Promise<void> {
    console.log('suggestion accepted', event);

    const { suggestionId } = event;

    const suggestion = await this.suggestionRepository.findById(suggestionId);

    if (suggestion.getAttributes().type === SuggestionType.REGISTRATION)
      this.registerCafe(suggestion);

    if (suggestion.getAttributes().type === SuggestionType.MODIFY)
      this.updateCafe(suggestion);

    if (suggestion.getAttributes().type === SuggestionType.DEREGISTER)
      this.deregisterCafe(suggestion);
  }

  private async registerCafe(suggestion: Suggestion): Promise<void> {
    const cafe = new (this.eventPublisher.mergeClassContext(Cafe))({
      id: await this.cafeRepository.findNewId(),
      name: suggestion.getAttributes().cafe.name,
      address: suggestion.getAttributes().cafe.address,
      businessHours: suggestion.getAttributes().cafe.businessHours,
      phone: suggestion.getAttributes().cafe.phone,
      link: suggestion.getAttributes().cafe.link,
      longitude: suggestion.getAttributes().cafe.longitude,
      latitude: suggestion.getAttributes().cafe.latitude,
      menus: suggestion.getAttributes().cafe.menus,
      tips: suggestion.getAttributes().cafe.tips,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    cafe.register();

    await this.cafeRepository.save(cafe);

    cafe.commit();
  }

  private async updateCafe(suggestion: Suggestion): Promise<void> {
    const id = suggestion.getAttributes().cafe.id;
    const data = await this.cafeRepository.findById(id);
    if (!data) throw new NotFoundException();

    const cafe = this.eventPublisher.mergeObjectContext(data);

    cafe.setAttributes({
      name: suggestion.getAttributes().cafe.name,
      address: suggestion.getAttributes().cafe.address,
      businessHours: suggestion.getAttributes().cafe.businessHours,
      phone: suggestion.getAttributes().cafe.phone,
      link: suggestion.getAttributes().cafe.link,
      longitude: suggestion.getAttributes().cafe.longitude,
      latitude: suggestion.getAttributes().cafe.latitude,
      menus: suggestion.getAttributes().cafe.menus,
      tips: suggestion.getAttributes().cafe.tips,
      updatedAt: new Date(),
    });

    await this.cafeRepository.save(cafe);

    cafe.commit();
  }

  private async deregisterCafe(suggestion: Suggestion): Promise<void> {
    const cafeId = suggestion.getAttributes().cafe.id;
    const data = await this.cafeRepository.findById(cafeId);
    if (!data) throw new NotFoundException();

    const cafe = this.eventPublisher.mergeObjectContext(data);

    cafe.deregister();

    await this.cafeRepository.save(cafe);

    cafe.commit();
  }
}
