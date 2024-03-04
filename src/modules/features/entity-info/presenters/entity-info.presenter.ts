import { ServiceWorkerActionsClientService, TranslateService } from '../../../shared/services';
import { renderComponent } from '../../../shared/utils';
import { EntityInfoPopupComponent, EntityInfoPopupProps, EntityInfoSlot, parseEntityInfoError } from '../components';
import { EntityBrief } from '../mappers';
import { EntityMetadata } from '../models/entity-metadata.model';
import { EntityInfoClientService, EntityNavigationService, ParsingResult } from '../services';

const REGEX = /%(\d[a-f0-9])/gi;
const REPLACEMENTS: Record<string, string> = {
    '40': '@',
    '3A': ':',
    '24': '$',
    '2C': ',',
    '3D': '=',
    '3F': '?',
    '2F': '/'
};

export const encoding = (value: string): string => {
    return encodeURIComponent(value).replace(REGEX, (substring, index) => REPLACEMENTS[index] ?? substring);
};

export class EntityInfoPresenter {
    private popup: EntityInfoPopupComponent | null = null;
    private popupSlot = new EntityInfoSlot();

    private onClosePopupCallback: (() => void) | null = null;

    private parsedKeys: ParsingResult[] = [];
    private entities: { brief: EntityBrief; metadata: EntityMetadata }[] = [];
    private entitiesInfoLoadingAbortController = new AbortController();

    constructor(
        private root: HTMLElement,
        private translateService: TranslateService,
        private entityNavigationService: EntityNavigationService,
        private serviceWorkerActionsClientService: ServiceWorkerActionsClientService,
        private entityInfoClientService: EntityInfoClientService
    ) {
        renderComponent(this.root, this.popupSlot);
    }

    destroy() {
        this.popup?.destroy();
        this.popupSlot.destroy();
    }

    async openPopup(keys: ParsingResult[]) {
        this.parsedKeys = keys;
        this.updatePopup({
            state: { type: 'Loading' },
            onClose: () => this.handleClosePopup()
        });

        const encodingKeys = keys.map((key) => ({
            ...key,
            keyValue: encoding(key.keyValue)
        }));

        const entitiesResult = await this.loadEntities(encodingKeys);

        if (entitiesResult.isErr) {
            this.updatePopup({
                state: {
                    type: 'Error',
                    error: parseEntityInfoError(entitiesResult.error.name),
                    onReload: () => this.handleReloadEntities(),
                    onOpenSettings: () => this.handleOpenSettings()
                },
                onClose: () => this.handleClosePopup()
            });

            return;
        }

        this.entities = entitiesResult.value;

        if (this.entities.length === 0) {
            this.updatePopup({
                state: {
                    type: 'Empty'
                },
                onClose: () => this.handleClosePopup()
            });

            return;
        }

        if (this.entities.length === 1) {
            await this.openViewEntityPopup(this.entities[0].metadata);
        } else {
            await this.openSelectEntityPopup();
        }
    }

    closePopup(): void {
        this.parsedKeys = [];
        this.entities = [];

        this.hidePopup();
    }

    onClosePopup(cb: () => void): void {
        this.onClosePopupCallback = cb;
    }

    private handleReloadEntities(): void {
        this.openPopup(this.parsedKeys);
    }

    private handleOpenSettings(): void {
        this.handleClosePopup();

        this.serviceWorkerActionsClientService.openExtensionSettings();
    }

    private handleClosePopup(): void {
        this.closePopup();

        if (this.onClosePopupCallback) {
            this.onClosePopupCallback();
        }
    }

    private async openViewEntityPopup(entity: EntityMetadata) {
        const viewUrl = await this.entityNavigationService.getViewEntityUrl(entity.id);

        this.updatePopup({
            state: {
                type: 'ViewEntity',
                entity,
                viewUrl
            },
            onClose: () => this.handleClosePopup()
        });
    }

    private async openSelectedEntityPopup(entity: EntityMetadata) {
        const viewUrl = await this.entityNavigationService.getViewEntityUrl(entity.id);

        this.updatePopup({
            state: {
                type: 'SelectedEntity',
                entity,
                viewUrl,
                onBack: () => this.openSelectEntityPopup()
            },
            onClose: () => this.handleClosePopup()
        });
    }

    private async openSelectEntityPopup() {
        this.updatePopup({
            state: {
                type: 'SelectEntity',
                entities: this.entities.map((e) => e.brief),
                onSelect: (uuid) => {
                    const entity = this.entities.find((e) => e.metadata.id === uuid);

                    if (entity) {
                        this.openSelectedEntityPopup(entity.metadata);
                    }
                }
            },
            onClose: () => this.handleClosePopup()
        });
    }

    private updatePopup(props: EntityInfoPopupProps): void {
        this.hidePopup();

        this.popup = new EntityInfoPopupComponent(props, this.translateService);

        renderComponent(this.popupSlot.ref, this.popup);
    }

    private hidePopup(): void {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }
    }

    private async loadEntities(keys: ParsingResult[]) {
        this.cancelLoadingEntities();

        this.entitiesInfoLoadingAbortController = new AbortController();

        return this.entityInfoClientService.getEntities(
            keys.map((k) => ({ type: k.type, keyType: k.keyType, key: k.keyValue })),
            this.entitiesInfoLoadingAbortController.signal
        );
    }

    private cancelLoadingEntities() {
        if (this.entitiesInfoLoadingAbortController) {
            this.entitiesInfoLoadingAbortController.abort();
        }
    }
}
