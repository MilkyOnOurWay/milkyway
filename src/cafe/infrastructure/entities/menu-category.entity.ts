import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Menu } from 'src/cafe/infrastructure/entities/menu.entity';

import { MenuCategory as Category } from 'src/cafe/domain/constant';

@Entity()
export class MenuCategory {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => Menu, (menu) => menu.categories)
  public readonly menu: Menu;

  @Column()
  public category: Category;
}
