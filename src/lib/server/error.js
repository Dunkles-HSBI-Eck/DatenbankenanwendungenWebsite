export class NoUserFound extends Error {
    constructor(message = 'No user found') {
        super(message);
        this.name = 'NoUserFound';
        this.status = 400;
    }
}

export class GenricDatabaseError extends Error {
    constructor(message = 'Database error') {
        super(message);
        this.name = 'GenricDatabaseError';
        this.status = 500;
    }
}

export class DuplicateEmailError extends Error {
    constructor(message = 'Email already exists') {
        super(message);
        this.name = 'DuplicateEmailError';
        this.status = 400;
    }
}