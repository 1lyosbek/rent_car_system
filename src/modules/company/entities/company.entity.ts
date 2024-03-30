import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity("company")
export class CompanyEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", unique: true, nullable: true })
    name: string;

    @OneToOne(()=> UserEntity, (user)=> user.)

    @OneToMany(() => UserEntity, (user) => user.company)
    users: Array<UserEntity>;

    @OneToOne(() => FileEntity, (file) => file.logo)
    @JoinColumn()
    logo: FileEntity;

    @OneToMany(() => CarEntity, (car) => car.company)
    cars: Array<CarEntity>;

    @OneToMany(()=> ModelEntity, (model) => model.company)
    models: Array<ModelEntity>;
}

