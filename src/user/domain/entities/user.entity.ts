import { EmailValueObject } from "../value-objects/email.value-object";

export class UserEntity {
    id: number;
    name: string;
    email: EmailValueObject;
    password: string;

    private constructor(id: number, name: string, email: EmailValueObject, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(id: number, name: string, email: string, password: string): UserEntity {
        return new UserEntity(id, name, new EmailValueObject(email), password);
    }
}
