import { ID } from "src/common/types/type";
import { UserEntity } from "../entities/user.entity";

export interface IUserRepository{
    findOneById(id: ID): Promise<UserEntity>;
    findOneByLogin(phone: string): Promise<UserEntity>;
    findAllUsers(): Promise<UserEntity[]>;
    createUser(user: UserEntity): Promise<UserEntity>;
}