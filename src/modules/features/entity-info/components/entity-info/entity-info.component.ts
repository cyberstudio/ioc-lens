import { EntityAttributesComponent } from '..';
import { TranslateService } from '../../../../shared/services';
import { Component } from '../../../../shared/utils';
import { EntityMetadata } from '../../models/entity-metadata.model';

import './entity-info.component.css';

interface EntityInfoProps {
    metadata: EntityMetadata;
}

export class EntityInfoComponent extends Component<EntityInfoProps> {
    constructor(
        props: EntityInfoProps,
        private translateService: TranslateService
    ) {
        super(props);
    }

    protected createComponent(): HTMLElement {
        const el = this.parseTemplate('<div class="kbq-entity-info"></div>');

        this.renderContent(el, this.renderAttributes(this.props));
        this.renderContent(el, this.renderRelationsStatistic(this.props));

        if (!this.translateService.isEnglishLocale && this.props.metadata.hasUnknownAttributes) {
            this.renderContent(el, this.renderI18nNotes());
        }

        return el;
    }

    private renderAttributes(props: EntityInfoProps): HTMLElement {
        const root = this.parseTemplate('<div class="kbq-entity-info__attributes"></div>');

        this.renderContent(root, new EntityAttributesComponent({ metadata: props.metadata }, this.translateService));

        return root;
    }

    private renderRelationsStatistic(props: EntityInfoProps): HTMLElement {
        const {
            metadata: { relatedEntitiesAmount }
        } = props;

        const hasRelations = relatedEntitiesAmount > 0;

        const root = this.parseTemplate('<div class="kbq-entity-info__relations-statistic subheading"></div>');

        if (!hasRelations) {
            root.classList.add('kbq-entity-info__relations-statistic--empty');
        }

        const message = hasRelations
            ? this.translateService.translate('Entity_Relations_Text_StatisticTitle', {
                  count: props.metadata.relatedEntitiesAmount
              })
            : this.translateService.translate('Entity_Relations_Text_EmptyStatisticTitle');

        this.renderContent(root, message);

        return root;
    }

    private renderI18nNotes(): HTMLElement {
        const root = this.parseTemplate('<div class="kbq-entity-info__i18n-notes small-text"></div>');

        this.renderContent(root, this.translateService.translate('Common_App_Text_I18nNote'));

        return root;
    }
}
