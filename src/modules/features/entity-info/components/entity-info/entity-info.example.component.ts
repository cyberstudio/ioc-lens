import { Component, createExample } from '../../../../shared/utils';
import { TranslateService } from '../../../../shared/services';

import { EntityInfoComponent } from './entity-info.component';

import './entity-info.example.component.css';
import { EntityMetadataMapper } from '../../mappers';
import { FileAggregateData } from '../../mocks';
import { EntityFullInfoModel } from '../../models';
import { EntityMetadata } from '../../models/entity-metadata.model';
import { ObservableEntityType, RelationDirection, RelationType } from '../../../../api/models';

class EntityInfoExampleComponent extends Component<void> {
    protected createComponent(): HTMLElement {
        const translateService = new TranslateService();

        const el = this.parseTemplate('<div class="kbq-entity-attributes-example"></div>');

        const entities = [FileAggregateData].map((data) => [
            EntityMetadataMapper.fromModel(EntityFullInfoModel.createFromRawData(data.empty)),
            EntityMetadataMapper.fromModel(
                EntityFullInfoModel.createFromRawData(data.fill, [
                    {
                        linkType: {
                            relatedEntitiesType: ObservableEntityType.DomainName,
                            relationKind: RelationType.ConnectsTo,
                            linkDirection: RelationDirection.Forward
                        },
                        links: {
                            total: 3,
                            distributionByConfidence: [
                                {
                                    confidenceRange: [1, 0],
                                    count: 3
                                }
                            ]
                        }
                    }
                ])
            )
        ]);

        const renderEntity = (title: string, entity: EntityMetadata) => {
            const el = this.parseTemplate('<div></div>');

            this.renderContent(el, this.parseTemplate(`<h3 class="subheading">${title} ${entity.type}</h3>`));
            this.renderContent(el, new EntityInfoComponent({ metadata: entity }, translateService));

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

export const entityInfoComponentExample = createExample('Entity info', new EntityInfoExampleComponent());
