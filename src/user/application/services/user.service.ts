import { Injectable } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { UserEntity } from "src/user/domain/entities/user.entity";
import { CreateUserDto } from "src/user/ui/dto/create-user.dto";
import { CreateUserCommand } from "../commands/dto/create-user.command";
import { GetUserQuery } from "../queries/dto/get-user.query";

@Injectable()
export class UserService {
    constructor(private  commandBus: CommandBus, private  queryBus: QueryBus) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const command = new CreateUserCommand(createUserDto.name, createUserDto.email, createUserDto.password);
        return await this.commandBus.execute(command);
    }

    async getUserById(id: number): Promise<UserEntity> {
        return await this.queryBus.execute(new GetUserQuery(id));
    }
}