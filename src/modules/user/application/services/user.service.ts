import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserEntity } from "src/modules/user/domain/entities/user.entity";
import { CreateUserDto } from "src/modules/user/adapters/web/dto/create-user.dto";
import { GetUserQuery } from "../queries/dto/get-user.query";

@Injectable()
export class UserService {
    constructor(private commandBus: CommandBus, private queryBus: QueryBus) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const command = CreateUserDto.toCommand(createUserDto);
        return await this.commandBus.execute(command);
    }

    async getUserByUuid(uuid: string): Promise<UserEntity> {
        return await this.queryBus.execute(new GetUserQuery(uuid));
    }
}