import { v4 } from 'uuid';
import { getRepository } from 'typeorm';

import { Suggestion as Entity } from 'src/cafe/infrastructure/entities/suggestion.entity';
import { SuggestionMenu } from 'src/cafe/infrastructure/entities/suggestion-menu.entity';
import { SuggestionMenuCategory } from 'src/cafe/infrastructure/entities/suggestion-menu-category.entity';
import { SuggestionCafeTip } from 'src/cafe/infrastructure/entities/suggestion-cafe-tip.entity';

import { SuggestionRepository } from 'src/cafe/domain/repository';
import { Suggestion } from 'src/cafe/domain/suggestion';

export class SuggestionRepositoryImplement implements SuggestionRepository {
  public async save(suggestion: Suggestion): Promise<void> {
    await getRepository(Entity).save(this.convertModelToEntity(suggestion));
  }

  public async findNewId(): Promise<string> {
    const id = v4();
    const data = await getRepository(Entity).findOne(id);
    return data ? await this.findNewId() : id;
  }

  public async findById(id: string): Promise<Suggestion> {
    const entity = await getRepository(Entity).findOne({
      where: { id },
      relations: ['menus', 'menus.categories', 'tips'],
    });
    return entity ? this.convertEntityToModel(entity) : undefined;
  }

  private convertModelToEntity(model: Suggestion): Entity {
    return {
      ...model.getAttributes(),
      ...model.getAttributes().cafe,
      status: model.getAttributes().status,
      id: model.getAttributes().id,
      type: model.getAttributes().type,
      cafeId: model.getAttributes().cafe.id,
      menus: model.getAttributes().cafe.menus.map((menu) => {
        const menuEntity = new SuggestionMenu();
        menuEntity.name = menu.name;
        menuEntity.price = menu.price;
        menuEntity.categories = menu.categories.map((category) => {
          const categoryEntity = new SuggestionMenuCategory();
          categoryEntity.category = category;
          return categoryEntity;
        });
        return menuEntity;
      }),
      tips: model.getAttributes().cafe.tips.map((tip) => {
        const tipEntity = new SuggestionCafeTip();
        tipEntity.tip = tip;
        return tipEntity;
      }),
    };
  }

  private convertEntityToModel(entity: Entity): Suggestion {
    return new Suggestion({
      ...entity,
      cafe: {
        ...entity,
        id: entity.cafeId,
        menus: entity.menus.map((menu) => ({
          ...menu,
          categories: menu.categories.map(({ category }) => category),
        })),
        tips: entity.tips.map(({ tip }) => tip),
      },
    });
  }
}
