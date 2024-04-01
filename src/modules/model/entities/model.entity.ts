import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity('models')
export class ModelEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', unique: true, nullable: true })
  name: string;

  @ManyToOne(() => CompanyEntity, (company) => company)
  @JoinColumn({ name: 'company_id' })
  company: number;

  @OneToMany(() => CarEntity, (car) => car.model)
  cars: Array<CarEntity>;
}
