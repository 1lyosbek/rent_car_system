import { ResData } from 'src/lib/resData';
import { CreateModelDto } from '../dto/create-model.dto';
import { UpdateModelDto } from '../dto/update-model.dto';
import { ModelEntity } from '../entities/model.entity';
import { ID } from 'src/common/types/type';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export interface IModelService {
  findAll(): Promise<ResData<ModelEntity[]>>;
  findOneById(id: ID): Promise<ResData<ModelEntity>>;
  create(model: CreateModelDto): Promise<ResData<ModelEntity>>;
  update(id: ID, model: UpdateModelDto): Promise<ResData<ModelEntity>>;
  remove(id: ID): Promise<ResData<ModelEntity>>;
}
