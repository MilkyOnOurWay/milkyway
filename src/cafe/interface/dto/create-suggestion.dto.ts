import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { BusinessHours, Menu } from 'src/cafe/domain/cafe';
import { CafeTip, SuggestionType } from 'src/cafe/domain/constant';

export class CreateSuggestionDto {
  @IsEnum(SuggestionType)
  public readonly type: SuggestionType;

  @IsString()
  @IsOptional()
  public readonly cafeId?: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly address: string;

  @Type(() => BusinessHours)
  @ValidateNested({ each: true })
  public readonly businessHours: BusinessHours;

  @IsPhoneNumber()
  public readonly phone: string;

  @IsString()
  public readonly link: string;

  @IsLongitude()
  public readonly longitude: number;

  @IsLatitude()
  public readonly latitude: number;

  @IsArray()
  @Type(() => Menu)
  @ValidateNested({ each: true })
  public readonly menus: Menu[];

  @IsEnum(CafeTip, { each: true })
  public readonly tips: CafeTip[];
}
