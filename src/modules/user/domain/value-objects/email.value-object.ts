import { InvalidEmailError } from "../errors/invalid-email.error";

export class EmailValueObject {
    private value: string;

    constructor(value: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            throw new InvalidEmailError('Invalid email format');
        }

        this.value = value;
    }

    getValue() {
        return this.value;
    }

    equals(other: EmailValueObject) {
        return this.value === other.value;
    }
}