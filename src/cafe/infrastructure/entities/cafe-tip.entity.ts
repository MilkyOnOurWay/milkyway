import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Cafe } from 'src/cafe/infrastructure/entities/cafe.entity';

import { CafeTip as Tip } from 'src/cafe/domain/constant';

@Entity()
export class CafeTip {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => Cafe, (cafe) => cafe.tips)
  public readonly cafe: Cafe;

  @Column()
  public tip: Tip;
}
