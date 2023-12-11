import { ObservableEntityKeyType, ObservableEntityType } from '../../../api/models';
import { RuntimeCommunicationService } from '../../../shared/services';
import { GetEntitiesInfoRequestMessage, GetEntitiesInfoResponseMessage } from '../types';
import { resultFromDTO } from '../../../shared/utils';

export class EntityInfoClientService {
    constructor(private runtimeCommunicationService: RuntimeCommunicationService) {}

    getEntities(
        params: { type: ObservableEntityType; keyType: ObservableEntityKeyType; key: string }[],
        signal: AbortSignal
    ) {
        return this.runtimeCommunicationService
            .sendRequest<
                GetEntitiesInfoRequestMessage['name'],
                GetEntitiesInfoRequestMessage['payload'],
                GetEntitiesInfoResponseMessage['payload']
            >('GetEntities', { params }, signal)
            .then(resultFromDTO);
    }
}
