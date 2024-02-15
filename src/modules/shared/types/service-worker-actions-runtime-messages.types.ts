import { RuntimeRequestMessage } from './runtime-message.types';

export type OpenExtensionSettingsRequestMessage = RuntimeRequestMessage<'OpenExtensionSettings', void>;
export type CheckEnabledStatusRequestMessage = RuntimeRequestMessage<'CheckEnabledStatus', void>;
