import isNil from 'lodash/isNil';
import { SettingsStore } from '../../../shared/stores';
import { KeyIconComponent } from '../../../shared/components';
import { ActiveTabClient } from '../../../shared/clients';
import { renderComponent } from '../../../shared/utils';
import { EntityKeysParserService, ParsingResult } from '../services';

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
    private selectedNode: HTMLElement | null = null;
    private highlightedNode: HTMLElement | null = null;

    private readonly iconOffset = 27;
    private readonly highlightClass = 'kbq-highlighted-node';
    private readonly keyIconComponent: KeyIconComponent = new KeyIconComponent({
        left: 0,
        top: 0,
        onClick: this.handleShowEntityInfo.bind(this)
    });

    constructor(
        private window: Window,
        private settingsStore: SettingsStore,
        private activeTabClient: ActiveTabClient,
        private entityKeysParserService: EntityKeysParserService
    ) {
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleShowEntityInfo = this.handleShowEntityInfo.bind(this);

        this.init();
    }

    private async init() {
        await this.subscribeToActivationChange();

        this.window.addEventListener('mousemove', this.handleMouseMove, true);
        this.window.addEventListener('scroll', this.handleScroll, { capture: true });

        renderComponent(this.window.document.body, this.keyIconComponent);
    }

    private async subscribeToActivationChange() {
        const currentHost = await this.activeTabClient.getHost();

        this.isActivated = await this.settingsStore.isActivated(currentHost);

        this.settingsStore.onActivationChange(currentHost, (activationState) => {
            this.handleActivationChange(activationState);
        });
    }

    private handleActivationChange(activationState: boolean): void {
        this.isActivated = activationState;
    }

    handleMouseMove(event: MouseEvent) {
        const node = event.target as HTMLElement;

        if (this.isHighlightedNode(node) || this.isButtonNode(node)) {
            return;
        }

        const findKeysResult = this.findKeys(node);

        this.processFindKeysResult(findKeysResult);
    }

    private handleShowEntityInfo() {
        if (this.isSelectedNode(this.highlightedNode)) {
            this.resetSelection();
        } else {
            this.selectNode(this.highlightedNode);
        }
    }

    private handleScroll() {
        this.resetHighlight();
        this.resetSelection();
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
        this.highlightedNode.classList.add(this.highlightClass);
    }

    private selectNode(node: HTMLElement | null): void {
        this.resetSelection();
        this.selectedNode = node;
        this.keyIconComponent.hide();
    }

    private resetHighlight(): void {
        this.hideHighlight(this.highlightedNode);
        this.highlightedNode = null;
    }

    private resetSelection(): void {
        const currentSelectedNode = this.selectedNode;

        this.selectedNode = null;

        this.hideHighlight(currentSelectedNode);
    }

    private hideHighlight(node: HTMLElement | null): void {
        if (node && !this.isSelectedNode(node)) {
            node.classList.remove(this.highlightClass);
        }

        this.keyIconComponent.hide();
    }

    private isHighlightedNode(node: HTMLElement | null): boolean {
        if (isNil(node) || isNil(this.highlightedNode)) {
            return false;
        }

        return node === this.highlightedNode;
    }

    private isSelectedNode(node: HTMLElement | null): boolean {
        if (isNil(node) || isNil(this.selectedNode)) {
            return false;
        }

        return node === this.selectedNode;
    }

    private isButtonNode(node: HTMLElement | null): boolean {
        if (isNil(node) || isNil(this.keyIconComponent.ref)) {
            return false;
        }

        return node === this.keyIconComponent.ref || this.keyIconComponent.ref.contains(node);
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
}
