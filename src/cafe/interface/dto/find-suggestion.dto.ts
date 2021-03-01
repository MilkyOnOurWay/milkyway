import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { SuggestionStatus, SuggestionType } from 'src/cafe/domain/constant';

export class FindSuggestionDto {
  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Min(0)
  public readonly offset: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  @Max(100)
  @Min(1)
  public readonly limit: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  public readonly address: string;

  @ApiPropertyOptional({ enum: SuggestionStatus, isArray: true })
  @IsEnum(SuggestionStatus, { each: true })
  @IsArray()
  @IsOptional()
  public readonly status: SuggestionStatus[];

  @ApiPropertyOptional({ enum: SuggestionType, isArray: true })
  @IsEnum(SuggestionType, { each: true })
  @IsArray()
  @IsOptional()
  public readonly type: SuggestionType[];

  @ApiPropertyOptional()
  @IsLongitude()
  @IsOptional()
  public readonly minLongitude: number;

  @ApiPropertyOptional()
  @IsLongitude()
  @IsOptional()
  public readonly maxLongitude: number;

  @ApiPropertyOptional()
  @IsLatitude()
  @IsOptional()
  public readonly minLatitude: number;

  @ApiPropertyOptional()
  @IsLatitude()
  @IsOptional()
  public readonly maxLatitude: number;
}
