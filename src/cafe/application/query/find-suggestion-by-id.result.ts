import { IQueryResult } from '@nestjs/cqrs';

import { BusinessHours, Menu } from 'src/cafe/domain/cafe';
import {
  CafeTip,
  SuggestionStatus,
  SuggestionType,
} from 'src/cafe/domain/constant';

class Cafe {
  public readonly id: string;
  public readonly name: string;
  public readonly address: string;
  public readonly businessHours: BusinessHours;
  public readonly phone: string;
  public readonly link: string;
  public readonly longitude: number;
  public readonly latitude: number;
  public readonly menus: Menu[];
  public readonly tips: CafeTip[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
}

export class FindSuggestionByIdResult implements IQueryResult {
  public readonly id: string;
  public readonly type: SuggestionType;
  public readonly status: SuggestionStatus;
  public readonly cafe: Cafe;
}
