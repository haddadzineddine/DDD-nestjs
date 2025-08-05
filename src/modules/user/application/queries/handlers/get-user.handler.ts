import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "../dto/get-user.query";
import type { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { UserEntity } from "src/modules/user/domain/entities/user.entity";
import { Inject, Logger, NotFoundException } from "@nestjs/common";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) { }

    async execute(query: GetUserQuery): Promise<UserEntity> {
        Logger.log(`Getting user with uuid: ${query.uuid}`, 'GetUserHandler');

        const user = await this.userRepository.findByUuid(query.uuid);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}