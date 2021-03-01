import { IQuery } from '@nestjs/cqrs';

import { SuggestionStatus, SuggestionType } from 'src/cafe/domain/constant';

export class LocationFilter {
  public readonly minLongitude: number;

  public readonly maxLongitude: number;

  public readonly minLatitude: number;

  public readonly maxLatitude: number;
}

export class PaginationFilter {
  public readonly offset: number;

  public readonly limit: number;
}

export class OtherFilter {
  public readonly name: string;

  public readonly address: string;

  public readonly status: SuggestionStatus[];

  public readonly type: SuggestionType[];
}

export class Option {
  public readonly location: LocationFilter;

  public readonly pagination: PaginationFilter;

  public readonly other: OtherFilter;
}

export class FindSuggestionQuery implements IQuery {
  constructor(public readonly option: Option) {}
}
