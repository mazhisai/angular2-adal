/**
 * ng2-adal - Use Azure AD Library - ADAL in Angular 2
 * @version v0.2.8
 * @link https://github.com/sureshchahal/angular2-adal#readme
 * @license MIT
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var adal_service_1 = require("./adal.service");
var AuthHttp = (function () {
    function AuthHttp(http, adalService) {
        this.http = http;
        this.adalService = adalService;
    }
    AuthHttp.prototype.get = function (url, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Get });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    AuthHttp.prototype.post = function (url, body, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Post, body: body });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    AuthHttp.prototype.delete = function (url, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Delete });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    AuthHttp.prototype.patch = function (url, body, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Patch, body: body });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    AuthHttp.prototype.put = function (url, body, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Put, body: body });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    AuthHttp.prototype.head = function (url, options) {
        var options1 = new http_1.RequestOptions({ method: http_1.RequestMethod.Put });
        options1 = options1.merge(options);
        return this.sendRequest(url, options1);
    };
    AuthHttp.prototype.sendRequest = function (url, options) {
        var _this = this;
        //make a copy
        var options1 = new http_1.RequestOptions();
        options1.method = options.method;
        options1 = options1.merge(options);
        var resource = this.adalService.GetResourceForEndpoint(url);
        var authenticatedCall;
        if (resource) {
            if (this.adalService.userInfo.isAuthenticated) {
                authenticatedCall = this.adalService.acquireToken(resource)
                    .flatMap(function (token) {
                    if (options1.headers == null) {
                        options1.headers = new http_1.Headers();
                    }
                    options1.headers.append('Authorization', 'Bearer ' + token);
                    return _this.http.request(url, options1)
                        .catch(_this.handleError);
                });
            }
            else {
                authenticatedCall = rxjs_1.Observable.throw(new Error("User Not Authenticated."));
            }
        }
        else {
            authenticatedCall = this.http.request(url, options).map(this.extractData).catch(this.handleError);
        }
        return authenticatedCall;
    };
    AuthHttp.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        var body = {};
        //if there is some content, parse it
        if (res.status != 204) {
            body = res.json();
        }
        return body || {};
    };
    AuthHttp.prototype.handleError = function (error) {
        // In a real world app, we might send the error to remote logging infrastructure
        var errMsg = error.message || 'Server error';
        console.error(JSON.stringify(error)); // log to console instead
        return rxjs_1.Observable.throw(error);
    };
    return AuthHttp;
}());
AuthHttp = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http,
        adal_service_1.AdalService])
], AuthHttp);
exports.AuthHttp = AuthHttp;

//# sourceMappingURL=authHttp.service.js.map
