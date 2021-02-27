import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Cafe } from 'src/cafe/infrastructure/entities/cafe.entity';
import { MenuCategory } from 'src/cafe/infrastructure/entities/menu-category.entity';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @OneToMany(() => MenuCategory, (category) => category.menu, { cascade: true })
  public categories: MenuCategory[];

  @ManyToOne(() => Cafe, (cafe) => cafe.menus)
  public readonly cafe: Cafe;
}
