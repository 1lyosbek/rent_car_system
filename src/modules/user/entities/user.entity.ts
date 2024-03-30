import { BaseEntity } from 'src/common/database/base.entity';
import { RoleEnum } from 'src/common/enums/enum';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({ name: 'phone', type: 'integer', length: 256, nullable: false })
  phone: string;

  @Column({ name: 'full_name', type: 'varchar', length: 256, nullable: true })
  fullName: string;

  @Column({ type: 'text', nullable: false })
  role: RoleEnum;

  @OneToOne(
    () => FileEntity,
    (file) => file.avatar,
  )
  @JoinColumn()
  avatar: FileEntity;

  @ManyToOne(() => CompanyEntity, (company)=> company.users)
  @JoinColumn({name: "company_id"})
  company: CompanyEntity
}
