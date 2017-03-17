/**
 * ng2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.2.8
 * @link https://github.com/sureshchahal/angular2-adal#readme
 * @license MIT
 */
/// <reference types="adal" />
import { Observable } from 'rxjs';
import { OAuthData } from "./oauthdata.model";
export declare class AdalService {
    private adalContext;
    private oauthData;
    init(configOptions: adal.Config): void;
    readonly config: adal.Config;
    readonly userInfo: OAuthData;
    login(): void;
    loginInProgress(): boolean;
    logOut(): void;
    handleWindowCallback(): void;
    getCachedToken(resource: string): string;
    acquireToken(resource: string): Observable<void>;
    getUser(): Observable<adal.User>;
    clearCache(): void;
    clearCacheForResource(resource: string): void;
    info(message: string): void;
    verbose(message: string): void;
    GetResourceForEndpoint(url: string): string;
    refreshDataFromCache(): void;
    private updateDataFromCache(resource);
}
