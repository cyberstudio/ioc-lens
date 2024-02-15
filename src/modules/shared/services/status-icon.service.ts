import { ActiveTabService } from './active-tab.service';

export class StatusIconService {
    constructor(private activeTabService: ActiveTabService) {}

    async updateIcon(status: boolean) {
        const iconPath = this.getIconPath(status, 16);

        chrome.action.setIcon({
            path: {
                '16': iconPath,
                '32': this.getIconPath(status, 32)
            }
        });
    }

    private getIconPath(status: boolean, size: number): string {
        return status ? `images/icon_${size}.png` : `images/icon_disabled_${size}.png`;
    }
}
