import { UserEntity } from "src/modules/user/domain/entities/user.entity";
import { UserRepository as IUserRepository } from "src/modules/user/domain/repositories/user.repository";
import { UserSchema } from "./user.schema";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMapper } from "./user.mapper";

export class UserRepositoryImpl implements IUserRepository {
    constructor(@InjectRepository(UserSchema) private readonly userRepository: Repository<UserSchema>) { }
    

    async create(user: UserEntity): Promise<UserEntity> {
        const userSchema = UserMapper.toPersistence(user);
        const savedUser = await this.userRepository.save(userSchema);
        return UserMapper.toDomain(savedUser);
    }

    async findByUuid(uuid: string): Promise<UserEntity | null> {
        const userSchema = await this.userRepository.findOne({ where: { uuid } });
        return userSchema ? UserMapper.toDomain(userSchema) : null;
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const userSchema = await this.userRepository.findOne({ where: { email } });
        return userSchema ? UserMapper.toDomain(userSchema) : null;
    }
}