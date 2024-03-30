import { BaseEntity } from 'src/common/database/base.entity';
import { FileEntity } from 'src/modules/file/entities/file.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity("company")
export class CompanyEntity extends BaseEntity {
    @Column({ name: "name", type: "varchar", unique: true, nullable: true })
    name: string;

    @

    @ManyToOne(() => UserEntity, (user) => user.company)
    users: Array<UserEntity>;

    @OneToOne(() => FileEntity, (file) => file.logo)
    logo: FileEntity;
}

