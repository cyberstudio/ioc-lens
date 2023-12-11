import { EntityInfoService } from '../services';
import { TabCommunicationService } from '../../../shared/services';
import { GetEntitiesInfoRequestMessage, GetEntitiesInfoResponseMessage } from '../types';
import { mapResultToDTO } from '../../../shared/utils';

export class EntityInfoController {
    private listeners: (() => void)[] = [];

    constructor(
        private tabCommunicationService: TabCommunicationService,
        private entityInfoService: EntityInfoService
    ) {
        this.listeners.push(
            this.tabCommunicationService.listenTabRequest<
                GetEntitiesInfoRequestMessage['name'],
                GetEntitiesInfoRequestMessage['payload'],
                GetEntitiesInfoResponseMessage['payload']
            >('GetEntities', this.handleGetEntitiesRequest.bind(this))
        );
    }

    destroy(): void {
        this.listeners.forEach((unsubscribe) => {
            unsubscribe();
        });
    }

    private handleGetEntitiesRequest(
        payload: GetEntitiesInfoRequestMessage['payload'],
        signal: AbortSignal
    ): Promise<GetEntitiesInfoResponseMessage['payload']> {
        return this.entityInfoService.getEntities(payload.params, signal).then(mapResultToDTO);
    }
}
