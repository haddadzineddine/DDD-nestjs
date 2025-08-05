export class EmailValueObject {
    private value: string;

    constructor(value: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(value)) {
            throw new Error('Invalid email');
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