/**
 * ng2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.2.8
 * @link https://github.com/sureshchahal/angular2-adal#readme
 * @license MIT
 */
import { Http, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import { AdalService } from './adal.service';
export declare class AuthHttp {
    private http;
    private adalService;
    constructor(http: Http, adalService: AdalService);
    get(url: string, options?: RequestOptionsArgs): Observable<any>;
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
    delete(url: string, options?: RequestOptionsArgs): Observable<any>;
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any>;
    head(url: string, options?: RequestOptionsArgs): Observable<any>;
    private sendRequest(url, options);
    private extractData(res);
    private handleError(error);
}
