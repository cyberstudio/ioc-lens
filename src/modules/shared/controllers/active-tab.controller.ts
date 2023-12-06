import { ChromeRuntimeAdapter } from '../adapters';
import { ActiveTabService } from '../services';

export const ActiveTabMessageType = Object.freeze({
    GetHost: 'GetHost'
});

export class ActiveTabController {
    private listeners: (() => void)[] = [];

    constructor(private activeTabService: ActiveTabService) {
        this.listeners.push(
            ChromeRuntimeAdapter.listenMessage({ type: ActiveTabMessageType.GetHost }, () =>
                this.activeTabService.getHost()
            )
        );
    }

    destroy(): void {
        this.listeners.forEach((unsubscribe) => {
            unsubscribe();
        });
    }
}
