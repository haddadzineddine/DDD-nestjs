import { Module } from '@nestjs/common';
import { UserController } from './adapters/web/user.controller';
import { UserRepositoryImpl } from './adapters/persistence/repository/user.repository';
import { UserCreatedHandler } from './application/events/handlers/user-created.handler';
import { GetUserHandler } from './application/queries/handlers/get-user.handler';
import { CreateUserHandler } from './application/commands/handlers/create-user.handler';
import { UserService } from './application/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './adapters/persistence/schema/user.schema';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserSchema])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: "UserRepository",
      useClass: UserRepositoryImpl
    },
    UserService,
    UserCreatedHandler,
    GetUserHandler,
    CreateUserHandler,
  ],
  exports: [],
})
export class UserModule {} 