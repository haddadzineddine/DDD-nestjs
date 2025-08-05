import { UserEntity } from "src/user/domain/entities/user.entity";
import { UserRepository as IUserRepository } from "src/user/domain/repositories/user.repository";
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

    async findById(id: number): Promise<UserEntity | null> {
        const userSchema = await this.userRepository.findOne({ where: { id } });
        return userSchema ? UserMapper.toDomain(userSchema) : null;
    }
}