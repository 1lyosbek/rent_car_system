import { BaseEntity } from 'src/common/database/base.entity';
import { ICarInfo } from 'src/common/types/type';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity("cars")
export class CarEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", unique: true, nullable: true })
    name: string;

    @Column({ name: "price", type: "integer", nullable: false })
    price: number;

    @Column({ name: "info", type: "json", nullable: true})
    info: ICarInfo;

    @ManyToOne(() => ModelEntity, (model) => model.cars)
    @JoinColumn({name: "model_id"})
    model: ModelEntity;

    @ManyToOne(() => CompanyEntity, (company) => company.cars)
    @JoinColumn({ name: "company_id" })
    company: CompanyEntity;

    @OneToMany(()=> FileEntity, (files) => files.car)
    files: Array<FileEntity>;

    @OneToMany(()=> TransactionEntity, (transaction) => transaction.car)
    transactions: Array<TransactionEntity>;
}
