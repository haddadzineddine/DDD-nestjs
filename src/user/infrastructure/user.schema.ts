import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserSchema {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    private constructor(id: number, name: string, email: string, password: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static create(id: number, name: string, email: string, password: string): UserSchema {
        return new UserSchema(id, name, email, password);
    }

}