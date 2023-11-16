export interface DataSource {
    uuid: string;
    name: string;
    longName: string;
    confidence: number;
    manualConfidence: number;
    type: DataSourceTypeBrief;
}

export interface DataSourceTypeBrief {
    uuid: string;
    longName: string;
    confidence: number;
}
