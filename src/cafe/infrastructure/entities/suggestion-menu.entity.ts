import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SuggestionMenuCategory } from 'src/cafe/infrastructure/entities/suggestion-menu-category.entity';
import { Suggestion } from 'src/cafe/infrastructure/entities/suggestion.entity';

@Entity()
export class SuggestionMenu {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column()
  public name: string;

  @Column()
  public price: number;

  @OneToMany(() => SuggestionMenuCategory, (category) => category.menu, {
    cascade: true,
  })
  public categories: SuggestionMenuCategory[];

  @ManyToOne(() => Suggestion, (cafe) => cafe.menus)
  public readonly cafe: Suggestion;
}
