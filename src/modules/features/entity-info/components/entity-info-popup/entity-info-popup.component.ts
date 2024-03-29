import kebabCase from 'lodash/kebabCase';

import { EntityInfoComponent } from '../entity-info/entity-info.component';
import { ObservableEntityType } from '../../../../api/models';
import {
    AuthErrorAlertComponent,
    ButtonComponent,
    LinkComponent,
    PopupComponent,
    ProgressSpinnerComponent
} from '../../../../shared/components';
import { initKbqTitle } from '../../../../shared/directives';
import { TranslateService } from '../../../../shared/services';
import { AuthFailureState } from '../../../../shared/stores';
import { Component } from '../../../../shared/utils';
import { EntityMetadata } from '../../models/entity-metadata.model';

import './entity-info-popup.component.css';

interface EntityInfoPopupLoadingState {
    type: 'Loading';
}

interface EntityInfoPopupEmptyState {
    type: 'Empty';
    parsedKeys: string[];
}

interface EntityInfoPopupErrorState {
    type: 'Error';
    error: 'Unknown' | AuthFailureState['error'];
    onReload: () => void;
    onOpenSettings: () => void;
}

interface EntityInfoPopupSelectEntityState {
    type: 'SelectEntity';
    entities: { uuid: string; type: ObservableEntityType; key: string }[];
    onSelect: (uuid: string) => void;
}

interface EntityInfoPopupSelectedEntityState {
    type: 'SelectedEntity';
    entity: EntityMetadata;
    viewUrl: string;
    onBack: () => void;
}

interface EntityInfoPopupViewEntityState {
    type: 'ViewEntity';
    entity: EntityMetadata;
    viewUrl: string;
}

export type EntityInfoPopupState =
    | EntityInfoPopupLoadingState
    | EntityInfoPopupEmptyState
    | EntityInfoPopupErrorState
    | EntityInfoPopupSelectEntityState
    | EntityInfoPopupSelectedEntityState
    | EntityInfoPopupViewEntityState;

export interface EntityInfoPopupProps {
    state: EntityInfoPopupState;

    onClose: () => void;
}

export class EntityInfoPopupComponent extends Component<EntityInfoPopupProps> {
    constructor(
        props: EntityInfoPopupProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate(
            `<div class="kbq-entity-info-popup kbq-entity-info-popup--${kebabCase(
                this.props.state.type.toString()
            )} kbq-typography-text-normal"></div>`
        );

        const popup = new PopupComponent({
            hasHeaderDivider: this.isNeedHeader(this.props),
            headerContent: this.renderHeader(this.props),
            bodyContent: this.renderBody(this.props),
            onClose: () => this.props.onClose()
        });

        this.renderContent(el, popup);

        return el;
    }

    private isNeedHeader(props: EntityInfoPopupProps): boolean {
        const { state } = props;

        const statesWithHeader: EntityInfoPopupState['type'][] = ['Loading', 'Empty', 'Error', 'ViewEntity'];

        return statesWithHeader.includes(state.type);
    }

    private renderHeader(props: EntityInfoPopupProps): Component<unknown> | HTMLElement {
        switch (props.state.type) {
            case 'SelectEntity': {
                return this.renderSelectEntityHeader(props.state);
            }

            case 'ViewEntity':
            case 'SelectedEntity': {
                return this.renderViewEntityHeader(props.state);
            }

            default: {
                return this.renderDefaultHeader();
            }
        }
    }

    private renderSelectEntityHeader(state: EntityInfoPopupSelectEntityState): HTMLElement {
        return this.parseTemplate(`
            <span class="kbq-typography-subheading">
                ${this.translateService.translate('EntityInfo_Pseudo_Text_FoundTitle', {
                    count: state.entities.length
                })}
            </span>
        `);
    }

    private renderViewEntityHeader(
        state: EntityInfoPopupViewEntityState | EntityInfoPopupSelectedEntityState
    ): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-info-popup-header"></div>');

        const topHeaderEl = this.parseTemplate('<div class="kbq-entity-info-popup-header__top"></div>');
        const bottomHeaderEl = this.parseTemplate('<div class="kbq-entity-info-popup-header__bottom"></div>');

        const entityTypeEl = this.parseTemplate(`
            <span class="kbq-entity-info-popup-header__type kbq-typography-text-normal">
                ${this.translateEntityType(state.entity.type)}
            </span>
        `);
        const entityLinkEl = this.parseTemplate('<span class="kbq-entity-info-popup-header__link"></span>');

        this.renderContent(
            entityLinkEl,
            new LinkComponent({
                type: 'regular',
                href: state.viewUrl,
                text: this.translateService.translate('EntityInfo_Pseudo_Text_GoToViewEntity')
            })
        );

