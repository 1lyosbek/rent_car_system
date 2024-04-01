import { BaseEntity } from 'src/common/database/base.entity';
import { Status, StatusTrack } from 'src/common/enums/enum';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @Column({ name: 'user_data', type: 'json', nullable: true })
  userData: UserEntity;

  @Column({ name: 'car_data', type: 'json', nullable: true })
  carData: CarEntity;

  
  @Column({ name: 'price', type: 'bigint', nullable: false })
  price: number;

  @Column({ name: 'start_km', type: 'int', nullable: true })
  startKm: number;

  @Column({ name: 'end_km', type: 'int', nullable: true })
  endKm: number;

  @Column({ name: 'start_date', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  start_date: Date;

  @Column({ name: 'end_date', type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  end_date: Date;

  @Column({ name: 'status', type: "enum", enum: ["debit", "credit"], nullable: false})
  status: Status;

  @Column({ name: 'started_km', type: 'int', nullable: true })
  startedKm: number;

  @Column({ name: 'ended_km', type: 'int', nullable: true })
  endedKm: number;

  @Column({ name: 'status_track', type: "enum", enum: ["created", "progress", "done"], nullable: false })
  statusTrack: StatusTrack;

  @ManyToOne(
    () => CompanyEntity,
    (company) => company.transactions,
    {
      onDelete: 'SET NULL',
      nullable: true,
    },
  )
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => CarEntity, (car) => car.transactions, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'created_by' })
  createdBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'last_edited_by' })
  lastEditedBy: UserEntity;
}
