import { EmailValueObject } from "../value-objects/email.value-object";

export class UserEntity {
    uuid: string;
    name: string;
    email: EmailValueObject;
    password: string;

    private constructor(uuid: string, name: string, email: EmailValueObject, password: string) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(uuid: string, name: string, email: string, password: string): UserEntity {
        return new UserEntity(uuid, name, new EmailValueObject(email), password);
    }
}
