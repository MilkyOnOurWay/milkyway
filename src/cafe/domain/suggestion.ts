import { AggregateRoot } from '@nestjs/cqrs';
import {
  IsDate,
  IsEnum,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BadRequestException } from '@nestjs/common';

import { SuggestionAcceptedEvent } from 'src/cafe/domain/event/suggestion-accepted.event';
import { SuggestionCanceledEvent } from 'src/cafe/domain/event/suggestion-canceled.event';
import { SuggestionRejectedEvent } from 'src/cafe/domain/event/suggestion-rejected.event';
import { SuggestionCreatedEvent } from 'src/cafe/domain/event/suggestion-created.event';
import { BusinessHours, Menu } from 'src/cafe/domain/cafe';
import {
  CafeTip,
  SuggestionStatus,
  SuggestionType,
} from 'src/cafe/domain/constant';

export class Cafe {
  @IsString()
  @IsOptional()
  public readonly id?: string;

  @IsString()
  public readonly name: string;

  @IsString()
  public readonly address: string;

  @ValidateNested()
  public readonly businessHours: BusinessHours;

  @IsPhoneNumber()
  public readonly phone: string;

  @IsString()
  public readonly link: string;

  @IsLongitude()
  public readonly longitude: number;

  @IsLatitude()
  public readonly latitude: number;

  @ValidateNested()
  public readonly menus: Menu[];

  @ValidateNested()
  public readonly tips: CafeTip[];
}

export class Suggestion extends AggregateRoot {
  @IsString()
  private readonly id: string;

  @ValidateNested()
  private readonly cafe: Cafe;

  @IsEnum(SuggestionType)
  private readonly type: SuggestionType;

  @IsEnum(SuggestionStatus)
  private status: SuggestionStatus;

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  constructor(attributes: SuggestionAttributes) {
    super();
    this.id = attributes.id;
    this.cafe = attributes.cafe;
    this.type = attributes.type;
    this.status = attributes.status
      ? attributes.status
      : SuggestionStatus.REQUESTED;
    this.createdAt = attributes.createdAt ? attributes.createdAt : new Date();
    this.updatedAt = attributes.updatedAt ? attributes.updatedAt : new Date();
  }

  public getAttributes(): SuggestionAttributes {
    return {
      id: this.id,
      cafe: this.cafe,
      type: this.type,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public suggest() {
    if (this.status !== SuggestionStatus.REQUESTED)
      throw new BadRequestException();
    this.apply(new SuggestionCreatedEvent(this.id));
  }

  public accept() {
    if (this.status !== SuggestionStatus.REQUESTED)
      throw new BadRequestException();
    this.status = SuggestionStatus.ACCEPTED;
    this.updatedAt = new Date();
    this.apply(new SuggestionAcceptedEvent(this.id));
  }

  public reject() {
    if (this.status !== SuggestionStatus.REQUESTED)
      throw new BadRequestException();
    this.status = SuggestionStatus.REJECTED;
    this.updatedAt = new Date();
    this.apply(new SuggestionRejectedEvent(this.id));
  }

  public cancel() {
    if (this.status !== SuggestionStatus.REQUESTED)
      throw new BadRequestException();
    this.status = SuggestionStatus.CANCELED;
    this.updatedAt = new Date();
    this.apply(new SuggestionCanceledEvent(this.id));
  }
}

export interface SuggestionAttributes {
  readonly id: string;
  readonly cafe: Cafe;
  readonly type: SuggestionType;
  readonly status: SuggestionStatus;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
