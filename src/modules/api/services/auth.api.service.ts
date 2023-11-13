import { ApiService } from '../../shared/services';

import { AccessTokenRequest, AccessTokenResponse, UserInfoResponse } from '../models';

export class AuthApiService {
    constructor(private api: ApiService) {}

    getAccessToken(params: AccessTokenRequest) {
        return this.api.get<AccessTokenResponse>('auth/token', params, { authenticatedRequest: false });
    }

    getUserInfo() {
        return this.api.get<UserInfoResponse>('users/me', null);
    }
}
