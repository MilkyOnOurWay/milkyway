import { AggregateRoot } from "@nestjs/cqrs";

import { UserDeletedEvent } from "src/user/domain/event/user-deleted.event";
import { UserSignedInEvent } from "src/user/domain/event/user-signed-in.event";
import { UserSignedUpEvent } from "src/user/domain/event/user-signed-up.event";
import { UserUpdatedEvent } from "src/user/domain/event/user-updated.event";

export class User extends AggregateRoot {
  private readonly id: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;
  private deletedAt?: Date;

  constructor(attributes: UserAttributes){
    super();
    this.id = attributes.id;
    this.name = attributes.name;
    this.createdAt = attributes.createdAt ? attributes.createdAt : new Date();
    this.updatedAt = attributes.updatedAt ? attributes.updatedAt : new Date();
    this.deletedAt = attributes.deletedAt;
  }

  public getAttributes(): UserAttributes {
    const { id, name, createdAt, updatedAt, deletedAt } = this;
    return { id, name, createdAt, updatedAt, deletedAt };
  }

  public signUp(): void {
    this.apply(new UserSignedUpEvent(this.id));
  }

  public signIn(): void {
    this.apply(new UserSignedInEvent(this.id));
  }

  public update(attributes: UpdatableUserAttributes): void {
    this.name = attributes.name ? attributes.name : this.name;
    this.apply(new UserUpdatedEvent(this.id));
  }

  public delete(): void {
    this.deletedAt = new Date();
    this.apply(new UserDeletedEvent(this.id));
  }
}

export interface UserAttributes {
  readonly id: string;
  readonly name: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
  readonly deletedAt?: Date;
}

export interface UpdatableUserAttributes {
  readonly name: string;
}
