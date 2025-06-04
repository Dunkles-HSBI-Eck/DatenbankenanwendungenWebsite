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