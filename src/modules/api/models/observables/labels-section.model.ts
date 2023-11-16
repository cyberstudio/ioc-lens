import { AggregateSectionName, BaseAggregateSection } from './aggregate-section.model';

export type LabelsSection = BaseAggregateSection<AggregateSectionName.Labels, LabelsSectionData>;

export interface LabelsSectionData {
    labels: string[];
}
