export class InvalidEmailError extends Error {

    public readonly code = 'USER.INVALID_EMAIL';

    constructor(message: string) {
        super(message);
        this.name = InvalidEmailError.name;
    }
}