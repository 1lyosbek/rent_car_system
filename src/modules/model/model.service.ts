import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ModelEntity } from './entities/model.entity';
import { ResData } from 'src/lib/resData';
import { ModelNotFoundException } from './exceptions/model.exceptions';
import { IModelService } from './interfaces/model.service';
import { IModelRepository } from './interfaces/model.repository';

@Injectable()
export class ModelService implements IModelService {
  constructor(
    @Inject('IModelRepository')
    private readonly repository: IModelRepository,
  ) {}
  async create(
    createCompanyDto: CreateModelDto,
  ): Promise<ResData<ModelEntity>> {
    const newCompany = new ModelEntity();
    newCompany.name = createCompanyDto.name;
    newCompany.company = createCompanyDto.companyId;

    return new ResData(
      'Success',
      HttpStatus.CREATED,
      await this.repository.create(newCompany),
    );
  }

  async findAll(): Promise<ResData<Array<ModelEntity>>> {
    const allModels = await this.repository.getAll();
    return new ResData('Success', HttpStatus.OK, allModels);
  }

  async findOneById(id: number) {
    const foundModel = await this.repository.getById(id);
    if (!foundModel) {
      throw new ModelNotFoundException(id);
    }
    return new ResData('Success', HttpStatus.OK, foundModel);
  }

  async update(id: number, updateModelDto: UpdateModelDto) {
    const { data: foundModel } = await this.findOneById(id);
    const update = Object.assign(foundModel, updateModelDto);
    const updatedModel = await this.repository.update(update);
    return new ResData('Success', HttpStatus.OK, updatedModel);
  }

  async remove(id: number): Promise<ResData<ModelEntity>> {
    await this.findOneById(id);
    const deletedModel = await this.repository.delete(id);
    return new ResData('Success', HttpStatus.OK, deletedModel);
  }
}
