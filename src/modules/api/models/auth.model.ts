import { ApiGetParams } from '../../shared/services';
import { DataSource } from './data-source.model';
import { ShareLevel } from './share-level.model';

export interface AccessTokenRequest extends ApiGetParams {
    apiKey: string;
}

export interface AccessTokenResponse {
    accessToken: string;
    tokenType: 'Bearer';
    expiresIn: number;
}

export interface UserInfoResponse {
    uuid: string;
    login: string;
    fullName: string | null;
    email: string | null;
    isDisabled: boolean;
    authProviderID: string;
    dataSource: DataSource | null;
    accessLevel: ShareLevel;
    permissions: string[];
    roles: { uuid: string; name: Role }[];
    passwordAuthEnabled: boolean;
}

export enum Role {
    SystemAdministrator = 'SystemAdministrator',
    DataEngineer = 'DataEngineer',
    SOCAnalyst = 'SOCAnalyst',
    CTIAnalyst = 'CTIAnalyst',
    CyberSecuritySpecialist = 'CyberSecuritySpecialist',
    Guest = 'Guest'
}
