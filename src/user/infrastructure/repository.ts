import { getRepository } from 'typeorm';
import { v4 } from 'uuid';

import { User as Entity } from 'src/user/infrastructure/entities/user.entity';

import { UserRepository } from 'src/user/domain/repository';
import { User } from 'src/user/domain/user';

export class UserRepositoryImplement implements UserRepository {
  public async save(user: User): Promise<void> {
    await getRepository(Entity).save(this.convertModelToEntity(user));
  }

  public async findNewId(): Promise<string> {
    const id = v4();
    const data = await getRepository(Entity).findOne(id);
    return data ? await this.findNewId() : id;
  }

  public async findById(id: string): Promise<User> {
    return this.convertEntityToModel(await getRepository(Entity).findOne(id));
  }

  private convertModelToEntity(model: User): Entity {
    return {
      id: model.getAttributes().id,
      name: model.getAttributes().name,
      createdAt: model.getAttributes().createdAt,
      updatedAt: model.getAttributes().updatedAt,
      deletedAt: model.getAttributes().deletedAt,
    };
  }

  private convertEntityToModel(entity: Entity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
