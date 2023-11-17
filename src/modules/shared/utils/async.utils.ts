export class AbortRequestError extends Error {
    constructor() {
        super('');
        this.name = 'AbortRequest';
        this.stack = undefined;
    }
}
