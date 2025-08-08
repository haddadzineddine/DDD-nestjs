import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { CreateUserCommand } from 'src/modules/user/application/commands/dto/create-user.command';


export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
        type: String
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'The email address of the user',
        example: 'john.doe@example.com',
        type: String
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password for the user account',
        example: 'password123',
        type: String,
        minLength: 6
    })
    @IsString()
    @IsNotEmpty()
    password: string;


    static toCommand(createUserDto: CreateUserDto): CreateUserCommand {
        return new CreateUserCommand(createUserDto.name, createUserDto.email, createUserDto.password);
    }
}