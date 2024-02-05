import isNil from 'lodash/isNil';
import { SettingsStore } from '../../../shared/stores';
import { KeyIconComponent } from '../../../shared/components';
import { ActiveTabClientService } from '../../../shared/services';
import { renderComponent } from '../../../shared/utils';
import { KeyHighlighter, KeyHighlighterProps } from '../components';
import { EntityKeysParserService, ParsingResult } from '../services';
import { EntityInfoPresenter } from './entity-info.presenter';

enum IconPosition {
    Left = 'Left',
    TopLeft = 'TopLeft',
    TopRight = 'TopRight',
    Right = 'Right',
    BottomRight = 'BottomRight',
    BottomLeft = 'BottomLeft'
}

interface Coordinates {
    left: number;
    top: number;
}

interface FindKeysResult {
    isFound: boolean;
    keys: ParsingResult[];
    node: Node;
}

export class FindKeysPresenter {
    private isActivated: boolean = false;
    private highlightedNode: HTMLElement | null = null;
    private lastFindKeysResult: FindKeysResult | null = null;

    private readonly iconOffset = 27;
    private readonly keyHighlighterComponent = new KeyHighlighter({ x: 0, y: 0, width: 0, height: 0 });
    private readonly keyIconComponent: KeyIconComponent = new KeyIconComponent({
        left: 0,
        top: 0,
        onClick: this.handleToggleEntityInfo.bind(this)
    });

    private targetObserver: MutationObserver | null = null;

    constructor(
        private window: Window,
        private settingsStore: SettingsStore,
        private activeTabClientService: ActiveTabClientService,
        private entityKeysParserService: EntityKeysParserService,
        private entityInfoPresenter: EntityInfoPresenter
    ) {
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleToggleEntityInfo = this.handleToggleEntityInfo.bind(this);

        this.entityInfoPresenter.onClosePopup(() => this.resetHighlight());

        this.init();
        this.initRemoveTargetListener();
    }

    private async init() {
        await this.subscribeToActivationChange();

        this.window.addEventListener('mousemove', this.handleMouseMove, true);
        this.window.addEventListener('scroll', this.handleScroll, { capture: true });

        renderComponent(this.window.document.body, this.keyIconComponent);
        renderComponent(this.window.document.body, this.keyHighlighterComponent);
    }

    private initRemoveTargetListener() {
        this.stopListenRemoveTarget();

        this.targetObserver = new MutationObserver(() => {
            if (this.highlightedNode && !document.body.contains(this.highlightedNode)) {
                this.resetHighlight();
            }
        });

        this.targetObserver.observe(document.body, { childList: true, subtree: true });
    }

    private stopListenRemoveTarget(): void {
        if (this.targetObserver) {
            this.targetObserver.disconnect();
            this.targetObserver = null;
        }
    }

    private async subscribeToActivationChange() {
        const currentHost = await this.activeTabClientService.getHost();

        this.isActivated = await this.settingsStore.isActivated(currentHost);

        this.settingsStore.onActivationChange(currentHost, (activationState) => {
            this.handleActivationChange(activationState);
        });
    }

    private handleActivationChange(activationState: boolean): void {
        this.isActivated = activationState;

        if (!this.isActivated) {
            this.resetHighlight();
            this.entityInfoPresenter.closePopup();
        }
    }

    private handleMouseMove(event: MouseEvent) {
        if (!this.isActivated) {
            return;
        }

        const node = event.target as HTMLElement;

        if (this.isHighlightedNode(node) || this.isButtonNode(node) || this.isEntityInfoPopup(node)) {
            return;
        }

        const findKeysResult = this.findKeys(node);

        this.lastFindKeysResult = findKeysResult;

        this.processFindKeysResult(findKeysResult);
    }

    private handleToggleEntityInfo() {
        if (this.lastFindKeysResult && this.lastFindKeysResult.isFound) {
            this.entityInfoPresenter.openPopup(this.lastFindKeysResult.keys);
        }

        this.resetHighlight();
    }

    private handleScroll() {
        this.resetHighlight();
    }

