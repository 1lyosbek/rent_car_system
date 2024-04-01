import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';

@Entity("files")
export class FileEntity extends BaseEntity {
  @Column({name : "url", type: "text", nullable: false})
  url: string;

  @Column({name: "mime_type", type: "varchar", nullable: false})
  mimetype: string;

  @Column({type: "int", nullable: false})
  size: number;

  
  @OneToOne(()=> UserEntity, (user)=> user.avatar)
  user: UserEntity;
  
  @ManyToOne(() => CarEntity, (car) => car.files, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({name: "car_id"})
  car: CarEntity;
}

