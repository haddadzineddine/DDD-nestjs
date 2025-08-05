import { UserEntity } from "src/user/domain/entities/user.entity";
import { UserRepository } from "src/user/domain/repositories/user.repository";
import { UserSchema } from "./user.schema";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserMapper } from "./user.mapper";
import { Injectable } from "@nestjs/common";

export class UserRepositoryImpl implements UserRepository {
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