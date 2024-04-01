import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { ITransactionRepository } from './interfaces/t.repository';
import { TransactionEntity } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ID } from 'src/common/types/type';
import { UserEntity } from '../user/entities/user.entity';

export class TransactionRespository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
    private readonly dataSource: DataSource,
  ) {}
  async create(
    transactionEntity: TransactionEntity,
  ): Promise<TransactionEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const created = await queryRunner.manager.save(transactionEntity);
      await queryRunner.commitTransaction();
      return created;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw e;
    } finally {
      await queryRunner.release();
    }
  }

  async findAllTransactions(): Promise<TransactionEntity[]> {
    return await this.repository.find({
      relations: ['company', 'user', 'car'],
    });
  }

  async findOneById(id: ID): Promise<TransactionEntity> {
    return await this.repository.findOne({
      where: { id },
      relations: ['company', 'user', 'car'],
    });
  }

  async findOneByUserId(id: ID): Promise<TransactionEntity[]> {
    return await this.repository.find({
      user: {
        id,
      },
      relations: ['company', 'user', 'car'],
    } as FindManyOptions<TransactionEntity>);
  }

  async findOneByProductId(id: ID): Promise<TransactionEntity[]> {
    return await this.repository.find({
      user: {
        id,
      },
      relations: ['company', 'user', 'car'],
    } as FindManyOptions<TransactionEntity>);
  }

  async update(
    transactionEntity: TransactionEntity,
  ): Promise<TransactionEntity> {
    return await this.repository.save(transactionEntity);
  }

  async delete(id: ID): Promise<TransactionEntity> {
    const foundUser = await this.repository.findOneBy({ id });
    await this.repository.delete({ id });
    return foundUser;
  }
}
