import { AttributeObservableEntity } from '../../../../api/models';
import { TranslateService } from '../../../../shared/services';
import { Component } from '../../../../shared/utils';
import {
    createASNAttributeValueComponent,
    createClassAttributeValueComponent,
    createDefaultAttributeValueComponent,
    createIsDGAAttributeValueComponent,
    createIsDelegatedAttributeValueComponent,
    createIsIoCAttributeValueComponent,
    createIsTrustedAttributeValueComponent,
    createPotentialDamageAttributeValueComponent,
    createRelatedThreatCategoryAttributeValueComponent,
    createSizeAttributeValueComponent,
    createThreatCategoryAttributeValueComponent
} from './attributes';

import { EntityAttributeValueProps, isEntityAttributeValueProps } from './entity-attribute-value.component.types';

import './entity-attribute-value.component.css';

export class EntityAttributeValueComponent extends Component<EntityAttributeValueProps> {
    constructor(
        props: EntityAttributeValueProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-attribute-value kbq-typography-text-normal"></div>');

        this.renderContent(el, this.renderValue());

        return el;
    }

    private renderValue() {
        if (isEntityAttributeValueProps(AttributeObservableEntity.IsIoC, this.props)) {
            return createIsIoCAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.IsDGA, this.props)) {
            return createIsDGAAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.IsTrusted, this.props)) {
            return createIsTrustedAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.IsDelegated, this.props)) {
            return createIsDelegatedAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.ThreatCategory, this.props)) {
            return createThreatCategoryAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.RelatedThreatCategory, this.props)) {
            return createRelatedThreatCategoryAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.Class, this.props)) {
            return createClassAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.ASN, this.props)) {
            return createASNAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.PotentialDamage, this.props)) {
            return createPotentialDamageAttributeValueComponent(this.props, this.translateService);
        }

        if (isEntityAttributeValueProps(AttributeObservableEntity.Size, this.props)) {
            return createSizeAttributeValueComponent(this.props, this.translateService);
        }

        return createDefaultAttributeValueComponent(this.props, this.translateService);
    }
}
