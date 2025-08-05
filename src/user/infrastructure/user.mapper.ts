import { UserEntity } from "src/user/domain/entities/user.entity";
import { UserSchema } from "./user.schema";

export class UserMapper {
    static toDomain(user: UserSchema): UserEntity {
        return UserEntity.create(user.id, user.name, user.email, user.password);
    }

    static toPersistence(user: UserEntity): UserSchema {
        return UserSchema.create(user.id, user.name, user.email.getValue(), user.password);
    }
};
