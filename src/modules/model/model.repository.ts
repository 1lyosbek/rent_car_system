import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModelEntity } from './entities/model.entity';
import { IModelRepository } from './interfaces/model.repository';
import { ID } from 'src/common/types/type';

export class ModelRepository implements IModelRepository {
  constructor(
    @InjectRepository(ModelEntity)
    private repository: Repository<ModelEntity>,
  ) {}
  async create(model: ModelEntity): Promise<ModelEntity> {
    return await this.repository.save(model);
  }
  async getById(id: ID): Promise<ModelEntity | undefined> {
    return await this.repository.findOneBy({ id });
  }
  async getAll(): Promise<ModelEntity[]> {
    return await this.repository.find();
  }
  async update(entity: ModelEntity): Promise<ModelEntity> {
    return await this.repository.save(entity);
  }
  async delete(id: ID): Promise<ModelEntity | undefined> {
    const foundModel = await this.repository.findOneBy({ id });
    await this.repository.delete(id);
    return foundModel;
  }
}
