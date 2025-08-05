import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/domain/entities/user.entity';

export class UserResponseDto {
    @ApiProperty({
        description: 'The unique identifier of the user',
        example: 1,
        type: Number
    })
    id: number;

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
            id: user.id,
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
                id: user.id,
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