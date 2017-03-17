/**
 * ng2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.2.8
 * @link https://github.com/sureshchahal/angular2-adal#readme
 * @license MIT
 */
declare module 'adal-angular' {
    export function inject(config: adal.Config): adal.AuthenticationContext;
}

declare namespace adal {
    interface AuthenticationContext {
        REQUEST_TYPE: {
            LOGIN: string,
            RENEW_TOKEN: string,
            UNKNOWN: string
        };

        callback : any;

        _getItem : any;

        _renewFailed : any;

        CONSTANTS : any;
    }

}

interface Window {
    AuthenticationContext : any;
    callBackMappedToRenewStates : any;
}

