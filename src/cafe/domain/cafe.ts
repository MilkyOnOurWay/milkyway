import { AggregateRoot } from '@nestjs/cqrs';
import {
  IsBoolean,
  IsDate,
  IsDateString,
  IsEnum,
  IsInt,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CafeUnregisteredEvent } from 'src/cafe/domain/event/cafe-unregistered.event';
import { CafeRegisteredEvent } from 'src/cafe/domain/event/cafe-registered.event';
import { CafeUpdatedEvent } from 'src/cafe/domain/event/cafe-updated.event';
import { CafeTip, MenuCategory } from 'src/cafe/domain/constant';
import { ApiProperty } from '@nestjs/swagger';

class OpenHour {
  @IsDateString()
  @ValidateIf((openHour) => !openHour.allDayLong)
  @ApiProperty()
  public readonly open: Date;

  @IsDateString()
  @ValidateIf((openHour) => !openHour.allDayLong)
  @ApiProperty()
  public readonly close: Date;

  @IsBoolean()
  @ValidateIf((openHour) => !openHour.open && !openHour.close)
  @ApiProperty()
  public readonly allDayLong: boolean;
}

export class BusinessHours {
  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly mon: OpenHour;

  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly tue: OpenHour;

  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly wed: OpenHour;

  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly thu: OpenHour;

  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly fri: OpenHour;

  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly sat: OpenHour;

  @Type(() => OpenHour)
  @ValidateNested({ each: true })
  @ApiProperty()
  public readonly sun: OpenHour;
}

export class Cafe extends AggregateRoot {
  @IsString()
  private readonly id: string;

  @IsString()
  private name: string;

  @IsString()
  private address: string;

  @ValidateNested()
  private businessHours: BusinessHours;

  @IsString()
  @IsPhoneNumber()
  private phone: string;

  @IsString()
  private link: string;

  @IsLongitude()
  private longitude: number;

  @IsLatitude()
  private latitude: number;

  @ValidateNested()
  private menus: Menu[];

  @ValidateNested()
  private tips: CafeTip[];

  @IsDate()
  private readonly createdAt: Date;

  @IsDate()
  private updatedAt: Date;

  @IsDate()
  @IsOptional()
  private deletedAt?: Date;

  constructor(attributes: CafeAttributes) {
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.address = attributes.address;
    this.businessHours = attributes.businessHours;
    this.phone = attributes.phone;
    this.link = attributes.link;
    this.longitude = attributes.longitude;
    this.latitude = attributes.latitude;
    this.menus = attributes.menus;
    this.tips = attributes.tips;
    this.createdAt = attributes.createdAt ? attributes.createdAt : new Date();
    this.updatedAt = attributes.updatedAt ? attributes.updatedAt : new Date();
    this.deletedAt = attributes.deletedAt;
  }

  public getAttributes(): CafeAttributes {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      businessHours: this.businessHours,
      phone: this.phone,
      link: this.link,
      longitude: this.longitude,
      latitude: this.latitude,
      menus: this.menus,
      tips: this.tips,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  public setAttributes(attributes: UpdateOptions): void {
    this.name = attributes.name;
    this.address = attributes.address;
    this.businessHours = attributes.businessHours;
    this.phone = attributes.phone;
    this.link = attributes.link;
    this.longitude = attributes.longitude;
    this.latitude = attributes.latitude;
    this.menus = attributes.menus;
    this.tips = attributes.tips;
    this.updatedAt = attributes.updatedAt;
    this.apply(new CafeUpdatedEvent(this.id));
  }

  public register(): void {
    this.apply(new CafeRegisteredEvent(this.id));
  }

  public deregister(): void {
    this.deletedAt = new Date();
    this.apply(new CafeUnregisteredEvent(this.id));
  }
}

interface UpdateOptions {
  readonly name: string;
  readonly address: string;
  readonly businessHours: BusinessHours;
  readonly phone: string;
  readonly link: string;
  readonly longitude: number;
  readonly latitude: number;
  readonly menus: Menu[];
  readonly tips: CafeTip[];
  readonly updatedAt: Date;
}

export interface CafeAttributes {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly businessHours: BusinessHours;
  readonly phone: string;
  readonly link: string;
  readonly longitude: number;
  readonly latitude: number;
  readonly menus: Menu[];
  readonly tips: CafeTip[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
}

export class Menu {
  @IsString()
  @ApiProperty()
  public readonly name: string;

  @IsInt()
  @ApiProperty()
  public readonly price: number;

  @IsEnum(MenuCategory, { each: true })
  @ApiProperty({ enum: MenuCategory, isArray: true })
  public readonly categories: MenuCategory[];
}
