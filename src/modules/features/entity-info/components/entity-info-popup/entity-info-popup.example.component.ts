import { Component, createExample } from '../../../../shared/utils';
import { TranslateService } from '../../../../shared/services';
import { ButtonComponent } from '../../../../shared/components';
import { DomainNameAggregateData, FileAggregateData } from '../../mocks';
import { EntityMetadataMapper } from '../../mappers';
import { EntityFullInfoModel } from '../../models';
import { EntityMetadata } from '../../models/entity-metadata.model';

import { EntityInfoPopupComponent, EntityInfoPopupState } from './entity-info-popup.component';

import './entity-info-popup.example.component.css';
class EntityInfoPopupExampleComponent extends Component<void> {
    private popup: EntityInfoPopupComponent | null = null;

    private readonly translateService = new TranslateService();

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-info-popup-example"></div>');

        const entities = [FileAggregateData, DomainNameAggregateData]
            .map((a) => {
                return EntityMetadataMapper.fromModel(EntityFullInfoModel.createFromRawData(a.fill));
            })
            .filter(Boolean) as EntityMetadata[];

        const states: EntityInfoPopupState[] = [
            { type: 'Loading' },
            { type: 'Empty' },
            {
                type: 'Error',
                error: 'Unknown',
                onReload: () => console.log('reload'),
                onOpenSettings: () => console.log('open settings')
            },
            {
                type: 'Error',
                error: 'UnknownSettings',
                onReload: () => console.log('reload'),
                onOpenSettings: () => console.log('open settings')
            },
            {
                type: 'SelectEntity',
                entities: entities.map((e) => {
                    return { type: e.type, key: e.priorityKey, uuid: e.id };
                }),
                onSelect: () => console.log('select entity')
            },
            {
                type: 'ViewEntity',
                entity: entities[0],
                viewUrl: `https://ioc-stage.com/#/objects/view/${entities[0].id}`,
                onBack: () => console.log('back')
            }
        ];

        const wrapper = this.parseTemplate('<div class="kbq-entity-attributes-example__buttons"></div>');

        states.forEach((s) => {
            this.renderContent(
                wrapper,
                new ButtonComponent({ type: 'primary', text: s.type, onClick: () => this.renderPopup(el, s) })
            );
        });

        this.renderContent(el, wrapper);

        this.renderPopup(el, states[0]);

        return el;
    }

    private renderPopup(root: HTMLElement, state: EntityInfoPopupState): void {
        if (this.popup) {
            this.popup.destroy();
            this.popup = null;
        }

        this.popup = new EntityInfoPopupComponent(
            { state, onClose: () => console.log('close') },
            this.translateService
        );

        this.renderContent(root, this.popup);
    }
}

export const entityInfoPopupComponentExample = createExample(
    'Entity info popup',
    new EntityInfoPopupExampleComponent()
);
