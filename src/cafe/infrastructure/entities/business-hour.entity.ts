import { Column, Entity } from 'typeorm';

@Entity()
class OpenHour {
  @Column({ nullable: true })
  public readonly open: Date;

  @Column({ nullable: true })
  public readonly close: Date;

  @Column({ nullable: true })
  public readonly allDayLong: boolean;
}

@Entity()
export class BusinessHours {
  @Column(() => OpenHour)
  public readonly mon: OpenHour;

  @Column(() => OpenHour)
  public readonly tue: OpenHour;

  @Column(() => OpenHour)
  public readonly wed: OpenHour;

  @Column(() => OpenHour)
  public readonly thu: OpenHour;

  @Column(() => OpenHour)
  public readonly fri: OpenHour;

  @Column(() => OpenHour)
  public readonly sat: OpenHour;

  @Column(() => OpenHour)
  public readonly sun: OpenHour;
}
