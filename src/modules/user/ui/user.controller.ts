import { Controller, Post, Body, Get, Param, HttpStatus, HttpCode, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserResponseDto, UserResponseDto } from './dto/user-response.dto';
import { UserService } from '../application/services/user.service';

@ApiTags('Users API')
@Controller('users')
export class UserController {
    constructor(private  userService: UserService) { }

    @Post()
    @ApiOperation({
        summary: 'Create a new user',
        description: 'Creates a new user with the provided information'
    })
    @ApiBody({
        type: CreateUserDto,
        description: 'User data to create'
    })
    @ApiResponse({
        status: 201,
        description: 'User created successfully',
        type: CreateUserResponseDto
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request - Invalid data provided'
    })
    @ApiResponse({
        status: 409,
        description: 'Conflict - User with this email already exists'
    })
    @HttpCode(HttpStatus.CREATED)
    async createUser(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
        const user = await this.userService.createUser(createUserDto);
        return CreateUserResponseDto.fromEntity(user);
    }

    @Get(':uuid')
    @ApiOperation({
        summary: 'Get user by UUID',
        description: 'Retrieves a specific user by their UUID'
    })
    @ApiParam({
        name: 'uuid',
        description: 'The UUID of the user to retrieve',
        type: 'string',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @ApiResponse({
        status: 200,
        description: 'User retrieved successfully',
        type: UserResponseDto
    })
    @ApiResponse({
        status: 404,
        description: 'User not found'
    })
    async getUserByUuid(@Param('uuid') uuid: string): Promise<UserResponseDto> {
        const user = await this.userService.getUserByUuid(uuid);
        return UserResponseDto.fromEntity(user);
    }
}
