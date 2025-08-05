import { UserEntity } from "src/user/domain/entities/user.entity";
import { CreateUserCommand } from "../dto/create-user.command";
import { UserCreatedEvent } from "src/user/domain/events/user-created.event";
import { CommandHandler, EventBus } from "@nestjs/cqrs";
import type { ICommandHandler } from "@nestjs/cqrs";
import type { UserRepository } from "src/user/domain/repositories/user.repository";
import { Inject, Logger } from "@nestjs/common";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository, private readonly eventBus: EventBus) { }

    async execute(command: CreateUserCommand): Promise<UserEntity> {
        Logger.log(`Creating user with name: ${command.name} and email: ${command.email}`, 'CreateUserHandler');

        const { name, email, password } = command;
        const user = UserEntity.create(1, name, email, password);
        const createdUser = await this.userRepository.create(user);

        this.eventBus.publish(new UserCreatedEvent(createdUser.id, createdUser.email.getValue()));

        return createdUser;
    }
}