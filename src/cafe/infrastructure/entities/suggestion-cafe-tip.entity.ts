import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CafeTip } from 'src/cafe/domain/constant';

import { Suggestion } from 'src/cafe/infrastructure/entities/suggestion.entity';

@Entity()
export class SuggestionCafeTip {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => Suggestion, (cafe) => cafe.tips)
  public readonly cafe: Suggestion;

  @Column()
  public tip: CafeTip;
}
