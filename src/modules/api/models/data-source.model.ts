export interface IDataSource {
    uuid: string;
    name: string;
    longName: string;
    confidence: number;
    manualConfidence: number;
    type: IDataSourceTypeBrief;
}

export interface IDataSourceTypeBrief {
    uuid: string;
    longName: string;
    confidence: number;
}
