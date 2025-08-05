import { UserEntity } from "src/modules/user/domain/entities/user.entity";
import { CreateUserCommand } from "../dto/create-user.command";
import { UserCreatedEvent } from "src/modules/user/domain/events/user-created.event";
import { CommandHandler, EventBus } from "@nestjs/cqrs";
import type { ICommandHandler } from "@nestjs/cqrs";
import type { UserRepository } from "src/modules/user/domain/repositories/user.repository";
import { BadRequestException, Inject, Logger } from "@nestjs/common";
import { InvalidEmailError } from "src/modules/user/domain/errors/invalid-email.error";
import { v4 as uuidv4 } from 'uuid';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
    constructor(@Inject('UserRepository') private readonly userRepository: UserRepository, private readonly eventBus: EventBus) { }

    async execute(command: CreateUserCommand): Promise<UserEntity> {
        Logger.log(`Creating user with name: ${command.name} and email: ${command.email}`, 'CreateUserHandler');

        try {
            const { name, email, password } = command;

            const existingUser = await this.userRepository.findByEmail(email);

            if (existingUser) {
                throw new BadRequestException('User already exists', 'USER.ALREADY_EXISTS');
            }

            const user = UserEntity.create(uuidv4(), name, email, password);
            const createdUser = await this.userRepository.create(user);

            this.eventBus.publish(new UserCreatedEvent(createdUser.uuid, createdUser.email.getValue()));

            return createdUser;
        } catch (error) {
            if (error instanceof InvalidEmailError) {
                throw new BadRequestException(error.message, error.code);
            }

            throw error;
        }
    }
}