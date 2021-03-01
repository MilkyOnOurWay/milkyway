import {
  Between,
  FindConditions,
  FindManyOptions,
  getRepository,
  In,
  Like,
} from 'typeorm';

import { Suggestion } from 'src/cafe/infrastructure/entities/suggestion.entity';

import { FindSuggestionByIdResult } from 'src/cafe/application/query/find-suggestion-by-id.result';
import { Option } from 'src/cafe/application/query/find-suggestion.query';
import { FindSuggestionQueryResult } from 'src/cafe/application/query/find-suggestion.result';
import { SuggestionQuery } from 'src/cafe/application/query/suggestion.query';

export class SuggestionQueryImplement implements SuggestionQuery {
  public async findById(id: string): Promise<FindSuggestionByIdResult> {
    const entity = await getRepository(Suggestion).findOne({
      where: { id },
      relations: ['menus', 'menus.categories', 'tips'],
    });

    return {
      ...entity,
      cafe: {
        ...entity,
        id: entity.cafeId,
        menus: entity.menus.map((item) => ({
          ...item,
          categories: item.categories.map(({ category }) => category),
        })),
        tips: entity.tips.map(({ tip }) => tip),
      },
    };
  }

  public async find(option: Option): Promise<FindSuggestionQueryResult> {
    const location = option.location
      ? {
          longitude: Between(
            option.location.minLatitude,
            option.location.maxLongitude,
          ),
          latitude: Between(
            option.location.minLatitude,
            option.location.maxLatitude,
          ),
        }
      : undefined;

    let condition: FindConditions<Suggestion> = {};
    condition = location ? { ...location } : {};
    condition = option.other.name
      ? { ...condition, name: Like(`%${option.other.name}%`) }
      : condition;
    condition = option.other.address
      ? { ...condition, address: Like(`%${option.other.address}%`) }
      : condition;
    condition = option.other.type
      ? { ...condition, type: In(option.other.type) }
      : condition;
    condition = option.other.status
      ? { ...condition, status: In(option.other.status) }
      : condition;

    let options: FindManyOptions<Suggestion> = {};
    options.where = condition;
    options = option.pagination
      ? { ...options, skip: option.pagination.offset }
      : options;
    options = option.pagination
      ? { ...options, take: option.pagination.limit }
      : options;

    return (await getRepository(Suggestion).find(options)).map(
      (suggestion) => ({
        id: suggestion.id,
        name: suggestion.name,
        address: suggestion.address,
        status: suggestion.status,
        type: suggestion.type,
      }),
    );
  }
}
