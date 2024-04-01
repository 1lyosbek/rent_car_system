import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity("companies")
export class CompanyEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", unique: true, nullable: true })
    name: string;

    @OneToMany(() => UserEntity, (user) => user.company)
    users: Array<UserEntity>;

    @OneToOne(() => FileEntity)
    @JoinColumn({name: "logo"})
    logo: FileEntity;

    @OneToMany(() => CarEntity, (car) => car.company)
    cars: Array<CarEntity>;

    @OneToMany(()=> ModelEntity, (model) => model.company)
    models: Array<ModelEntity>;

    @ManyToOne(() => UserEntity, (user) => user.owner_company)
    @JoinColumn({ name: "owner" })
    owner: UserEntity;

    @OneToMany(() => TransactionEntity, (transaction) => transaction.company)
    transactions: Array<TransactionEntity>;
}

