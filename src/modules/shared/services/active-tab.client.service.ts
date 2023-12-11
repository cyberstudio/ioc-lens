export class ActiveTabClientService {
    constructor(private window: Window) {}

    async getHost(): Promise<string> {
        const url = new URL(this.window.document.URL);

        return Promise.resolve(url.host);
    }
}
