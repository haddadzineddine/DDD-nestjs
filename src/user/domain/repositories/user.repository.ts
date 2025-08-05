import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
    create(user: UserEntity): Promise<UserEntity>;
    findById(id: number): Promise<UserEntity | null>;
}