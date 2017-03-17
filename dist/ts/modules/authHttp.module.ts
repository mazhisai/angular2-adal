/**
 * ng2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.2.8
 * @link https://github.com/sureshchahal/angular2-adal#readme
 * @license MIT
 */
import { NgModule } from '@angular/core';

import { AdalModule } from './adal.module';
import { AuthHttp } from './../services/authHttp.service'

@NgModule({
    imports: [AdalModule],
    exports: [],
    declarations: [],
    providers: [AuthHttp],
})
export class AuthHttpModule { }
