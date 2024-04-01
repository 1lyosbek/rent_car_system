import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarEntity } from './entities/car.entity';
import { ICarRepository } from './interfaces/car.repository';
import { ID } from 'src/common/types/type';

export class CarRepository implements ICarRepository {
  constructor(
    @InjectRepository(CarEntity)
    private repository: Repository<CarEntity>,
  ) {}
  async create(car: CarEntity): Promise<CarEntity> {
    return await this.repository.save(car);
  }
  async getById(id: ID): Promise<CarEntity | undefined> {
    return await this.repository.findOne({
      where: { id },
      relations: ['model', 'company'],
    });
  }
  async getAll(): Promise<CarEntity[]> {
    return await this.repository.find({ relations: ['model', 'company'] });
  }
  async update(entity: CarEntity): Promise<CarEntity> {
    return await this.repository.save(entity);
  }
  async delete(id: ID): Promise<CarEntity | undefined> {
    const foundCar = await this.repository.findOneBy({ id });
    await this.repository.delete(id);
    return foundCar;
  }
}
