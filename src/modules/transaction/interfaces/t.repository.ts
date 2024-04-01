import { ID } from "src/common/types/type";
import { TransactionEntity } from "../entities/transaction.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

export interface ITransactionRepository{
    findOneByUserId(id: ID): Promise<TransactionEntity[]>;
    findOneByProductId(id: ID): Promise<TransactionEntity[]>;
    findOneById(id: ID): Promise<TransactionEntity>;
    findAllTransactions(): Promise<TransactionEntity[]>;
    create(transaction: TransactionEntity): Promise<TransactionEntity>;
    update(transaction: TransactionEntity): Promise<TransactionEntity>;
    delete(id: ID): Promise<TransactionEntity>;
}