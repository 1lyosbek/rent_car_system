import { BaseEntity } from 'src/common/database/base.entity';
import { CarEntity } from 'src/modules/car/entities/car.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity("files")
export class FileEntity extends BaseEntity {
  @Column({name : "location", type: "text", nullable: false})
  url: string;

  @Column({name: "mime_type", type: "varchar", nullable: false})
  mimetype: string;

  @Column({type: "int", nullable: false})
  size: number;

  @ManyToOne(()=> CarEntity, (car)=> car.files)
  @JoinColumn({name: "car_id"})
  cars: CarEntity[];
}

