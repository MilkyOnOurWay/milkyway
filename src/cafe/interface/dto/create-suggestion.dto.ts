import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ enum: SuggestionType })
  @IsEnum(SuggestionType)
  public readonly type: SuggestionType;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly cafeId?: string;

  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsString()
  @ApiProperty()
  public readonly address: string;

  @Type(() => BusinessHours)
  @ValidateNested({ each: true })
  @ApiProperty({ type: () => BusinessHours })
  public readonly businessHours: BusinessHours;

  @IsPhoneNumber()
  @ApiProperty()
  public readonly phone: string;

  @IsString()
  @ApiProperty()
  public readonly link: string;

  @IsLongitude()
  @ApiProperty()
  public readonly longitude: number;

  @IsLatitude()
  @ApiProperty()
  public readonly latitude: number;

  @IsArray()
  @Type(() => Menu)
  @ValidateNested({ each: true })
  @ApiProperty({ type: [Menu] })
  public readonly menus: Menu[];

  @IsEnum(CafeTip, { each: true })
  @ApiProperty({ enum: CafeTip, isArray: true })
  @IsArray()
  public readonly tips: CafeTip[];
}
