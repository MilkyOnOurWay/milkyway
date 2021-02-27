import { Cafe } from 'src/cafe/domain/cafe';
import { Suggestion } from 'src/cafe/domain/suggestion';

export interface CafeRepository {
  save(cafe: Cafe): Promise<void>;
  findNewId(): Promise<string>;
  findById(id: string): Promise<Cafe>;
}

export interface SuggestionRepository {
  save(suggestion: Suggestion): Promise<void>;
  findNewId(): Promise<string>;
  findById(id: string): Promise<Suggestion>;
}
