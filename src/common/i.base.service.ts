import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';

export interface IBaseService<T> {
  save(data: any): Promise<T>;

  delete(id: EntityId): Promise<DeleteResult>;
}
