import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'phone', type: 'bigint', nullable: false })
  phone: number;

  @Column({ name: 'full_name', type: 'varchar', length: 256, nullable: true })
  fullName: string;

  @Column({
    type: 'enum',
    enum: ['client', 'admin', 'supervisor', 'owner'],
    nullable: false,
  })
  role: RoleEnum;

  @OneToOne(() => FileEntity, (file) => file.user)
  @JoinColumn({ name: 'avatar' })
  avatar: FileEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.users, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntity;

  @OneToMany(() => CompanyEntity, (company) => company.owner)
  owner_company: Array<CompanyEntity>;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.user)
  transactions: Array<TransactionEntity>;
}
