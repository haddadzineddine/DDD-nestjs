import { UserEntity } from "../entities/user.entity";

export interface UserRepository {
    create(user: UserEntity): Promise<UserEntity>;
    findByUuid(uuid: string): Promise<UserEntity | null>;
    findByEmail(email: string): Promise<UserEntity | null>;
}