    private findKeys(node: Node, deepFind: boolean = true): FindKeysResult {
        if (node.nodeType === Node.TEXT_NODE) {
            const keys = this.entityKeysParserService.parse(node.textContent || '');

            if (keys.length > 0 && node.parentNode) {
                return {
                    isFound: true,
                    keys,
                    node: node.parentNode
                };
            }
        }

        if (!deepFind) {
            return {
                isFound: false,
                keys: [],
                node
            };
        }

        if (node?.hasChildNodes()) {
            for (const child of node.childNodes) {
                const result = this.findKeys(child as Node, false);

                if (result.isFound) {
                    return result;
                }
            }
        }

        return {
            isFound: false,
            keys: [],
            node
        };
    }

    private processFindKeysResult(result: FindKeysResult): void {
        const { isFound, node } = result;

        if (!isFound || !(node instanceof HTMLElement)) {
            this.resetHighlight();

            return;
        }

        this.highlightNode(node);
    }

    private highlightNode(node: HTMLElement): void {
        if (node === this.highlightedNode) {
            return;
        }

        this.resetHighlight();

        this.highlightedNode = node;

        const clientRect: DOMRect = this.highlightedNode.getBoundingClientRect();

        this.keyIconComponent.show(this.getIconCoordinates(clientRect));
        this.keyHighlighterComponent.show(this.getHighlighterProps(clientRect));
    }

    private resetHighlight(): void {
        this.hideHighlight();
        this.highlightedNode = null;
    }

    private hideHighlight(): void {
        this.keyIconComponent.hide();
        this.keyHighlighterComponent.hide();
    }

    private isHighlightedNode(node: HTMLElement | null): boolean {
        if (isNil(node) || isNil(this.highlightedNode)) {
            return false;
        }

        return node === this.highlightedNode;
    }

    private isButtonNode(node: HTMLElement | null): boolean {
        if (isNil(node) || isNil(this.keyIconComponent.ref)) {
            return false;
        }

        return node === this.keyIconComponent.ref || this.keyIconComponent.ref.contains(node);
    }

    private isEntityInfoPopup(node: HTMLElement): boolean {
        return node.closest('.kbq-entity-info-slot') !== null;
    }

    private getIconPosition(clientRect: DOMRect): IconPosition {
        const d = this.window.document.documentElement;

        const clientWidth = d.clientWidth;
        const clientHeight = d.clientHeight;

        if (clientRect.left > this.iconOffset) {
            return IconPosition.Left;
        } else if (clientRect.top > this.iconOffset && clientRect.left >= 0) {
            return IconPosition.TopLeft;
        } else if (clientRect.top > this.iconOffset && clientRect.right > this.iconOffset) {
            return IconPosition.TopRight;
        } else if (clientRect.bottom > this.iconOffset && clientWidth >= clientRect.right + this.iconOffset) {
            return IconPosition.Right;
        } else if (clientHeight > clientRect.bottom + this.iconOffset && clientWidth >= clientRect.right) {
            return IconPosition.BottomRight;
        } else {
            return IconPosition.BottomLeft;
        }
    }

    private getIconCoordinates(clientRect: DOMRect): Coordinates {
        const iconPosition = this.getIconPosition(clientRect);

        switch (iconPosition) {
            case IconPosition.Left:
                return {
                    left: clientRect.x - this.iconOffset,
                    top: clientRect.top - 2
                };
            case IconPosition.TopLeft:
                return {
                    left: clientRect.left - 2,
                    top: clientRect.top - this.iconOffset
                };
            case IconPosition.TopRight:
                return {
                    left: clientRect.right - this.iconOffset + 5,
                    top: clientRect.top - this.iconOffset
                };
            case IconPosition.Right:
                return {
                    left: clientRect.right + 3,
                    top: clientRect.top - 2
                };
            case IconPosition.BottomRight:
                return {
                    left: clientRect.right - this.iconOffset,
                    top: clientRect.bottom + 2
                };
            case IconPosition.BottomLeft:
                return {
                    left: clientRect.left,
                    top: clientRect.bottom + 2
                };
        }
    }

    private getHighlighterProps(clientRect: DOMRect): KeyHighlighterProps {
        const keyIconHeight = this.keyIconComponent.ref?.getBoundingClientRect()?.height || 0;

        return {
            x: clientRect.left,
            y: clientRect.top,
            width: clientRect.width,
            height: Math.max(clientRect.height, keyIconHeight - 4)
        };
    }
}
