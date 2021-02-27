import { v4 } from 'uuid';
import { getRepository } from 'typeorm';

import { Cafe as Entity } from 'src/cafe/infrastructure/entities/cafe.entity';
import { Menu } from 'src/cafe/infrastructure/entities/menu.entity';
import { CafeTip } from 'src/cafe/infrastructure/entities/cafe-tip.entity';

import { Cafe } from 'src/cafe/domain/cafe';
import { CafeRepository } from 'src/cafe/domain/repository';
import { MenuCategory } from 'src/cafe/infrastructure/entities/menu-category.entity';

export class CafeRepositoryImplement implements CafeRepository {
  public async save(cafe: Cafe): Promise<void> {
    await getRepository(Entity).save(this.convertModelToEntity(cafe));
  }

  public async findNewId(): Promise<string> {
    const id = v4();
    const data = await getRepository(Entity).findOne(id);
    return data ? await this.findNewId() : id;
  }

  public async findById(id: string): Promise<Cafe> {
    const entity = await getRepository(Entity).findOne({
      where: { id },
      relations: ['menus', 'menus.categories', 'tips'],
    });
    return entity ? this.convertEntityToModel(entity) : undefined;
  }

  private convertModelToEntity(model: Cafe): Entity {
    return {
      ...model.getAttributes(),
      menus: model.getAttributes().menus.map((menu) => {
        const menuEntity = new Menu();
        menuEntity.name = menu.name;
        menuEntity.price = menu.price;
        menuEntity.categories = menu.categories.map((category) => {
          const categoryEntity = new MenuCategory();
          categoryEntity.category = category;
          return categoryEntity;
        });
        return menuEntity;
      }),
      tips: model.getAttributes().tips.map((tip) => {
        const tipEntity = new CafeTip();
        tipEntity.tip = tip;
        return tipEntity;
      }),
    };
  }

  private convertEntityToModel(entity: Entity): Cafe {
    return new Cafe({
      ...entity,
      deletedAt: entity.deletedAt,
      menus: entity.menus.map((menu) => ({
        ...menu,
        categories: menu.categories.map(({ category }) => category),
      })),
      tips: entity.tips.map(({ tip }) => tip),
    });
  }
}
