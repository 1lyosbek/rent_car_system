import { ID } from "src/common/types/type";
import { UserEntity } from "../entities/user.entity";
import { ResData } from "src/lib/resData";

export interface IUserService{
    findAll(): Promise<ResData<UserEntity[]>>;
    findOneById(id: ID): Promise<ResData<UserEntity | undefined>>;
    findOneByPhone(phone: number): Promise<ResData<UserEntity | undefined>>;
}