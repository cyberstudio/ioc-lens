import { EntityAttributeValueComponent } from '../entity-attribute-value/entity-attribute-value.component';
import { AttributeObservableEntity, ObservableEntityType, isKnownAttribute } from '../../../../api/models';
import { BadgeComponent, PropertyRowComponent } from '../../../../shared/components';
import { TranslateService } from '../../../../shared/services';
import { Component } from '../../../../shared/utils';
import { HashSum } from '../../mappers';
import { EntityAttributeValuesProps, EntityMetadata } from '../../models/entity-metadata.model';

import './entity-attributes.component.css';

interface EntityAttributesProps {
    metadata: EntityMetadata;
}

export class EntityAttributesComponent extends Component<EntityAttributesProps> {
    constructor(
        props: EntityAttributesProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-attributes"></div>');

        if (this.props.metadata.verdictAttributes.length > 0) {
            this.renderContent(el, this.renderVerdicts(this.props.metadata.verdictAttributes));
        }

        this.renderContent(el, this.renderAttributes(this.props.metadata));

        if (this.props.metadata.labels.length > 0) {
            this.renderContent(el, this.renderLabels(this.props.metadata.labels));
        }

        return el;
    }

    private renderVerdicts(verdicts: EntityAttributeValuesProps[]): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-attributes__verdicts"></div>');

        verdicts.forEach((v) => {
            this.renderContent(
                el,
                new EntityAttributeValueComponent(
                    {
                        attributeName: v.attributeName,
                        value: v.values[0]?.value,
                        confidence: v.values[0]?.confidence || null
                    },
                    this.translateService
                )
            );
        });

        return el;
    }

    private renderAttributes(metadata: EntityMetadata): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-attributes__attributes"></div>');

        if (metadata.type === ObservableEntityType.File) {
            metadata.hashSums.forEach((hashSum) => {
                this.renderContent(el, this.renderHashSum(hashSum));
            });
        }

        if (metadata.type === ObservableEntityType.URL) {
            this.renderContent(el, this.renderFullUrl(metadata.priorityKey));
        }

        metadata.attributes.forEach((attribute) => {
            this.renderContent(el, this.renderAttribute(metadata.type, attribute));
        });

        return el;
    }

    private renderHashSum(hashSum: HashSum): PropertyRowComponent {
        const title = this.translateService.translate(`Common_HashSum_Text_${hashSum.type}`);

        return hashSum.value
            ? new PropertyRowComponent({ title, content: hashSum.value })
            : new PropertyRowComponent({
                  title,
                  content: this.parseTemplate('<span class="kbq-entity-attributes__empty-value">—</span>')
              });
    }

    private renderFullUrl(value: string): PropertyRowComponent {
        const title = this.translateService.translate(`Entity_Url_Text_FullLink`);

        return new PropertyRowComponent({ title, content: value });
    }

    private renderAttribute(
        entityType: ObservableEntityType,
        attribute: EntityAttributeValuesProps
    ): PropertyRowComponent {
        const translatedTitle = this.translateAttribute(entityType, attribute.attributeName);

        const valuesContainer = this.parseTemplate('<div class="kbq-entity-attributes__values"></div>');

        if (attribute.values.length === 0) {
            this.renderContent(
                valuesContainer,
                this.parseTemplate('<span class="kbq-entity-attributes__empty-value">—</span>')
            );
        } else {
            attribute.values.forEach(({ value, confidence }) => {
                this.renderContent(
                    valuesContainer,
                    new EntityAttributeValueComponent(
                        {
                            attributeName: attribute.attributeName,
                            value,
                            confidence
                        },
                        this.translateService
                    )
                );
            });
        }

        return new PropertyRowComponent({
            title: translatedTitle,
            hasTitleNote: !isKnownAttribute(attribute.attributeName),
            content: valuesContainer
        });
    }

    private renderLabels(labels: string[]): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-attributes__labels"></div>');

        labels.forEach((labelValue) => {
            this.renderContent(
                el,
                new BadgeComponent({
                    fill: 'filled',
                    style: 'contrast',
                    content: labelValue
                })
            );
        });

        return el;
    }

    private translateAttribute(
        entityType: ObservableEntityType,
        attribute: AttributeObservableEntity | string
    ): string {
        const value = this.translateService.translate(this.getTranslateAttributeKey(entityType, attribute));

        return value || attribute.toString();
    }

    private getTranslateAttributeKey(
        entityType: ObservableEntityType,
        attribute: AttributeObservableEntity | string
    ): string {
        switch (attribute) {
            case AttributeObservableEntity.Names: {
                return entityType === ObservableEntityType.File ? `Entity_AttributeName_Text_FileNames` : '';
            }

            case AttributeObservableEntity.Statuses: {
                return entityType === ObservableEntityType.IPAddress
                    ? `Entity_AttributeName_Text_IpAddressStatuses`
                    : 'Entity_AttributeName_Text_DomainNameStatuses';
            }

            default: {
                return `Entity_AttributeName_Text_${attribute}`;
            }
        }
    }
}
