import { Component, createExample } from '../../../../shared/utils';
import { TranslateService } from '../../../../shared/services';

import { EntityAttributesComponent } from './entity-attributes.component';

import './entity-attributes.example.component.css';
import { EntityMetadataMapper } from '../../mappers';
import {
    DomainNameAggregateData,
    EmailAddressAggregateData,
    FileAggregateData,
    IPAddressAggregateData,
    UrlAggregateData
} from '../../mocks';
import { EntityFullInfoModel } from '../../models';
import { EntityMetadata } from '../../models/entity-metadata.model';

class EntityAttributesExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const translateService = new TranslateService();

        const el = this.parseTemplate('<div class="kbq-entity-attributes-example"></div>');

        const entities = [
            FileAggregateData,
            IPAddressAggregateData,
            DomainNameAggregateData,
            UrlAggregateData,
            EmailAddressAggregateData
        ].map((data) => [
            EntityMetadataMapper.fromModel(EntityFullInfoModel.createFromRawData(data.empty)),
            EntityMetadataMapper.fromModel(EntityFullInfoModel.createFromRawData(data.fill))
        ]);

        const renderEntity = (title: string, entity: EntityMetadata) => {
            const el = this.parseTemplate('<div></div>');

            this.renderContent(el, this.parseTemplate(`<h3 class="subheading">${title} ${entity.type}</h3>`));
            this.renderContent(el, new EntityAttributesComponent({ metadata: entity }, translateService));

            return el;
        };

        entities.forEach(([emptyEntity, filledEntity]) => {
            if (!emptyEntity || !filledEntity) {
                return;
            }

            const variantsWrapper = this.parseTemplate('<div class="kbq-entity-attributes-example__row"></div>');

            this.renderContent(variantsWrapper, renderEntity('Empty', emptyEntity));
            this.renderContent(variantsWrapper, renderEntity('Filled', filledEntity));

            this.renderContent(el, variantsWrapper);
        });

        return el;
    }
}

export const entityAttributesComponentExample = createExample(
    'Entity attributes',
    new EntityAttributesExampleComponent()
);
