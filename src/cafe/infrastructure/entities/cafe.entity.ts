import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BusinessHours } from 'src/cafe/infrastructure/entities/business-hour.entity';
import { CafeTip } from 'src/cafe/infrastructure/entities/cafe-tip.entity';
import { Menu } from 'src/cafe/infrastructure/entities/menu.entity';

// import { CafeType } from 'src/cafe/domain/constant';

@Entity()
export class Cafe {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

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

  @OneToMany(() => Menu, (menu) => menu.cafe, { cascade: true })
  public readonly menus: Menu[];

  @OneToMany(() => CafeTip, (tip) => tip.cafe, { cascade: true })
  public readonly tips: CafeTip[];

  @CreateDateColumn()
  public readonly createdAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt: Date;

  @DeleteDateColumn()
  public readonly deletedAt: Date;
}
