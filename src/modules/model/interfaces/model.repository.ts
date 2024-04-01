import { ID } from 'src/common/types/type';
import { ModelEntity } from '../entities/model.entity';

export interface IModelRepository {
  getAll(): Promise<Array<ModelEntity>>;
  getById(id: ID): Promise<ModelEntity | undefined>;
  create(model: ModelEntity): Promise<ModelEntity>;
  update(model: ModelEntity): Promise<ModelEntity>;
  delete(id: ID): Promise<ModelEntity>;
}