        this.renderContent(topHeaderEl, entityTypeEl);
        this.renderContent(topHeaderEl, entityLinkEl);

        const entityTitleEl = this.parseTemplate(
            `<span class="kbq-entity-info-popup-header__title kbq-typography-subheading"></span>`
        );

        // Такой способ передачи контента для корректного отображения символов в URL
        this.renderContent(entityTitleEl, state.entity.priorityKey);

        initKbqTitle(entityTitleEl);

        this.renderContent(bottomHeaderEl, entityTitleEl);

        if (state.type === 'SelectedEntity') {
            const backButtonEl = this.parseTemplate('<div class="kbq-entity-info-popup-header__back"></div>');
            this.renderContent(
                backButtonEl,
                new ButtonComponent({
                    type: 'icon',
                    iconName: 'back',
                    onClick: () => state.onBack()
                })
            );

            this.renderContent(bottomHeaderEl, backButtonEl);
        }

        this.renderContent(el, topHeaderEl);
        this.renderContent(el, bottomHeaderEl);

        return el;
    }

    private renderDefaultHeader(): HTMLElement {
        return this.parseTemplate(`
            <span class="kbq-typography-subheading">${this.translateService.translate('Common_App_Text_Name')}</span>
        `);
    }

    private renderBody(props: EntityInfoPopupProps): Component<unknown> | HTMLElement {
        const { state } = props;

        const el = this.parseTemplate(`<div class="kbq-entity-info-popup-body"></div>`);

        switch (state.type) {
            case 'Loading': {
                this.renderContent(el, new ProgressSpinnerComponent({ size: 'compact' }));
                break;
            }

            case 'Empty': {
                const { parsedKeys } = state;

                if (parsedKeys.length > 1) {
                    const list = this.parseTemplate(`<ul class="kbq-entity-info-popup-body__empty-entities"></ul>`);

                    parsedKeys.forEach((key) => {
                        const item = this.parseTemplate(
                            `<li class="kbq-entity-info-popup-body__empty-entities-item"></li>`
                        );
                        const itemText = this.parseTemplate(
                            `<span class="kbq-entity-info-popup-body__empty-entities-item-text"></span>`
                        );

                        this.renderContent(itemText, key);
                        this.renderContent(item, itemText);
                        this.renderContent(list, item);

                        initKbqTitle(itemText);
                    });

                    this.renderContent(el, this.translateService.translate('EntityInfo_Pseudo_Text_NotFoundEntities'));
                    this.renderContent(el, list);
                } else {
                    const messageContainer = this.parseTemplate(
                        `<div class="kbq-entity-info-popup-body__empty-entity"></div>`
                    );
                    const message = this.parseTemplate(
                        `<div class="kbq-entity-info-popup-body__empty-entity-message"></div>`
                    );
                    const key = this.parseTemplate(`<div class="kbq-entity-info-popup-body__empty-entity-key"></div>`);

                    this.renderContent(key, parsedKeys[0]);

                    this.renderContent(
                        message,
                        this.translateService.translate('EntityInfo_Pseudo_Text_NotFoundEntity')
                    );
                    this.renderContent(messageContainer, message);
                    this.renderContent(messageContainer, key);
                    this.renderContent(el, messageContainer);

                    initKbqTitle(key);
                }
                break;
            }

            case 'Error': {
                this.renderContent(
                    el,
                    new AuthErrorAlertComponent(
                        {
                            error: state.error,
                            onGoToSettings: () => state.onOpenSettings(),
                            onRefreshAuth: () => state.onReload()
                        },
                        this.translateService
                    )
                );
                break;
            }

            case 'SelectEntity': {
                state.entities.forEach((e) => {
                    this.renderContent(
                        el,
                        new ButtonComponent({
                            type: 'transparent',
                            text: `${this.translateEntityType(e.type)} ${e.key}`,
                            onClick: () => state.onSelect(e.uuid)
                        })
                    );
                });
                break;
            }

            case 'SelectedEntity':
            case 'ViewEntity': {
                this.renderContent(
                    el,
                    new EntityInfoComponent(
                        {
                            metadata: state.entity
                        },
                        this.translateService
                    )
                );
                break;
            }
        }

        return el;
    }

    private translateEntityType(type: ObservableEntityType): string {
        return this.translateService.translate(`Entity_Type_Text_${type}`) || type.toString();
    }
}

const possibleErrors: EntityInfoPopupErrorState['error'][] = [
    'Unknown',
    'Forbidden',
    'UnknownApiKey',
    'UnknownSettings'
];

export const parseEntityInfoError = (error: string): EntityInfoPopupErrorState['error'] => {
    if (possibleErrors.includes(error as EntityInfoPopupErrorState['error'])) {
        return error as EntityInfoPopupErrorState['error'];
    } else {
        return 'Unknown';
    }
};
