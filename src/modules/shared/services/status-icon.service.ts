import { ActiveTabService } from './active-tab.service';

export class StatusIconService {
    constructor(private activeTabService: ActiveTabService) {}

    async updateIcon(status: boolean) {
        const iconPath = this.getIconPath(status, 16);

        const activeTabId = await this.activeTabService.getId();

        if (!activeTabId) {
            return;
        }

        chrome.action.setIcon({
            path: {
                '16': iconPath,
                '32': this.getIconPath(status, 32)
            },
            tabId: activeTabId
        });
    }

    private getIconPath(status: boolean, size: number): string {
        return status ? `images/icon_${size}.png` : `images/icon_disabled_${size}.png`;
    }
}
