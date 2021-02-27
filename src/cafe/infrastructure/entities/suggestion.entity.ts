import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BusinessHours } from 'src/cafe/infrastructure/entities/business-hour.entity';
import { SuggestionMenu } from 'src/cafe/infrastructure/entities/suggestion-menu.entity';
import { SuggestionCafeTip } from 'src/cafe/infrastructure/entities/suggestion-cafe-tip.entity';

import { SuggestionStatus, SuggestionType } from 'src/cafe/domain/constant';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public readonly type: SuggestionType;

  @Column()
  public readonly status: SuggestionStatus;

  @Column({ nullable: true })
  public readonly cafeId: string;

  @Column()
  public readonly name: string;

  @Column()
  public readonly address: string;

  @Column(() => BusinessHours)
  public readonly businessHours: BusinessHours;

  @Column()
  public readonly phone: string;

  @Column()
  public readonly link: string;

  @Column()
  public readonly longitude: number;

  @Column()
  public readonly latitude: number;

  @OneToMany(() => SuggestionMenu, (menu) => menu.cafe, { cascade: true })
  public readonly menus: SuggestionMenu[];

  @OneToMany(() => SuggestionCafeTip, (tip) => tip.cafe, { cascade: true })
  public readonly tips: SuggestionCafeTip[];

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt: Date;
}
