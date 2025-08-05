import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class UserSchema {

    @PrimaryColumn()
    uuid: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    private constructor(uuid: string, name: string, email: string, password: string) {
        this.uuid = uuid;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(uuid: string, name: string, email: string, password: string): UserSchema {
        return new UserSchema(uuid, name, email, password);
    }

}