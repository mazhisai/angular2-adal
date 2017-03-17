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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var adalLib = require("adal-angular");
var AdalService = (function () {
    function AdalService() {
        this.oauthData = {
            isAuthenticated: false,
            userName: '',
            loginError: '',
            profile: {}
        };
    }
    AdalService.prototype.init = function (configOptions) {
        if (!configOptions) {
            throw new Error('You must set config, when calling init.');
        }
        // redirect and logout_redirect are set to current location by default
        var existingHash = window.location.hash;
        var pathDefault = window.location.href;
        if (existingHash) {
            pathDefault = pathDefault.replace(existingHash, '');
        }
        configOptions.redirectUri = configOptions.redirectUri || pathDefault;
        configOptions.postLogoutRedirectUri = configOptions.postLogoutRedirectUri || pathDefault;
        // create instance with given config
        this.adalContext = adalLib.inject(configOptions);
        window.AuthenticationContext = this.adalContext.constructor;
        // loginresource is used to set authenticated status
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    Object.defineProperty(AdalService.prototype, "config", {
        get: function () {
            return this.adalContext.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AdalService.prototype, "userInfo", {
        get: function () {
            return this.oauthData;
        },
        enumerable: true,
        configurable: true
    });
    AdalService.prototype.login = function () {
        this.adalContext.login();
    };
    AdalService.prototype.loginInProgress = function () {
        return this.adalContext.loginInProgress();
    };
    AdalService.prototype.logOut = function () {
        this.adalContext.logOut();
    };
    AdalService.prototype.handleWindowCallback = function () {
        var hash = window.location.hash;
        if (this.adalContext.isCallback(hash)) {
            var requestInfo = this.adalContext.getRequestInfo(hash);
            this.adalContext.saveTokenFromHash(requestInfo);
            if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.LOGIN) {
                this.updateDataFromCache(this.adalContext.config.loginResource);
            }
            else if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                this.adalContext.callback = window.parent.callBackMappedToRenewStates[requestInfo.stateResponse];
            }
            if (requestInfo.stateMatch) {
                if (typeof this.adalContext.callback === 'function') {
                    if (requestInfo.requestType === this.adalContext.REQUEST_TYPE.RENEW_TOKEN) {
                        // Idtoken or Accestoken can be renewed
                        if (requestInfo.parameters['access_token']) {
                            this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), requestInfo.parameters['access_token']);
                        }
                        else if (requestInfo.parameters['error']) {
                            this.adalContext.callback(this.adalContext._getItem(this.adalContext.CONSTANTS.STORAGE.ERROR_DESCRIPTION), null);
                            this.adalContext._renewFailed = true;
                        }
                    }
                }
            }
        }
    };
    AdalService.prototype.getCachedToken = function (resource) {
        return this.adalContext.getCachedToken(resource);
    };
    AdalService.prototype.acquireToken = function (resource) {
        var _this = this;
        var errorMessage;
        return rxjs_1.Observable.bindCallback(function (cb) {
            _this.adalContext.acquireToken(resource, function (error, tokenOut) {
                if (error) {
                    _this.adalContext.error('Error when acquiring token for resource: ' + resource, error);
                    errorMessage = error;
                    cb(null);
                }
                else {
                    cb(tokenOut);
                }
            });
        }, function (token) {
            if (!token && errorMessage)
                throw (errorMessage);
        })();
    };
    AdalService.prototype.getUser = function () {
        var _this = this;
        return rxjs_1.Observable.bindCallback(function (cb) {
            _this.adalContext.getUser(function (error, user) {
                if (error) {
                    this.adalContext.error('Error when getting user', error);
                    cb(null);
                }
                else {
                    cb(user);
                }
            });
        })();
    };
    AdalService.prototype.clearCache = function () {
        this.adalContext.clearCache();
    };
    AdalService.prototype.clearCacheForResource = function (resource) {
        this.adalContext.clearCacheForResource(resource);
    };
    AdalService.prototype.info = function (message) {
        this.adalContext.info(message);
    };
    AdalService.prototype.verbose = function (message) {
        this.adalContext.verbose(message);
    };
    AdalService.prototype.GetResourceForEndpoint = function (url) {
        return this.adalContext.getResourceForEndpoint(url);
    };
    AdalService.prototype.refreshDataFromCache = function () {
        this.updateDataFromCache(this.adalContext.config.loginResource);
    };
    AdalService.prototype.updateDataFromCache = function (resource) {
        var token = this.adalContext.getCachedToken(resource);
        this.oauthData.isAuthenticated = token !== null && token.length > 0;
        var user = this.adalContext.getCachedUser() || { userName: '', profile: undefined };
        if (user) {
            this.oauthData.userName = user.userName;
            this.oauthData.profile = user.profile;
            this.oauthData.loginError = this.adalContext.getLoginError();
        }
        else {
            this.oauthData.userName = '';
            this.oauthData.profile = {};
            this.oauthData.loginError = '';
        }
    };
    ;
    return AdalService;
}());
AdalService = __decorate([
    core_1.Injectable()
], AdalService);
exports.AdalService = AdalService;

//# sourceMappingURL=adal.service.js.map
