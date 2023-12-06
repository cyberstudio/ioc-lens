import { ChromeRuntimeAdapter } from '../adapters';
import { ActiveTabMessageType } from '../controllers';

export class ActiveTabClient {
    async getHost(): Promise<string> {
        return ChromeRuntimeAdapter.sendMessage({ type: ActiveTabMessageType.GetHost });
    }
}
