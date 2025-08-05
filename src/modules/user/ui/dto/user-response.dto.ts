import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export class UserResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the user ',
        example: '123e4567-e89b-12d3-a456-426614174000',
        type: String
    })
    uuid: string;

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
        type: String
    })
    name: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
        type: String
    })
    email: string;

    static fromEntity(user: UserEntity): UserResponseDto {
        return {
            uuid: user.uuid,
            name: user.name,
            email: user.email.getValue()
        };
    }
}

export class CreateUserResponseDto {
    @ApiProperty({
        description: 'Success message',
        example: 'User created successfully',
        type: String
    })
    message: string;

    @ApiProperty({
        description: 'The created user data',
        type: UserResponseDto
    })
    data: UserResponseDto;


    static fromEntity(user: UserEntity): CreateUserResponseDto {
        return {
            message: 'User created successfully',
            data: {
                uuid: user.uuid,
                name: user.name,
                email: user.email.getValue()
            }
        };
    }
}

export class GetUsersResponseDto {
    @ApiProperty({
        description: 'Success message',
        example: 'Users retrieved successfully',
        type: String
    })
    message: string;

    @ApiProperty({
        description: 'List of users',
        type: [UserResponseDto]
    })
    data: UserResponseDto[];
} 