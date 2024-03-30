import { BaseEntity } from 'src/common/database/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { ModelEntity } from 'src/modules/model/entities/model.entity';
import { Entity, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity("cars")
export class CarEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", unique: true, nullable: true })
    name: string;

    @Column({ name: "price", type: "integer", nullable: false })
    price: number;

    @ManyToOne(() => ModelEntity, (model) => model.)
    @JoinColumn({name: "model_id"})
    model: ModelEntity;

    @ManyToOne(() => CompanyEntity, (company) => company.cars)
    @JoinColumn({ name: "company_id" })
    company: CompanyEntity;

    @OneToMany(()=> FileEntity, (file) => file.cars)
    files: Array<FileEntity>;
}
