import { ObservableEntityType } from './oet.model';
import { Confidence } from '../confidence.model';

export interface RelationStatistic {
    linkType: RelationStatisticLinkType;
    links: {
        total: number;
        distributionByConfidence: RelationStatisticDistribution[];
    };
}

export interface RelationStatisticLinkType {
    linkDirection: RelationDirection;
    relationKind: RelationType;
    relatedEntitiesType: ObservableEntityType;
}

export interface RelationStatisticDistribution {
    confidenceRange: [Confidence, Confidence];
    count: number;
}

export enum RelationType {
    ConnectsTo = 'ConnectsTo',
    Contains = 'Contains',
    Drops = 'Drops',
    Has = 'Has',
    Hosts = 'Hosts',
    Locates = 'Locates',
    Owns = 'Owns',
    ResolvesTo = 'ResolvesTo',
    Serves = 'Serves',
    Supports = 'Supports',
    Uses = 'Uses'
}

export enum RelationDirection {
    Forward = 'Forward',
    Reverse = 'Reverse'
}
