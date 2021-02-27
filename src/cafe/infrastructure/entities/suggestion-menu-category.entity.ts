import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SuggestionMenu } from 'src/cafe/infrastructure/entities/suggestion-menu.entity';

import { MenuCategory } from 'src/cafe/domain/constant';

@Entity()
export class SuggestionMenuCategory {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => SuggestionMenu, (menu) => menu.categories)
  public readonly menu: SuggestionMenu;

  @Column()
  public category: MenuCategory;
}
