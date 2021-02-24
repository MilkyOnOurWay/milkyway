import { User } from "src/user/domain/user";

export interface UserRepository {
  save(user: User): Promise<void>;
  findNewId(): Promise<string>;
  findById(id: string): Promise<User>;
}
