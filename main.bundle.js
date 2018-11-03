webpackJsonp(["main"],{

/***/ "../../../../../src lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_shared/application-enums.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EditMode */
var EditMode;
(function (EditMode) {
    EditMode[EditMode["Read"] = 1] = "Read";
    EditMode[EditMode["Edit"] = 2] = "Edit";
    EditMode[EditMode["New"] = 3] = "New";
})(EditMode || (EditMode = {}));
//# sourceMappingURL=application-enums.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/application-state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationState; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_entity_state__ = __webpack_require__("../../../../../src/app/_shared/data-entity-state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__("../../../../../src/app/_shared/util.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApplicationState = ApplicationState_1 = (function () {
    function ApplicationState(diag, applicationSettingService) {
        var _this = this;
        this.diag = diag;
        this.applicationSettingService = applicationSettingService;
        this._sessionKey = 'configuration_session_key';
        this._userKey = 'logged_in_user_key';
        this._selectedProgramKey = 'selected_program_key';
        this._orderEditKey = "order_edit_key";
        this._authKey = 'authorization_token_key';
        this._choiceSysNames = ["ChoiceGroup", "ReferenceChoiceGroup"];
        this._configuration$ = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["BehaviorSubject"](this.configuration);
        this.onResetConfiguration = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onResetChildrenConfiguration = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onConfigurationChanged = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.configuration$ = this._configuration$.asObservable();
        this.settings = {};
        this.appSettings$ = this.applicationSettingService.getApplicationSettings$().publishLast().refCount();
        var sessionUser = JSON.parse(sessionStorage.getItem(this._userKey));
        var setAnonymousUser = !sessionUser;
        this._currentUser = !setAnonymousUser ? sessionUser :
            {
                // this is a bit of a workaround.
                UserName: 'anonymous',
                Email: '',
                IsAdmin: false,
                Roles: ['guest'],
                PriceLevel: -1,
                DefaultPriceLevel: -1,
                DealerID: null,
                DefaultDealerID: null,
                Dealer: null,
                DealerCodes: []
            };
        this.applicationSettingService
            .applicationSetting$
            .filter(function (setting) { return setting !== null; })
            .subscribe(function (setting) {
            _this.anonymousUser = {
                UserName: 'anonymous',
                Email: '',
                IsAdmin: false,
                Roles: ['guest'],
                PriceLevel: +setting['DefaultPriceLevel'],
                DefaultPriceLevel: +setting['DefaultPriceLevel'],
                DealerID: null,
                DefaultDealerID: null,
                Dealer: null,
                DealerCodes: []
            };
            if (!!setting['profile']) {
                _this._currentUser = JSON.parse(setting['profile']);
                sessionStorage.setItem(_this._userKey, setting['profile']);
                sessionStorage.setItem(_this._authKey, setting['access_token']);
                sessionStorage.setItem('expire_in', setting['expire_in']);
            }
            else if (setAnonymousUser) {
                _this._currentUser = _this.anonymousUser;
            }
        });
        this.applicationSettingService.getApplicationSettings();
        this.configuration = this.configuration || Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createConfiguration"])();
    }
    Object.defineProperty(ApplicationState.prototype, "CurrentUser", {
        get: function () {
            return this._currentUser;
        },
        set: function (user) {
            this._currentUser = user;
            sessionStorage.setItem(this._userKey, JSON.stringify(this._currentUser));
        },
        enumerable: true,
        configurable: true
    });
    ApplicationState.prototype.resetCurrentUser = function () {
        this.CurrentUser = this.anonymousUser;
        this.selectedProgram = null;
        this.editOrder = null;
    };
    ApplicationState.prototype.setImpersonation = function (priceLevel, dealerID, impersonationName) {
        var currentUser = this.CurrentUser;
        currentUser.PriceLevel = priceLevel;
        currentUser.DealerID = dealerID;
        currentUser.ImpersonationName = impersonationName;
        this.selectedProgram = null;
        this.CurrentUser = currentUser;
        // must reset configuration pricing
        this.udpateConfigurationPricing(this._rootSpecification);
    };
    ApplicationState.prototype.resetImpersonation = function () {
        if (this.anonymousUser) {
            this.setImpersonation(this.CurrentUser.DefaultPriceLevel, this.CurrentUser.DefaultDealerID, null);
        }
    };
    Object.defineProperty(ApplicationState.prototype, "selectedProgram", {
        get: function () {
            var program = sessionStorage.getItem(this._selectedProgramKey);
            return program ? JSON.parse(program) : null;
        },
        set: function (program) {
            if (program) {
                sessionStorage.setItem(this._selectedProgramKey, JSON.stringify(program));
            }
            else {
                sessionStorage.removeItem(this._selectedProgramKey);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationState.prototype, "configuration", {
        get: function () {
            //let configuration = sessionStorage.getItem(this._sessionKey)
            //return configuration ? JSON.parse(configuration) : null
            return this._configuration;
        },
        set: function (configuration) {
            //let val = !!configuration ? JSON.stringify(createTrimedConfiguration(configuration)) : JSON.stringify(createTrimedConfiguration(createConfiguration()))
            //sessionStorage.removeItem(this._sessionKey)
            //sessionStorage.setItem(this._sessionKey, val)
            //this._configurationChangedSource.next(this.configuration)
            this._configuration = configuration;
            this._configuration$.next(this.configuration);
            this.onConfigurationChanged.emit(configuration);
        },
        enumerable: true,
        configurable: true
    });
    ApplicationState.prototype.cacheConfiguration = function () {
        var val = !!this.configuration ? JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createTrimedConfiguration"])(this.configuration)) : JSON.stringify(Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createTrimedConfiguration"])(Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createConfiguration"])()));
        sessionStorage.removeItem(this._sessionKey);
        sessionStorage.setItem(this._sessionKey, val);
    };
    ApplicationState.prototype.getCacheConfiguration = function () {
        var configuration = sessionStorage.getItem(this._sessionKey);
        return configuration ? JSON.parse(configuration) : null;
    };
    Object.defineProperty(ApplicationState.prototype, "editOrder", {
        get: function () {
            var program = sessionStorage.getItem(this._orderEditKey);
            return program ? JSON.parse(program) : null;
        },
        set: function (order) {
            if (order) {
                sessionStorage.setItem(this._orderEditKey, JSON.stringify(order));
            }
            else {
                sessionStorage.removeItem(this._orderEditKey);
            }
        },
        enumerable: true,
        configurable: true
    });
    ApplicationState.prototype.resetConfiguration = function () {
        sessionStorage.removeItem(this._sessionKey);
        this.onResetConfiguration.emit(null);
    };
    ApplicationState.prototype.addRootConfiguration = function (specification) {
        this.diag.logVerbose('Adding root Configuration', ApplicationState_1.name + ".addRootConfiguration()");
        //this.configuration = this.createConfiguration(specification.ID, specification.DisplayName, specification.ID, specification.DisplayName, null)
        this._rootSpecification = specification;
        this.configuration = this.createConfigWithDefaults(specification);
        this.configuration.RootSpecificationPrice = specification ? specification.Pricing[this.CurrentUser.PriceLevel] : this.configuration.RootSpecificationPrice;
        // set default configurations
    };
    ApplicationState.prototype.updateChoice = function (parentSpecification, choice, selected) {
        var rootConfig = this.configuration;
        var choiceConfig = rootConfig.Items.find(function (c) { return c.KeySpecificationID === choice.ID; });
        if (!choiceConfig) {
            choiceConfig = Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createConfigurationItem"])(choice, selected, rootConfig, this.CurrentUser.UserName, this.CurrentUser.UserName);
            choiceConfig.SortOrder = choice.Order;
            rootConfig.Items.push(choiceConfig);
        }
        if (choice.Selected) {
            choiceConfig.State = __WEBPACK_IMPORTED_MODULE_2__data_entity_state__["a" /* DataEntityState */].Modified;
            choiceConfig.ValueSpecificationID = selected.ID;
            choiceConfig.ValueDisplayName = selected.DisplayName;
            choiceConfig.ValueSpecification = selected;
            choiceConfig.SortOrder = choice.Order;
            choiceConfig.Price = selected.Pricing ? selected.Pricing[this.CurrentUser.PriceLevel] : 0;
        }
        else {
            // instead of filtering the choice item out first look for any children of he choice and find the default
            // and set it, if not then perform the filter.
            var defaultChild = choice.Children.find(function (c) { return !!c.Metadata["ui.designer.default"]; });
            if (defaultChild && defaultChild.Metadata["ui.designer.default"].toLowerCase() === "true") {
                choiceConfig.State = __WEBPACK_IMPORTED_MODULE_2__data_entity_state__["a" /* DataEntityState */].Modified;
                choiceConfig.ValueSpecificationID = defaultChild.ID;
                choiceConfig.ValueDisplayName = defaultChild.DisplayName;
                choiceConfig.SortOrder = choice.Order;
                choiceConfig.Price = defaultChild.Pricing[this.CurrentUser.PriceLevel] || 0;
            }
            else {
                rootConfig.Items = rootConfig.Items.filter(function (c) { return c !== choiceConfig; });
            }
        }
        choiceConfig.ValueData = selected.Metadata;
        this.sortChildren(rootConfig);
        this.configuration = rootConfig;
        return rootConfig;
    };
    ApplicationState.prototype.updateMultiChoice = function (parentSpecification, choice, selection, attributeData) {
        var rootConfig = this.configuration;
        this.diag.logInformation((selection.Selected ? 'Added' : 'Removed') + " '" + selection.DisplayName + "' " + (selection.Selected ? 'to' : 'from') + " '" + choice.DisplayName + "'", ApplicationState_1.name);
        var childConfig = rootConfig.Items.find(function (child) { return child.KeySpecificationID === selection.ID; });
        if (selection.Selected) {
            if (!childConfig) {
                childConfig = Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createConfigurationItem"])(choice, selection, rootConfig, this.CurrentUser.UserName, this.CurrentUser.UserName);
                childConfig.InputValue = JSON.stringify(attributeData);
                childConfig.State = __WEBPACK_IMPORTED_MODULE_2__data_entity_state__["a" /* DataEntityState */].Added;
                childConfig.SortOrder = choice.Order;
                rootConfig.Items.push(childConfig);
            }
            else {
                childConfig.State = __WEBPACK_IMPORTED_MODULE_2__data_entity_state__["a" /* DataEntityState */].Unchanged;
            }
            childConfig.ValueData = selection.Metadata;
            childConfig.Price = selection.Pricing ? selection.Pricing[this.CurrentUser.PriceLevel] : 0;
        }
        else {
            if (childConfig && childConfig.ID > 0) {
                childConfig.State = __WEBPACK_IMPORTED_MODULE_2__data_entity_state__["a" /* DataEntityState */].Deleted;
            }
            else {
                rootConfig.Items = rootConfig.Items.filter(function (child) { return child.ValueSpecificationID !== selection.ID; });
            }
        }
        this.sortChildren(rootConfig);
        this.configuration = rootConfig;
        return rootConfig;
    };
    ApplicationState.prototype.resetConfigurationChildren = function (keySpecificationID) {
        var _this = this;
        if (this._rootSpecification) {
            var flatSpec = Object(__WEBPACK_IMPORTED_MODULE_5__util__["b" /* flattenArray */])(this._rootSpecification, function (s) { return s.Children; });
            var keySpec = flatSpec.find(function (s) { return s.ID === keySpecificationID; });
            if (keySpec && keySpec.Children) {
                keySpec.Children.forEach(function (child) {
                    var matchingConfigItem = _this.configuration.Items.find(function (ci) { return ci.KeySpecificationID === child.ID; });
                    if (matchingConfigItem) {
                        _this.configuration.Items.splice(_this.configuration.Items.indexOf(matchingConfigItem), 1);
                    }
                });
            }
        }
        this._configuration$.next(this.configuration);
        this.onConfigurationChanged.emit(this.configuration);
        this.onResetChildrenConfiguration.emit(null);
    };
    ApplicationState.prototype.udpateConfigurationPricing = function (rootSpecification) {
        var _this = this;
        if (!this.configuration) {
            return;
        }
        var rootConfiguration = this.configuration;
        var specifications = Object(__WEBPACK_IMPORTED_MODULE_5__util__["b" /* flattenArray */])(rootSpecification, function (s) { return s.Children; });
        var configurations = rootConfiguration.Items;
        if (rootSpecification) {
            rootConfiguration.RootSpecificationPrice = rootSpecification.Pricing[this.CurrentUser.PriceLevel];
        }
        configurations.forEach(function (c) {
            var foundSpec = specifications.find(function (s) { return s.ID === c.ValueSpecificationID; });
            c.Price = foundSpec ? foundSpec.Pricing[_this.CurrentUser.PriceLevel] : c.ValueSpecification.Pricing[_this.CurrentUser.PriceLevel];
        });
        if (rootSpecification !== this._rootSpecification) {
            this._rootSpecification = rootSpecification;
        }
        this.configuration = rootConfiguration;
    };
    ApplicationState.prototype.recursiveAction = function (item, childSelector, condition, action) {
        var _this = this;
        childSelector(item)
            .filter(condition)
            .forEach(function (child) {
            action(child);
            _this.recursiveAction(child, childSelector, condition, action);
        });
        return item;
    };
    ApplicationState.prototype.recursiveFunc = function (item, childSelector, condition, action) {
        var _this = this;
        if (condition(item)) {
            action(item);
        }
        childSelector(item)
            .forEach(function (child) {
            _this.recursiveFunc(child, childSelector, condition, action);
        });
    };
    ApplicationState.prototype.sortChildren = function (config) {
        config.Items.sort(function (a, b) {
            return a.SortOrder > b.SortOrder ? 1
                : a.SortOrder < b.SortOrder ? -1
                    : 0;
        });
    };
    ApplicationState.prototype.createConfigWithDefaults = function (rootSpecification) {
        var _this = this;
        var rootConfig = Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createConfiguration"])(rootSpecification, this.CurrentUser.UserName, this.CurrentUser.UserName);
        rootConfig.RootSpecificationPrice = rootSpecification.Pricing ? rootSpecification.Pricing[this.CurrentUser.PriceLevel] : 0;
        var children = Object(__WEBPACK_IMPORTED_MODULE_5__util__["b" /* flattenArray */])(rootSpecification, function (fc) { return fc.Children; });
        this.recursiveFunc(rootSpecification, function (s) { return s.Children; }, function (s) { return !!s.Metadata["ui.designer.default"] && s.Metadata["ui.designer.default"].toLowerCase() === "true"; }, function (s) {
            var parentSpec = children.find(function (p) { return p.ID === s.ParentID; });
            var defaultConfig = Object(__WEBPACK_IMPORTED_MODULE_1__configuration__["createConfigurationItem"])(parentSpec, s, rootConfig, _this.CurrentUser.UserName, _this.CurrentUser.UserName);
            defaultConfig.ValueData = s.Metadata;
            rootConfig.Items.push(defaultConfig);
        });
        return rootConfig;
    };
    return ApplicationState;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], ApplicationState.prototype, "onResetConfiguration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _b || Object)
], ApplicationState.prototype, "onResetChildrenConfiguration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _c || Object)
], ApplicationState.prototype, "onConfigurationChanged", void 0);
ApplicationState = ApplicationState_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_diagnostic_service__["a" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_diagnostic_service__["a" /* DiagnosticService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__application_setting__["ApplicationSettingService"]) === "function" && _e || Object])
], ApplicationState);

var ApplicationState_1, _a, _b, _c, _d, _e;
//# sourceMappingURL=application-state.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/data-entity-state.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataEntityState; });
var DataEntityState;
(function (DataEntityState) {
    DataEntityState[DataEntityState["Detached"] = 1] = "Detached";
    DataEntityState[DataEntityState["Unchanged"] = 2] = "Unchanged";
    DataEntityState[DataEntityState["Added"] = 4] = "Added";
    DataEntityState[DataEntityState["Deleted"] = 8] = "Deleted";
    DataEntityState[DataEntityState["Modified"] = 16] = "Modified";
})(DataEntityState || (DataEntityState = {}));
//# sourceMappingURL=data-entity-state.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/default-request-options.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultRequestOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DefaultRequestOptions = (function (_super) {
    __extends(DefaultRequestOptions, _super);
    function DefaultRequestOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        });
        return _this;
    }
    Object.defineProperty(DefaultRequestOptions.prototype, "headers", {
        get: function () {
            if (sessionStorage.getItem("authorization_token_key") && !this._headers.has("Authorization")) {
                this._headers.append('Authorization', "Bearer " + sessionStorage.getItem("authorization_token_key"));
            }
            else if (!sessionStorage.getItem("authorization_token_key")) {
                this._headers.delete("Authorization");
            }
            return this._headers;
        },
        set: function (val) {
            this._headers = val;
        },
        enumerable: true,
        configurable: true
    });
    return DefaultRequestOptions;
}(__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* BaseRequestOptions */]));
DefaultRequestOptions = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], DefaultRequestOptions);

//# sourceMappingURL=default-request-options.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/diagnostic-information.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiagnosticLevel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DiagnosticSeverity; });
var DiagnosticLevel;
(function (DiagnosticLevel) {
    DiagnosticLevel[DiagnosticLevel["Verbose"] = 1] = "Verbose";
    DiagnosticLevel[DiagnosticLevel["Informational"] = 2] = "Informational";
    DiagnosticLevel[DiagnosticLevel["Warning"] = 3] = "Warning";
    DiagnosticLevel[DiagnosticLevel["Error"] = 4] = "Error";
})(DiagnosticLevel || (DiagnosticLevel = {}));
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
    DiagnosticSeverity[DiagnosticSeverity["Low"] = 1] = "Low";
    DiagnosticSeverity[DiagnosticSeverity["Normal"] = 2] = "Normal";
    DiagnosticSeverity[DiagnosticSeverity["High"] = 3] = "High";
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
//# sourceMappingURL=diagnostic-information.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__services_diagnostic_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_state__ = __webpack_require__("../../../../../src/app/_shared/application-state.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__application_state__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__("../../../../../src/app/_shared/util.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_2__util__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__util__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__diagnostic_information__ = __webpack_require__("../../../../../src/app/_shared/diagnostic-information.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_enums__ = __webpack_require__("../../../../../src/app/_shared/application-enums.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__default_request_options__ = __webpack_require__("../../../../../src/app/_shared/default-request-options.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_5__default_request_options__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__data_entity_state__ = __webpack_require__("../../../../../src/app/_shared/data-entity-state.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__data_entity_state__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pipes_keys_pipe__ = __webpack_require__("../../../../../src/app/_shared/pipes/keys.pipe.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_7__pipes_keys_pipe__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_calculation_service__ = __webpack_require__("../../../../../src/app/_shared/services/calculation.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_8__services_calculation_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_9__services_base_proxy_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_paging_service__ = __webpack_require__("../../../../../src/app/_shared/services/paging.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_10__services_paging_service__["a"]; });











//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/pipes/keys.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'keys' })
], KeysPipe);

//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/services/base-proxy.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseProxy; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);

var BaseProxy = (function () {
    function BaseProxy(_http, _diag, hostUrl, baseUrl) {
        if (baseUrl === void 0) { baseUrl = ""; }
        this._http = _http;
        this._diag = _diag;
        var hostUrl$ = (typeof (hostUrl) === 'string') ? __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].of(hostUrl) : hostUrl;
        this._apiHost$ = hostUrl$;
        this._baseUrl$ = this
            ._apiHost$
            .map(function (hostUrl) { return "" + hostUrl + baseUrl; });
    }
    BaseProxy.prototype.httpGet = function (relativeUrl, responseMapper) {
        var _this = this;
        return this
            ._baseUrl$
            .map(function (baseUrl) { return "" + baseUrl + relativeUrl; })
            .do(function (url) { return _this._diag.logVerbose("Getting data from: '" + url + "'.", BaseProxy.name + ".httpGet()"); })
            .switchMap(function (url) {
            return _this._http
                .get(url)
                .map(function (res) { return _this._validateReponseCode(res); })
                .map(responseMapper)
                .catch(function (msg) { return _this.handleGetError(msg); });
        });
    };
    BaseProxy.prototype.httpPut = function (relativeUrl, body, responseMapper) {
        var _this = this;
        return this
            ._baseUrl$
            .map(function (baseUrl) { return "" + baseUrl + relativeUrl; })
            .do(function (url) { return _this._diag.logVerbose("Create data at: '" + url + "'.", BaseProxy.name + ".httpPut()"); })
            .switchMap(function (url) {
            return _this._http
                .put(url, body)
                .map(function (res) { return _this._validateReponseCode(res); })
                .map(responseMapper)
                .catch(function (msg) { return _this.handlePutError(msg); });
        });
    };
    BaseProxy.prototype.httpPost = function (relativeUrl, body, responseMapper) {
        var _this = this;
        return this
            ._baseUrl$
            .map(function (baseUrl) { return "" + baseUrl + relativeUrl; })
            .do(function (url) { return _this._diag.logVerbose("Update data at: '" + url + "'.", BaseProxy.name + ".httpPost()"); })
            .switchMap(function (url) {
            return _this._http
                .post(url, body)
                .map(function (res) { return _this._validateReponseCode(res); })
                .map(responseMapper)
                .catch(function (msg) { return _this.handlePostError(msg); });
        });
    };
    BaseProxy.prototype.httpDelete = function (relativeUrl, responseMapper) {
        var _this = this;
        return this
            ._baseUrl$
            .map(function (baseUrl) { return "" + baseUrl + relativeUrl; })
            .do(function (url) { return _this._diag.logVerbose("Delete data at: '" + url + "'.", BaseProxy.name + ".httpDelete()"); })
            .switchMap(function (url) {
            return _this._http
                .delete(url)
                .map(function (res) { return _this._validateReponseCode(res); })
                .map(responseMapper)
                .catch(function (msg) { return _this.handleDeleteError(msg); });
        });
    };
    BaseProxy.prototype.httpPatch = function (relativeUrl, body, responseMapper) {
        var _this = this;
        return this
            ._baseUrl$
            .map(function (baseUrl) { return "" + baseUrl + relativeUrl; })
            .do(function (url) { return _this._diag.logVerbose("Patch data at: '" + url + "'.", BaseProxy.name + ".httpPatch()"); })
            .switchMap(function (url) {
            return _this._http
                .patch(url, body)
                .map(function (res) { return _this._validateReponseCode(res); })
                .map(responseMapper)
                .catch(function (msg) { return _this.handlePatchError(msg); });
        });
    };
    BaseProxy.prototype._validateReponseCode = function (response) {
        if (response.status < 200 || response.status >= 300) {
            this._diag.logError("Error Response Status (" + response.status + ") while requesting '" + response.url + "'.", BaseProxy.name + "._validateReponseCode()");
            throw new Error("Error Response Status (" + response.status + ") while requesting '" + response.url + "'.");
        }
        return response;
    };
    BaseProxy.prototype.handleGetError = function (error) {
        var errMsg = error.message || 'Server error';
        this._diag.logError(errMsg, BaseProxy.name + ".handleGetError()");
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(errMsg);
    };
    BaseProxy.prototype.handlePutError = function (error) {
        var errMsg = error.message || 'Server error';
        this._diag.logError(errMsg, BaseProxy.name + ".handlePutError()");
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(errMsg);
    };
    BaseProxy.prototype.handlePostError = function (error) {
        var errMsg = error.message || 'Server error';
        this._diag.logError(errMsg, BaseProxy.name + ".handlePostError()");
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(errMsg);
    };
    BaseProxy.prototype.handleDeleteError = function (error) {
        var errMsg = error.message || 'Server error';
        this._diag.logError(errMsg, BaseProxy.name + ".handleDeleteError()");
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(errMsg);
    };
    BaseProxy.prototype.handlePatchError = function (error) {
        var errMsg = error.message || 'Server error';
        this._diag.logError(errMsg, BaseProxy.name + ".handlePatchError()");
        return __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return BaseProxy;
}());

//# sourceMappingURL=base-proxy.service.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/services/calculation.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export TotalSummary */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CalculationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__surcharge__ = __webpack_require__("../../../../../src/app/surcharge/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_state__ = __webpack_require__("../../../../../src/app/_shared/application-state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dealer__ = __webpack_require__("../../../../../src/app/dealer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__configuration_mb_helpers__ = __webpack_require__("../../../../../src/app/configuration/mb-helpers.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var TotalSummary = (function () {
    function TotalSummary() {
    }
    return TotalSummary;
}());

var CalculationService = CalculationService_1 = (function () {
    function CalculationService(surchargeService, appState, toastr, dealerService, auth, diag) {
        var _this = this;
        this.surchargeService = surchargeService;
        this.appState = appState;
        this.toastr = toastr;
        this.dealerService = dealerService;
        this.auth = auth;
        this.diag = diag;
        this.onTotalChangedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onDealerLoaded = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.metadataKey = 'domain.mb.color.texture';
        this.discountMetadataKey = 'domain.mb.rebate.key';
        this.surchargeKey = 'Surcharge';
        this.serviceName = CalculationService_1.name;
        this.loadSurchargeTypes();
        this.CurrTotalSummary = new TotalSummary();
        this.appState
            .onConfigurationChanged
            .subscribe(function (c) { return _this.calculateTotal(c); }, function (error) {
            _this.diag.logError(error.toString(), _this.serviceName + ".constructor()");
            _this.toastr.error('Error while calculating totals.', 'Error');
        });
        if (auth.isLoggedIn()) {
            var dealerSubscription_1 = dealerService
                .getDealers()
                .subscribe(function (dealers) { return _this.DealerList = dealers; }, function (error) {
                _this.diag.logError(error.toString(), _this.serviceName + ".constructor()");
                _this.toastr.error('Error loading system data', 'Error');
            }, function () { return dealerSubscription_1.unsubscribe(); });
        }
    }
    CalculationService.prototype.calculateTotal = function (configuration) {
        var _this = this;
        var colorAreas = configuration.Items.filter(function (c) { return c.ValueData && c.ValueData[_this.metadataKey]; });
        var groupedData = _.groupBy(colorAreas, function (c) { return c.ValueData[_this.metadataKey]; });
        var deckSwimstepAreas = colorAreas.filter(function (ci) { return ci.KeyDisplayName.toLowerCase() === "gel 1" || ci.KeyDisplayName.toLowerCase() === "swimstep"; });
        var groupedDeckSwimstepData = _.groupBy(deckSwimstepAreas, function (c) { return c.ValueData[_this.metadataKey]; });
        if (this.surchargeTypes) {
            var data = this.surchargeTypes
                .map(function (surchargeType) {
                var surchargeClone = _.clone(surchargeType);
                surchargeClone.ItemCount = (surchargeClone.SystemName === 'StdDealerDeckSwimstepMetallicGelcoatSurcharge' ||
                    surchargeClone.SystemName === 'DeckSwimstepMetallicGelcoatSurcharge' ||
                    surchargeClone.SystemName === 'StdDealerDeckSwimstepPearlGelcoatSurcharge' ||
                    surchargeClone.SystemName === 'DeckSwimstepPearlGelcoatSurcharge')
                    ? surchargeType
                        .Code
                        .split(',')
                        .map(function (ci) { return _.uniqBy(groupedDeckSwimstepData[ci], 'ValueDisplayName').length; })
                        .reduce(function (p, c) { return p + c; })
                    : surchargeType
                        .Code
                        .split(',')
                        .map(function (c) { return _.uniqBy(groupedData[c], 'ValueDisplayName').length; })
                        .reduce(function (p, c) { return p + c; });
                return surchargeClone;
            });
            this.surchargeService
                .calcSurcharges(data)
                .do(function (orderSurcharges) { return _this.CurrGelUpcharge = orderSurcharges; })
                .map(function (orderSurcharges) { return (orderSurcharges ? _.sum(orderSurcharges.map(function (os) { return os.Amount; })) : 0); })
                .map(function (surchargeTotal) { return _this.createCalculateOrderTotal(_this.appState.editOrder, configuration.RootSpecificationPrice, _.sum(configuration.Items.filter(__WEBPACK_IMPORTED_MODULE_8__configuration_mb_helpers__["a" /* notTrailerFilter */]).map(function (c) { return c.Price || 0; })) + surchargeTotal, _this.appState.editOrder ? _.sum(_this.appState.editOrder.OrderItems.map(function (oi) { return oi.Amount; })) : 0, _.sum(configuration.Items.filter(__WEBPACK_IMPORTED_MODULE_8__configuration_mb_helpers__["b" /* trailerFilter */]).map(function (c) { return c.Price || 0; })), _this.getDealerDiscount(configuration), _this.getFactoryIncentive()); })
                .do(function (totalSummary) { return _this.CurrTotalSummary = totalSummary; })
                .subscribe(function (totalSummary) { return _this.onTotalChangedEvent.emit(totalSummary); });
        }
    };
    CalculationService.prototype.createCalculateOrderTotal = function (order, basePrice, optionsTotal, orderItemsTotal, trailerTotal, dealerDiscountsTotal, factoryIncentiveTotal) {
        var totalSummary = new TotalSummary();
        totalSummary.BasePrice = basePrice;
        totalSummary.OptionsTotal = optionsTotal;
        totalSummary.OrderItemsTotal = orderItemsTotal;
        totalSummary.DealerDiscount = dealerDiscountsTotal;
        totalSummary.BoatTotal = totalSummary.BasePrice - totalSummary.DealerDiscount;
        totalSummary.Trailer = trailerTotal;
        totalSummary.Freight = order ? order.Freight : 0;
        totalSummary.SubTotal =
            totalSummary.BoatTotal +
                totalSummary.Trailer +
                totalSummary.Freight +
                totalSummary.OptionsTotal +
                totalSummary.OrderItemsTotal;
        totalSummary.Surcharge = +Number(totalSummary.SubTotal * this.getDealerSurcharge()).toFixed(2);
        totalSummary.FactoryIncentive = factoryIncentiveTotal;
        totalSummary.Total = totalSummary.SubTotal + totalSummary.Surcharge - totalSummary.FactoryIncentive;
        return totalSummary;
    };
    CalculationService.prototype.calculateOrderTotal = function (order) {
        this.CurrTotalSummary = this.createCalculateOrderTotal(order, order.DealerBoatPrice, order.OptionsTotal, _.sum(order.OrderItems.map(function (oi) { return oi.Amount; })), order.Trailer, _.sum(order.OrderDiscounts.filter(function (d) { return d.DiscountTypeID; }).map(function (d) { return d.DiscountAmount; })), this.getOrderFactoryIncentive(order));
    };
    CalculationService.prototype.getDealerSurcharge = function () {
        var _this = this;
        var dealer = this.DealerList ? this.DealerList.find(function (d) { return d.ID === _this.appState.CurrentUser.DealerID; }) : null;
        return dealer ? +dealer.Settings[this.surchargeKey] : 0;
    };
    CalculationService.prototype.getFactoryIncentive = function () {
        return !this.appState.editOrder || !this.appState.editOrder.OrderDiscounts ? 0 : this.getOrderFactoryIncentive(this.appState.editOrder);
    };
    CalculationService.prototype.getOrderFactoryIncentive = function (order) {
        return _.sum(order
            .OrderDiscounts
            .filter(function (d) { return !d.DiscountTypeID; })
            .map(function (d) { return d.DiscountAmount; }));
    };
    CalculationService.prototype.getDealerDiscount = function (rootConfiguration) {
        var _this = this;
        if (this.appState.editOrder) {
            return _.sum(this.appState
                .editOrder
                .OrderDiscounts
                .filter(function (d) { return d.DiscountTypeID; })
                .map(function (d) { return d.DiscountAmount; }));
        }
        var dealer = this.DealerList ? this.DealerList.find(function (d) { return d.ID === _this.appState.CurrentUser.DealerID; }) : null;
        return (this.appState.selectedProgram &&
            dealer &&
            dealer.DealerDiscounts &&
            dealer.DealerDiscounts[this.appState.selectedProgram.DiscountTypeName])
            ? dealer.DealerDiscounts[this.appState.selectedProgram.DiscountTypeName][rootConfiguration.RootSpecification.Metadata[this.discountMetadataKey]]
            : 0;
    };
    CalculationService.prototype.loadSurchargeTypes = function () {
        var _this = this;
        var tmpSubscription = this.surchargeService
            .getSurchargeTypes()
            .subscribe(function (surchargeTypes) { return _this.surchargeTypes = surchargeTypes; }, function () { return _this.toastr.error('Error while loading surchage types.', 'Error'); }, function () { return tmpSubscription.unsubscribe(); });
    };
    return CalculationService;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CalculationService.prototype, "onTotalChangedEvent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], CalculationService.prototype, "onDealerLoaded", void 0);
CalculationService = CalculationService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__surcharge__["SurchargeService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__surcharge__["SurchargeService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__application_state__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__application_state__["a" /* ApplicationState */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__dealer__["DealerClientService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__dealer__["DealerClientService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__diagnostic_service__["a" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__diagnostic_service__["a" /* DiagnosticService */]) === "function" && _f || Object])
], CalculationService);

var CalculationService_1, _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=calculation.service.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/services/diagnostic.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiagnosticService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__ = __webpack_require__("../../../../../src/app/_shared/diagnostic-information.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DiagnosticService = (function () {
    function DiagnosticService() {
        this.eventLog = [];
    }
    DiagnosticService.prototype.logError = function (detail, scope, severity) {
        if (scope === void 0) { scope = ""; }
        if (severity === void 0) { severity = __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["b" /* DiagnosticSeverity */].Normal; }
        console.error(detail + (" /n scope: " + scope));
        this.eventLog.push({
            detail: detail,
            level: __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["a" /* DiagnosticLevel */].Error,
            severity: severity,
            date: new Date(),
            scope: scope
        });
    };
    DiagnosticService.prototype.logInformation = function (detail, scope, severity) {
        if (scope === void 0) { scope = ""; }
        if (severity === void 0) { severity = __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["b" /* DiagnosticSeverity */].Normal; }
        console.info(detail + (" /n scope: " + scope));
        this.eventLog.push({
            detail: detail,
            level: __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["a" /* DiagnosticLevel */].Informational,
            severity: severity,
            date: new Date(),
            scope: scope
        });
    };
    DiagnosticService.prototype.logWarning = function (detail, scope, severity) {
        if (scope === void 0) { scope = ""; }
        if (severity === void 0) { severity = __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["b" /* DiagnosticSeverity */].Normal; }
        console.warn(detail + (" /n scope: " + scope));
        this.eventLog.push({
            detail: detail,
            level: __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["a" /* DiagnosticLevel */].Warning,
            severity: severity,
            date: new Date(),
            scope: scope
        });
    };
    DiagnosticService.prototype.logVerbose = function (detail, scope, severity) {
        if (scope === void 0) { scope = ""; }
        if (severity === void 0) { severity = __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["b" /* DiagnosticSeverity */].Normal; }
        console.log(detail + (" /n scope: " + scope));
        this.eventLog.push({
            detail: detail,
            level: __WEBPACK_IMPORTED_MODULE_1__diagnostic_information__["a" /* DiagnosticLevel */].Verbose,
            severity: severity,
            date: new Date(),
            scope: scope
        });
    };
    return DiagnosticService;
}());
DiagnosticService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], DiagnosticService);

//# sourceMappingURL=diagnostic.service.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/services/paging.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PagingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PagingService = (function () {
    function PagingService(hasNext, getPage, itemMap, pageInfoMap, initialPage) {
        this.hasNext = hasNext;
        this.getPage = getPage;
        this.itemMap = itemMap;
        this.pageInfoMap = pageInfoMap;
        this._hasNext = false;
        this.hasNextSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](this._hasNext);
        this.hasNext$ = this.hasNextSubject.asObservable();
        this.itemsSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.items$ = this
            .itemsSubject
            .asObservable()
            .scan(function (prev, curr) { return prev.concat(curr); }, []);
        initialPage()
            .first()
            .subscribe(this.receivePage.bind(this), function () { return console.error('An error occurred while trying to get initial page.'); }, function () { });
    }
    PagingService.prototype.getNext = function () {
        var next$ = (this._hasNext)
            ? this.getPage(this._pageInfo)
            : __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].empty();
        next$.subscribe(this.receivePage.bind(this), function () { return console.error('An error occurred while trying to get page.'); }, function () { });
        return next$;
    };
    PagingService.prototype.receivePage = function (t) {
        var items = this.itemMap(t);
        this._pageInfo = this.pageInfoMap(t);
        this.itemsSubject.next(items);
        this._hasNext = this.hasNext(this._pageInfo);
        this.hasNextSubject.next(this._hasNext);
    };
    return PagingService;
}());
PagingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [Function, Function, Function, Function, Function])
], PagingService);

//# sourceMappingURL=paging.service.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/toastr-options.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomOptions; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ng2_toastr__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var CustomOptions = (function (_super) {
    __extends(CustomOptions, _super);
    function CustomOptions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.positionClass = 'toast-bottom-right';
        _this.showCloseButton = true;
        return _this;
    }
    return CustomOptions;
}(__WEBPACK_IMPORTED_MODULE_0_ng2_toastr__["ToastOptions"]));

//# sourceMappingURL=toastr-options.js.map

/***/ }),

/***/ "../../../../../src/app/_shared/util.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = flattenArray;
/* unused harmony export GLOBAL_INPUTS */
/* unused harmony export REG_WEARABLES */
/* unused harmony export REG_MOBILES */
/* unused harmony export REG_TABLETS */
/* unused harmony export REG_SMARTS_TV */
/* unused harmony export REG_GAME_DEVICES */
/* unused harmony export REG_BROWSERS */
/* unused harmony export REG_OS */
/* unused harmony export REG_SORT_NAMES */
/* unused harmony export WINDOWS_OS_VERSION */
/* unused harmony export MAC_OS_VERSION */
/* unused harmony export LINUX_OS */
/* unused harmony export REG_BOTS */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResponsiveHelper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);


function flattenArray(entity, childSelector) {
    var result = [];
    if (!entity) {
        return result;
    }
    var children = childSelector(entity);
    if (children.length > 0) {
        result = result.concat(children);
        var manyArr = children.map(function (c) { return flattenArray(c, childSelector); });
        result = result.concat(manyArr.reduce(function (p, c) { return p.concat(c); }));
    }
    return result;
}
var GLOBAL_INPUTS = {
    BOOTSTRAP: ['xs', 'sm', 'md', 'lg', 'xl'],
    DEVICES: ['mobile', 'tablet', 'smarttv', 'desktop'],
    STANDARD: ['iphone', 'ipad', 'android mobile', 'android tablet', 'windows phone'],
    ORIENTATION: ['portrait', 'landscape'],
    BROWSERS: ['chrome', 'firefox', 'ie', 'safari', 'opera'],
    PIXEL_RATIO: ['1x', 'retina', '4k'],
    IE_VERSIONS: ['ie 9', 'ie 10', 'ie 11', 'ie +12']
};
//WEARABLES :: USER AGENTS
var REG_WEARABLES = {
    IWATCH: ''
};
var REG_MOBILES = {
    ANDROID: /(android);?[\s\/]+([\d.]+)?/,
    IPHONE: /(iphone\sos)\s([\d_]+)/,
    WINDOWS_PHONE: /windows phone ([\d.]+)/,
    BLACKBERRY: /(blackBerry).*version\/([\d.]+)/,
    BB10: /(bb10).*version\/([\d.]+)/,
    WEB_OS: /(webos|hpwos)[\s\/]([\d.]+)/,
    IPOD: /(ipod)(.*os\s([\d_]+))?/,
    FIREFOX_OS: /\((?:mobile|tablet); rv:([\d.]+)\).*firefox\/[\d.]+/,
    MOBI: /[^-]mobi/i,
    GENERIC_REG: [/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i, /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i]
};
var REG_TABLETS = {
    IPAD: /(ipad).*os\s([\d_]+)/,
    KINDLE: /kindle|silk|kfapw|kfarwi|kfaswi|kffowi|kfjw|kfmewi|kfot|kfsaw|kfsowi|kftbw|kfthw|kftt|wffowi/i,
    TABLET: /tablet/i,
    PLAYBOOK: [/rim\stablet/i, /playbook/i]
};
var REG_SMARTS_TV = {
    CHROMECAST: /crkey/i,
    APPLE_TV: /appletv/i,
    GOOGLE_TV: /(large screen)|googletv/i,
    PS4: /playstation 4/i,
    XBOX_ONE: /xbox one/i,
    GENERIC_TV: /tv|smarttv|googletv|crkey|Sharp|THOMSON|THOM|Panasonic|Philips|NETTV|Maple_2011|appletv|Humax|Ikea|Loewe|Medion|hbbtv|pov_tv|Airties|netcast.tv|OWB|Grundig|Arcelik/i
};
var REG_GAME_DEVICES = {
    PS4: /playstation 4/i,
    PS3: /playstation 3/i,
    XBOX: /xbox one/i,
    XBOX_ONE: /xbox/i,
    WII_U: /nintendo wiiu/i,
    WII: /nintendo wii/i,
    PS_VITA: /playstation vita/i,
    NINTENDO_3DS: /nintendo 3ds/i,
    PSP: /psp/i,
};
var REG_BROWSERS = {
    CHROME: [/chrome\/([\d.]+)/, /crios\/([\d.]+)/],
    FIREFOX: /firefox|iceweasel|fxios/i,
    WEB_VIEW: /(iphone|ipod|ipad).*applewebkit(?!.*safari)/,
    SAFARI: /version\/([\d.]+)([^s](safari)|[^m]*(mobile)[^S]*(safari))/,
    OPERA: /opera|opr|opios/i,
    IE: [/msie/, /trident/, /edge/],
    MS_EDGE: /edge/,
    SILK: /silk/i,
    YANDEX: /yabrowser/i
};
var REG_OS = {
    WINDOWS: /win\d{2}|windows/,
    IOS: /(ipod|iphone|ipad)/i,
    MAC_OS: /macintosh/i,
    ANDROID: /android/i,
    LINUX: /linux/i,
    FIREFOX_OS: /\((?:mobile|tablet); rv:([\d.]+)\).*firefox\/[\d.]+/,
    CHROME_OS: /cros/,
    WINDOWS_PHONE: /windows phone/i
};
var REG_SORT_NAMES = {
    MOZILLA: /mozilla/,
    CHROME: /chrome/,
    WEBKIT: [/webkit/, /applewebkit/],
    SAFARI: /safari/
};
var WINDOWS_OS_VERSION = {
    WINDOWS_3_11: /win16/,
    WINDOWS_95: /(windows 95|win95|windows_95)/,
    WINDOWS_ME: /(win 9x 4.90|windows ME)/,
    WINDOWS_98: /(windows 98|win98)/,
    WINDOWS_CE: /windows ce/,
    WINDOWS_2000: /(windows nt 5.0|windows 2000)/,
    WINDOWS_XP: /(windows nt 5.1|windows xp)/,
    WINDOWS_SERVER_2003: /windows nt 5.2/,
    WINDOWS_VISTA: /windows nt 6.0|Windows Vista/,
    WINDOWS_7: /(windows 7|windows nt 6.1)/,
    WINDOWS_8_1: /(windows 8.1|windows nt 6.3)/,
    WINDOWS_8: /(windows 8|windows nt 6.2)/,
    WINDOWS_10: /(windows nt 10.0)/,
    WINDOWS_PHONE_7_5: /(windows phone os 7.5)/,
    WINDOWS_PHONE_8_1: /(windows phone 8.1)/,
    WINDOWS_PHONE_10: /(windows phone 10)/,
    WINDOWS_NT_4_0: /(windows nt 4.0|winnt4.0|winnt|windows nt)/
};
//MAC OS VERSION :: USER AGENTS
var MAC_OS_VERSION = {
    MAC_OS: '',
};
var LINUX_OS = {
    DEBIAN: /Debian/i,
    KNOPPIX: /Knoppix/i,
    MINT: /Mint/i,
    UBUNTU: /Ubuntu/i,
    KUBUNTU: /Kubuntu/i,
    XUBUNTU: /Xubuntu/i,
    LUBUNTU: /Lubuntu/i,
    FEDORA: /Fedora/i,
    RED_HAT: /Red Hat/i,
    MANDRIVA: /Mandriva/i,
    GENTOO: /Gentoo/i,
    SABAYON: /Sabayon/i,
    SLACKWARE: /Slackware/i,
    SUSE: /SUSE/i,
    CENT_OS: /CentOS/i,
    BACKTRACK: /BackTrack/i
};
var REG_BOTS = {
    GENERIC_BOT: /bot|googlebot|crawler|spider|robot|crawling/i
};
var ResponsiveHelper = (function () {
    function ResponsiveHelper() {
        var _this = this;
        this._userAgent = window.navigator.userAgent.toLowerCase();
        this.bootStrapObj$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](this._currBootStrapObj);
        this.sizeOperations = function () {
            _this._width = _this.getWidth('window');
            try {
                var breakpoints = {
                    xs: { max: 767 },
                    sm: { min: 768, max: 991 },
                    md: { min: 992, max: 1199 },
                    lg: { min: 1200, max: 1599 },
                    xl: { min: 1600 }
                };
                if (breakpoints.xl.min <= _this._width) {
                    return 'xl';
                }
                else if (breakpoints.lg.max >= _this._width && breakpoints.lg.min <= _this._width) {
                    return 'lg';
                }
                else if (breakpoints.md.max >= _this._width && breakpoints.md.min <= _this._width) {
                    return 'md';
                }
                else if (breakpoints.sm.max >= _this._width && breakpoints.sm.min <= _this._width) {
                    return 'sm';
                }
                else if (breakpoints.xs.max >= _this._width) {
                    return 'xs';
                }
            }
            catch (error) {
                //console.error('size operations error :', error);
            }
            return null;
        };
        this.orientation_device = function () {
            try {
                if (_this.isMobile() || _this.isTablet()) {
                    if (window.innerHeight > window.innerWidth) {
                        return 'portrait';
                    }
                    else {
                        return 'landscape';
                    }
                }
                else if (_this.isSMART() || _this.isDesktop()) {
                    return 'landscape';
                }
                else {
                    return null;
                }
            }
            catch (error) {
                //console.error('pixel ratio :', error);
            }
            return null;
        };
        this._currBootStrapObj = { Size: '', Orientation: '' };
        var resize_observer = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"]
            .fromEvent(window, 'resize')
            .debounceTime(100)
            .defaultIfEmpty()
            .startWith(this.getWidth('window'));
        var orientation_observer = __WEBPACK_IMPORTED_MODULE_0_rxjs_Observable__["Observable"]
            .fromEvent(window, 'orientationchange')
            .defaultIfEmpty()
            .startWith(this.getOrientation());
        this.orientationObserver = orientation_observer.map(this.orientation_device);
        this.elementoObservar = resize_observer.map(this.sizeOperations);
        this.elementoObservar.subscribe(function (size) {
            _this._currBootStrapObj.Size = size;
            _this.bootStrapObj$.next(_this._currBootStrapObj);
            //callback(this._currBootStrapObj)
        });
        this.orientationObserver.subscribe(function (orientation) {
            _this._currBootStrapObj.Orientation = orientation;
            _this.bootStrapObj$.next(_this._currBootStrapObj);
            //callback(this._currBootStrapObj)
        });
    }
    ResponsiveHelper.prototype.getWidth = function (windowName) {
        return window.screen.width;
    };
    ResponsiveHelper.prototype.getOrientation = function () {
        return window.orientation;
    };
    ResponsiveHelper.prototype.isMobile = function () {
        if (REG_MOBILES.GENERIC_REG[0].test(this._userAgent) && this.isTablet() == false ||
            REG_MOBILES.GENERIC_REG[1].test(this._userAgent.substr(0, 4)) && this.isTablet() == false) {
            return true;
        }
        else {
            return false;
        }
    };
    ResponsiveHelper.prototype.isTablet = function () {
        if (REG_TABLETS.IPAD.test(this._userAgent) || REG_TABLETS.KINDLE.test(this._userAgent) || REG_TABLETS.PLAYBOOK[0].test(this._userAgent) || REG_TABLETS.PLAYBOOK[1].test(this._userAgent) || REG_TABLETS.TABLET.test(this._userAgent)) {
            return true;
        }
        else {
            return false;
        }
    };
    ResponsiveHelper.prototype.isSMART = function () {
        if (REG_SMARTS_TV.GENERIC_TV.test(this._userAgent) || REG_SMARTS_TV.PS4.test(this._userAgent) || REG_SMARTS_TV.XBOX_ONE.test(this._userAgent)) {
            return true;
        }
        else {
            return false;
        }
    };
    ResponsiveHelper.prototype.isDesktop = function () {
        if (!this.isMobile() || !this.isTablet() || !this.isSMART()) {
            return true;
        }
        else {
            return false;
        }
    };
    return ResponsiveHelper;
}());

//# sourceMappingURL=util.js.map

/***/ }),

/***/ "../../../../../src/app/account/change-password/change-password.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/account/change-password/change-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container padding-t-2\">\n    <div class=\"row col-md-6 col-md-offset-3\">\n        <div class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\">Change Password</h3>\n            </div>\n            <div class=\"panel-body\">\n                <p></p>\n                <div class=\"text-left\">\n                    <div class=\"form-group\">\n                        <label for=\"password\">Current Password</label>\n                        <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" [(ngModel)]=\"oldPassword\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"newPassword\">New Password</label>\n                        <input type=\"password\" class=\"form-control\" id=\"newPassword\" name=\"newPassword\" [(ngModel)]=\"newPassword\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"confirmPassword\">Confirm Password</label>\n                        <input type=\"password\" class=\"form-control\" id=\"confirmPassword\" name=\"confirmPassword\" [(ngModel)]=\"confirmPassword\" required>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-default\" (click)=\"onCancel()\">Cancel</button>\n                    <button type=\"submit\" class=\"btn btn-primary\" (click)=\"onSubmit()\">Change</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/account/change-password/change-password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ChangePasswordComponent = ChangePasswordComponent_1 = (function () {
    function ChangePasswordComponent(diag, router, authService, toastsManager) {
        this.diag = diag;
        this.router = router;
        this.authService = authService;
        this.toastsManager = toastsManager;
        this.returnRoute = "/";
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
    };
    ChangePasswordComponent.prototype.onCancel = function () {
        this.router.navigate([this.returnRoute]);
    };
    ChangePasswordComponent.prototype.onSubmit = function () {
        var _this = this;
        this.diag.logInformation("Current user requested a password change.", ChangePasswordComponent_1.name);
        this.authService
            .changePassword(this.oldPassword, this.newPassword, this.confirmPassword)
            .subscribe(function (success) {
            _this.diag.logInformation("Password change returned with value: " + success);
            _this.authService.logout();
            _this.router.navigate(["/login"]);
            _this.toastsManager.success("You have successfully changed your password. Please login with your new password.", "Your password was successfully changed");
        }, function (error) {
            _this.diag.logInformation("Password change failed. Message: " + error);
            _this.toastsManager.error("There was an error changing your password. Please make sure you have confirmed your password correctly.", "Password was not changed");
        });
    };
    return ChangePasswordComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ChangePasswordComponent.prototype, "returnRoute", void 0);
ChangePasswordComponent = ChangePasswordComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: "change-password",
        template: __webpack_require__("../../../../../src/app/account/change-password/change-password.component.html"),
        styles: [__webpack_require__("../../../../../src/app/account/change-password/change-password.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _d || Object])
], ChangePasswordComponent);

var ChangePasswordComponent_1, _a, _b, _c, _d;
//# sourceMappingURL=change-password.component.js.map

/***/ }),

/***/ "../../../../../src/app/account/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__change_password_change_password_component__ = __webpack_require__("../../../../../src/app/account/change-password/change-password.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__change_password_change_password_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login_component__ = __webpack_require__("../../../../../src/app/account/login/login.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__login_login_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__logout_logout_component__ = __webpack_require__("../../../../../src/app/account/logout/logout.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__logout_logout_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_profile_page_component__ = __webpack_require__("../../../../../src/app/account/profile/profile-page.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__profile_profile_page_component__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/account/login/login.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".ng-valid[required] {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid {\n  border-left: 5px solid #a94442; /* red */\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/account/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/account/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_services_auth_service__ = __webpack_require__("../../../../../src/app/auth/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var LoginComponent = (function () {
    function LoginComponent(appState, authService, diag, router, toastsManager) {
        this.appState = appState;
        this.authService = authService;
        this.diag = diag;
        this.router = router;
        this.toastsManager = toastsManager;
    }
    LoginComponent.prototype.ngOnInit = function () {
        window.location.href = '/account/login';
        // this.authService
        // .login()
        // .flatMap((_: any) => this.authService.getLoggedInUserInfo())
        // .do(() => this.diag.logInformation(`Successful login, redirecting to '${this.authService.redirectUrl}'.`, `${LoginComponent.name}.onSubmit()`))
        // .do(() => this.toastsManager.success('You are sign in.', 'Succusful Sign In'))
        // .subscribe(
        // (currentUser: any) => {
        // this.appState.CurrentUser = currentUser
        // let redirectUrl = this.authService.redirectUrl || '/'
        // this.router.navigate([redirectUrl])
        // },
        // (error: any) => {
        // this.toastsManager.error('Please make sure you typed your username and password correctly and try again.', 'Invalid Login')
        // this.diag.logError('Error logging in.', `${LoginComponent.name}.onSubmit()`)
        // })
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/account/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/account/login/login.component.css")],
        selector: 'login-form',
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__shared__["f" /* DiagnosticService */]; }))),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"]; }))),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared__["a" /* ApplicationState */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__auth_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__auth_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared__["f" /* DiagnosticService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _e || Object])
], LoginComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/account/logout/logout.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "../../../../../src/app/account/logout/logout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LogoutComponent = (function () {
    function LogoutComponent(router, route, authService, appState, toastsManager) {
        this.router = router;
        this.route = route;
        this.authService = authService;
        this.appState = appState;
        this.toastsManager = toastsManager;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this.authService
            .logout()
            .subscribe(function (_) { });
        // this.authService
        //     .logout()
        //     .subscribe(_ => {
        //         if (this.authService.redirectUrl || this.authService.redirectUrl === this.appState.CurrentRouteData.url) {
        //             this.router.navigate(['/'])
        //         }
        //         this.router.navigate([this.authService.redirectUrl])
        //     },
        //     error => this.toastsManager.error('Error while logging out, please try again.'))
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/account/logout/logout.component.html"),
        selector: 'logout-component',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _e || Object])
], LogoutComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=logout.component.js.map

/***/ }),

/***/ "../../../../../src/app/account/profile/profile-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dealer__ = __webpack_require__("../../../../../src/app/dealer/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfilePageComponent = (function () {
    function ProfilePageComponent(dealerService) {
        this.dealerService = dealerService;
        this.dealer$ = this.dealerService.getCurrentDealer();
    }
    return ProfilePageComponent;
}());
ProfilePageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n        <div class=\"container\">\n            <div class=\"jumbotron\">\n                <mb-dealer-card [dealer]=\"dealer$ | async\"></mb-dealer-card>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__dealer__["DealerClientService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dealer__["DealerClientService"]) === "function" && _a || Object])
], ProfilePageComponent);

var _a;
//# sourceMappingURL=profile-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<top-navigation></top-navigation>\n<section class=\"padded\" id=\"appContainer\">\n    <router-outlet></router-outlet>\n</section>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AppComponent = AppComponent_1 = (function () {
    function AppComponent(appState, diag, router, toastr, vcr) {
        this.appState = appState;
        this.diag = diag;
        this.router = router;
        this.toastr = toastr;
        this.routeData = null;
        this.toastr.setRootViewContainerRef(vcr);
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.diag.logInformation("Application loaded", AppComponent_1.name);
        this.router.events
            .filter(function (e) { return e instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["RoutesRecognized"]; })
            .subscribe(function (e) {
            var currentPath = e.state.root.firstChild.routeConfig.path;
            _this.routeData = __WEBPACK_IMPORTED_MODULE_3__app_routes__["a" /* AllRoutes */].find(function (route) { return route.path === currentPath; });
            _this.appState.CurrentRouteData = {
                name: _this.routeData.name,
                description: _this.routeData.description,
                icon: _this.routeData.icon,
                path: currentPath,
                url: e.state.url
            };
            _this.diag.logInformation("Navigated to '" + _this.routeData.name + "' route.", AppComponent_1.name);
        });
    };
    return AppComponent;
}());
AppComponent = AppComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* ApplicationState */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["f" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_ng2_toastr__["ToastsManager"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _e || Object])
], AppComponent);

var AppComponent_1, _a, _b, _c, _d, _e;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_module__ = __webpack_require__("../../../../ng2-toastr/src/toast.module.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_module___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_module__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_toastr_options__ = __webpack_require__("../../../../../src/app/_shared/toastr-options.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_pdf_viewer__ = __webpack_require__("../../../../ng2-pdf-viewer/dist/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_pdf_viewer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_pdf_viewer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ng_infinite_scroller_infinite_scroller_module__ = __webpack_require__("../../../../../src/app/ng-infinite-scroller/infinite-scroller.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ng_flowscheduler_flowscheduler_module__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/flowscheduler.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_tooltip__ = __webpack_require__("../../../../ngx-bootstrap/tooltip/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_accordion__ = __webpack_require__("../../../../ngx-bootstrap/accordion/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_popover__ = __webpack_require__("../../../../ngx-bootstrap/popover/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__navigation__ = __webpack_require__("../../../../../src/app/navigation/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__notiification__ = __webpack_require__("../../../../../src/app/notiification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__specification__ = __webpack_require__("../../../../../src/app/specification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__specification_services_specification_service__ = __webpack_require__("../../../../../src/app/specification/services/specification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__home__ = __webpack_require__("../../../../../src/app/home/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__account__ = __webpack_require__("../../../../../src/app/account/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__interactive_designer__ = __webpack_require__("../../../../../src/app/interactive-designer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__order__ = __webpack_require__("../../../../../src/app/order/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pricing__ = __webpack_require__("../../../../../src/app/pricing/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__application_setting_services_application_setting_service__ = __webpack_require__("../../../../../src/app/application-setting/services/application-setting.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__dealer__ = __webpack_require__("../../../../../src/app/dealer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__policy__ = __webpack_require__("../../../../../src/app/policy/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












//import { ResponsiveModule } from 'ng2-responsive'






















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_23__home__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_19__navigation__["a" /* TopNavigationComponent */],
            __WEBPACK_IMPORTED_MODULE_20__notiification__["NotificationMenuComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationItemNavigationComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationDisplayComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationItemComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationChoiceGroupComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationStackPanelComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationGroupComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationItemChoiceComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationItemMultiChoiceComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationItemAttributeFeatureComponent"],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationOptionsComponent"],
            __WEBPACK_IMPORTED_MODULE_25__configuration__["ConfigurationSvgRenderer"],
            __WEBPACK_IMPORTED_MODULE_25__configuration__["ConfigurationSvg"],
            __WEBPACK_IMPORTED_MODULE_25__configuration__["ConfigurationSort"],
            __WEBPACK_IMPORTED_MODULE_26__interactive_designer__["a" /* MainLayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_26__interactive_designer__["b" /* SummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_27__order__["OrderComponent"],
            __WEBPACK_IMPORTED_MODULE_27__order__["OrderFormComponent"],
            __WEBPACK_IMPORTED_MODULE_27__order__["OrderNotesComponent"],
            __WEBPACK_IMPORTED_MODULE_27__order__["OrderNotesModalComponent"],
            __WEBPACK_IMPORTED_MODULE_27__order__["ScheduleSprayDatesComponent"],
            __WEBPACK_IMPORTED_MODULE_24__account__["b" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_24__account__["a" /* ChangePasswordComponent */],
            __WEBPACK_IMPORTED_MODULE_24__account__["c" /* LogoutComponent */],
            __WEBPACK_IMPORTED_MODULE_24__account__["d" /* ProfilePageComponent */],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["DealerContractComponent"],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["DealerProjectionsComponent"],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["DealerProjectionsPageComponent"],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["ManageDealerListComponent"],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["ManageDealerCardComponent"],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["ManageDealerPageComponent"],
            __WEBPACK_IMPORTED_MODULE_33__policy__["a" /* PolicySummaryComponent */],
            __WEBPACK_IMPORTED_MODULE_21__specification__["SpecificationMetadataFilter"],
            __WEBPACK_IMPORTED_MODULE_30__auth__["NoAccessComponent"],
            __WEBPACK_IMPORTED_MODULE_29__shared__["g" /* KeysPipe */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["BrowserModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["d" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_7__app_routes__["b" /* routing */],
            __WEBPACK_IMPORTED_MODULE_12__ng_infinite_scroller_infinite_scroller_module__["a" /* InfiniteScrollerModule */],
            __WEBPACK_IMPORTED_MODULE_13__ng_flowscheduler_flowscheduler_module__["a" /* FlowSchedulerModule */],
            __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_module__["ToastModule"].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11_ng2_pdf_viewer__["PdfViewerModule"],
            //ResponsiveModule,
            __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_modal__["b" /* ModalModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_15_ngx_bootstrap_tooltip__["a" /* TooltipModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_16_ngx_bootstrap_accordion__["a" /* AccordionModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_17_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_18_ngx_bootstrap_popover__["a" /* PopoverModule */].forRoot(),
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_29__shared__["f" /* DiagnosticService */],
            __WEBPACK_IMPORTED_MODULE_31__application_setting_services_application_setting_service__["a" /* ApplicationSettingService */],
            __WEBPACK_IMPORTED_MODULE_29__shared__["a" /* ApplicationState */],
            __WEBPACK_IMPORTED_MODULE_20__notiification__["NotificationClientService"],
            __WEBPACK_IMPORTED_MODULE_20__notiification__["NotificationService"],
            __WEBPACK_IMPORTED_MODULE_25__configuration__["ConfigurationService"],
            __WEBPACK_IMPORTED_MODULE_22__specification_services_specification_service__["a" /* SpecificationService */],
            __WEBPACK_IMPORTED_MODULE_27__order__["PolicyClientService"],
            __WEBPACK_IMPORTED_MODULE_30__auth__["AuthService"],
            __WEBPACK_IMPORTED_MODULE_28__pricing__["PricingService"],
            __WEBPACK_IMPORTED_MODULE_32__dealer__["DealerClientService"],
            __WEBPACK_IMPORTED_MODULE_30__auth__["AuthGuard"],
            __WEBPACK_IMPORTED_MODULE_30__auth__["AdminAuthGuard"],
            __WEBPACK_IMPORTED_MODULE_30__auth__["DealerPolicyGuard"],
            { provide: __WEBPACK_IMPORTED_MODULE_5__angular_http__["e" /* RequestOptions */], useClass: __WEBPACK_IMPORTED_MODULE_29__shared__["e" /* DefaultRequestOptions */] },
            { provide: __WEBPACK_IMPORTED_MODULE_9_ng2_toastr__["ToastOptions"], useClass: __WEBPACK_IMPORTED_MODULE_10__shared_toastr_options__["a" /* CustomOptions */] }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllRoutes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__home__ = __webpack_require__("../../../../../src/app/home/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order__ = __webpack_require__("../../../../../src/app/order/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interactive_designer__ = __webpack_require__("../../../../../src/app/interactive-designer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account__ = __webpack_require__("../../../../../src/app/account/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__order_schedule_spray_dates_schedule_spray_dates_component__ = __webpack_require__("../../../../../src/app/order/schedule-spray-dates/schedule-spray-dates.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth_dealer_policy_guard__ = __webpack_require__("../../../../../src/app/auth/dealer-policy.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__dealer_dealer_contract_dealer_contract_component__ = __webpack_require__("../../../../../src/app/dealer/dealer-contract/dealer-contract.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dealer_manage_manage_dealer_page_component__ = __webpack_require__("../../../../../src/app/dealer/manage/manage-dealer-page.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dealer_dealer_projections_dealer_projections_page_component__ = __webpack_require__("../../../../../src/app/dealer/dealer-projections/dealer-projections-page.component.ts");











var appRoutes = [
    {
        path: "not-authorized",
        name: "Not Authorized",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_3__auth__["NoAccessComponent"],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: []
    },
    {
        path: "account/change-password",
        name: "Change Password",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_5__account__["a" /* ChangePasswordComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"]]
    },
    {
        path: "account/profile",
        name: "Profile",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_5__account__["d" /* ProfilePageComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: true,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"]]
    },
    {
        path: "manage/schedule",
        name: "Schedule Orders",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_6__order_schedule_spray_dates_schedule_spray_dates_component__["a" /* ScheduleSprayDatesComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AdminAuthGuard"]]
    },
    {
        path: "manage/orders",
        name: "Manage Orders",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_2__order__["OrderComponent"],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"], __WEBPACK_IMPORTED_MODULE_7__auth_dealer_policy_guard__["a" /* DealerPolicyGuard */]]
    },
    {
        path: "external",
        name: "Home",
        description: "Home",
        redirectTo: "",
        useAsDefault: false,
        parentName: "",
        showInNavigation: true,
        external: true,
        icon: "",
        canActivate: []
    },
    {
        path: "external/events",
        name: "Events",
        description: "Events",
        redirectTo: "",
        useAsDefault: false,
        parentName: "",
        showInNavigation: true,
        external: true,
        icon: "",
        canActivate: []
    },
    {
        path: "external/#standards",
        name: "Our Standards",
        description: "Our Standards",
        redirectTo: "",
        useAsDefault: false,
        parentName: "",
        showInNavigation: true,
        external: true,
        icon: "",
        canActivate: []
    },
    {
        path: "external/#models",
        name: "Models",
        description: "Models",
        redirectTo: "",
        useAsDefault: false,
        parentName: "",
        showInNavigation: true,
        external: true,
        icon: "",
        canActivate: []
    },
    {
        path: "external/about",
        name: "About Us",
        description: "About Us",
        redirectTo: "",
        useAsDefault: false,
        parentName: "",
        showInNavigation: true,
        external: true,
        icon: "",
        canActivate: []
    },
    {
        path: "external/#find-dealer",
        name: "Find a Dealer",
        description: "Find a Dealer",
        redirectTo: "",
        useAsDefault: false,
        parentName: "",
        showInNavigation: true,
        external: true,
        icon: "",
        canActivate: []
    },
    {
        path: "",
        name: "root",
        description: "",
        redirectTo: "/model/select",
        useAsDefault: false,
        parentName: "",
        showInNavigation: false,
        pathMatch: 'full',
        external: false,
        icon: "",
        canActivate: []
    },
    {
        path: "model/select",
        name: "Build a MB",
        description: "Build a MB",
        component: __WEBPACK_IMPORTED_MODULE_1__home__["a" /* HomeComponent */],
        useAsDefault: true,
        parentName: "",
        showInNavigation: true,
        external: false,
        icon: "",
        canActivate: []
    },
    {
        path: "model/:id",
        name: "Build a Boat",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_4__interactive_designer__["a" /* MainLayoutComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: []
    }, {
        path: "model/reload/:id",
        name: "Build a Boat",
        description: "",
        redirectTo: "/model/:id",
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: []
    }, {
        path: "config/:configurationID",
        name: "Design A Boat",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_4__interactive_designer__["a" /* MainLayoutComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"]]
    },
    {
        path: "model",
        name: "Design A Boat",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_4__interactive_designer__["a" /* MainLayoutComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: []
    },
    {
        path: "login",
        name: "Login",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_5__account__["b" /* LoginComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: []
    }, {
        path: "logout",
        name: "Sign Out",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_5__account__["c" /* LogoutComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"]]
    }, {
        path: "dealer/contract",
        name: "Dealer Contract",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_8__dealer_dealer_contract_dealer_contract_component__["a" /* DealerContractComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"]]
    }, {
        path: "dealer/projections/2019",
        name: "Dealer Projections",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_10__dealer_dealer_projections_dealer_projections_page_component__["a" /* DealerProjectionsPageComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AuthGuard"]]
    }, {
        path: "manage/dealers",
        name: "Dealer Management",
        description: "",
        component: __WEBPACK_IMPORTED_MODULE_9__dealer_manage_manage_dealer_page_component__["a" /* ManageDealerPageComponent */],
        useAsDefault: false,
        parentName: "",
        external: false,
        showInNavigation: false,
        icon: "",
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__auth__["AdminAuthGuard"]]
    }
];
// Contains all routes, even those not used by the Angular2.
// Primarily used for including navigational elements that have no router interactivity.
var AllRoutes = appRoutes.concat([]);
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["RouterModule"].forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map

/***/ }),

/***/ "../../../../../src/app/application-setting/application-setting.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=application-setting.js.map

/***/ }),

/***/ "../../../../../src/app/application-setting/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_application_setting_service__ = __webpack_require__("../../../../../src/app/application-setting/services/application-setting.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ApplicationSettingService", function() { return __WEBPACK_IMPORTED_MODULE_0__services_application_setting_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/application-setting.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_setting___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__application_setting__);
/* unused harmony namespace reexport */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/application-setting/services/application-setting.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApplicationSettingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ApplicationSettingService = (function () {
    function ApplicationSettingService(http, 
        //private diag: DiagnosticService,
        toastsManager) {
        this.http = http;
        this.toastsManager = toastsManager;
        this._applicationSetting$ = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.applicationSetting$ = this._applicationSetting$.asObservable();
        this.baseUrl = 'http://localhost:44337/api/appsettings';
    }
    ApplicationSettingService.prototype.getApplicationSettings$ = function () {
        return this.http.get(this.baseUrl)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Application Settings.`, ApplicationSettingService.name + ".getApplicationSettings()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Application Settings.");
            }
            var setting = res.json();
            return setting;
        })
            .catch(function (error) {
            var errMsg = error.message || 'Server error';
            //this.diag.logError(errMsg, ApplicationSettingService.name + ".getApplicationSettings()")
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
        });
    };
    ApplicationSettingService.prototype.getApplicationSettings = function () {
        var _this = this;
        this.http.get(this.baseUrl)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Application Settings.`, ApplicationSettingService.name + ".getApplicationSettings()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Application Settings.");
            }
            var setting = res.json();
            return setting;
        })
            .catch(function (error) {
            var errMsg = error.message || 'Server error';
            //this.diag.logError(errMsg, ApplicationSettingService.name + ".getApplicationSettings()")
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
        })
            .subscribe(function (setting) { return _this._applicationSetting$.next(setting); });
    };
    return ApplicationSettingService;
}());
ApplicationSettingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _b || Object])
], ApplicationSettingService);

var _a, _b;
//# sourceMappingURL=application-setting.service.js.map

/***/ }),

/***/ "../../../../../src/app/artifact/artifact-metadata.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=artifact-metadata.js.map

/***/ }),

/***/ "../../../../../src/app/artifact/artifact.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=artifact.js.map

/***/ }),

/***/ "../../../../../src/app/artifact/defaulting-strategies.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export DefaultingStrategies */
var DefaultingStrategies;
(function (DefaultingStrategies) {
    DefaultingStrategies[DefaultingStrategies["None"] = 0] = "None";
    DefaultingStrategies[DefaultingStrategies["First"] = 1] = "First";
    DefaultingStrategies[DefaultingStrategies["Static"] = 2] = "Static";
    DefaultingStrategies[DefaultingStrategies["Expression"] = 3] = "Expression";
})(DefaultingStrategies || (DefaultingStrategies = {}));
//# sourceMappingURL=defaulting-strategies.js.map

/***/ }),

/***/ "../../../../../src/app/artifact/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__artifact__ = __webpack_require__("../../../../../src/app/artifact/artifact.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__artifact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__artifact__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__artifact__, "ArtifactClientService")) __webpack_require__.d(__webpack_exports__, "ArtifactClientService", function() { return __WEBPACK_IMPORTED_MODULE_0__artifact__["ArtifactClientService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__artifact_metadata__ = __webpack_require__("../../../../../src/app/artifact/artifact-metadata.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__artifact_metadata___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__artifact_metadata__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__artifact_metadata__, "ArtifactClientService")) __webpack_require__.d(__webpack_exports__, "ArtifactClientService", function() { return __WEBPACK_IMPORTED_MODULE_1__artifact_metadata__["ArtifactClientService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__defaulting_strategies__ = __webpack_require__("../../../../../src/app/artifact/defaulting-strategies.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_artifact_client_service__ = __webpack_require__("../../../../../src/app/artifact/services/artifact-client.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ArtifactClientService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_artifact_client_service__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/artifact/services/artifact-client.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtifactClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ArtifactClientService = (function (_super) {
    __extends(ArtifactClientService, _super);
    function ArtifactClientService(http, diag, auth) {
        var _this = _super.call(this, http, diag, '/', "http://localhost:44337/api/customwise/artifact") || this;
        _this.getArtifact = function (id) {
            return _this.httpGet("/" + id, function (res) { return (res.json() || {}); });
        };
        _this.getRootArtifacts = function (specType) {
            return _this.httpGet("/" + specType + "/Roots?depth=-1", function (res) { return (res.json() || []); });
        };
        _this.create = function (artifact) {
            return _this.httpPut("", artifact, function (res) { return (res.json() || {}); });
        };
        _this.update = function (artifact, force) {
            if (force === void 0) { force = false; }
            return _this.httpPost("/" + force, artifact, function (res) { return +res.text(); });
        };
        _this.stamp = function (parentArtifact, refChild, order) {
            var parentID = (typeof parentArtifact === "number") ? parentArtifact : parentArtifact.ID;
            if (parentID === 0) {
                throw new Error("Parameter 'parentArtifact', expected a 'IArtifact' or 'number', got '" + typeof parentArtifact + "'.");
            }
            var childRefID = (typeof refChild === "number") ? refChild : refChild.ID;
            if (childRefID === 0) {
                throw new Error("Parameter 'refChild', expected a 'IArtifact' or 'number', got '" + typeof refChild + "'.");
            }
            return _this
                .httpPost("/" + parentID + "/" + childRefID + "/" + order, '', function (r) { return (r.json() || {}); });
        };
        _this.getChildren = function (id, page, pageSize, filterExpr) {
            if (pageSize === void 0) { pageSize = 10; }
            if (filterExpr === void 0) { filterExpr = ''; }
            return _this.httpGet("/" + id + "?currentPageIndex=" + page + "&pageSize=" + pageSize + "&filter=" + filterExpr, function (res) { return (res.json() || []); });
        };
        return _this;
    }
    return ArtifactClientService;
}(__WEBPACK_IMPORTED_MODULE_2__shared_services_base_proxy_service__["a" /* BaseProxy */]));
ArtifactClientService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_diagnostic_service__["a" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_diagnostic_service__["a" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"]) === "function" && _c || Object])
], ArtifactClientService);

var _a, _b, _c;
//# sourceMappingURL=artifact-client.service.js.map

/***/ }),

/***/ "../../../../../src/app/auth/admin-auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminAuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AdminAuthGuard = AdminAuthGuard_1 = (function () {
    function AdminAuthGuard(router, authService, diag, appState) {
        this.router = router;
        this.authService = authService;
        this.diag = diag;
        this.appState = appState;
    }
    AdminAuthGuard.prototype.canActivate = function (route, state) {
        if (this.authService.isLoggedIn() && this.appState.CurrentUser.IsAdmin) {
            return true;
        }
        this.diag.logVerbose("Not authorized to access route '" + route.url + "'.", AdminAuthGuard_1.name + ".canActivate()");
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/not-authorized']);
        return false;
    };
    return AdminAuthGuard;
}());
AdminAuthGuard = AdminAuthGuard_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]; }))),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]; }))),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]; }))),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _d || Object])
], AdminAuthGuard);

var AdminAuthGuard_1, _a, _b, _c, _d;
//# sourceMappingURL=admin-auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/auth/auth-http.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=auth-http.js.map

/***/ }),

/***/ "../../../../../src/app/auth/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var AuthGuard = AuthGuard_1 = (function () {
    function AuthGuard(router, authService, diag) {
        this.router = router;
        this.authService = authService;
        this.diag = diag;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.diag.logVerbose("Not authorized to access route '" + route.url + "'.", AuthGuard_1.name + ".canActivate()");
        this.authService.redirectUrl = state.url;
        this.router.navigate(['/login']);
        return false;
    };
    return AuthGuard;
}());
AuthGuard = AuthGuard_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]; }))),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]; }))),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], AuthGuard);

var AuthGuard_1, _a, _b, _c;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/auth/dealer-policy.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerPolicyGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order_services_policy_client_service__ = __webpack_require__("../../../../../src/app/order/services/policy-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_services_policy_status__ = __webpack_require__("../../../../../src/app/order/services/policy-status.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_toastr_src_toast_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DealerPolicyGuard = (function () {
    function DealerPolicyGuard(router, policyService, toastr) {
        this.router = router;
        this.policyService = policyService;
        this.toastr = toastr;
    }
    DealerPolicyGuard.prototype.canActivate = function (route, state) {
        var _this = this;
        return this.policyService
            .dealer()
            .map(function (res) {
            if (res.Status === __WEBPACK_IMPORTED_MODULE_3__order_services_policy_status__["a" /* PolicyStatus */].Success) {
                return true;
            }
            else {
                if (res.Correctable) {
                    _this.router.navigate(["" + res.CorrectableAction]);
                }
                else {
                    throw new Error("" + res.FailureMessage);
                }
                return false;
            }
        })
            .catch(function (err) {
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"]
                .of(false)
                .do(function (_) { return _this
                .toastr
                .error(err.message || "An error occured while retrieving the Dealer Status."); });
        });
    };
    return DealerPolicyGuard;
}());
DealerPolicyGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__order_services_policy_client_service__["a" /* PolicyClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__order_services_policy_client_service__["a" /* PolicyClientService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _c || Object])
], DealerPolicyGuard);

var _a, _b, _c;
//# sourceMappingURL=dealer-policy.guard.js.map

/***/ }),

/***/ "../../../../../src/app/auth/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_auth_service__ = __webpack_require__("../../../../../src/app/auth/services/auth.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return __WEBPACK_IMPORTED_MODULE_0__services_auth_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_http__ = __webpack_require__("../../../../../src/app/auth/auth-http.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__auth_http__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__auth_http__, "AdminAuthGuard")) __webpack_require__.d(__webpack_exports__, "AdminAuthGuard", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_http__["AdminAuthGuard"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__auth_http__, "AuthGuard")) __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_http__["AuthGuard"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__auth_http__, "DealerPolicyGuard")) __webpack_require__.d(__webpack_exports__, "DealerPolicyGuard", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_http__["DealerPolicyGuard"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__auth_http__, "NoAccessComponent")) __webpack_require__.d(__webpack_exports__, "NoAccessComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__auth_http__["NoAccessComponent"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_info__ = __webpack_require__("../../../../../src/app/auth/user-info.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return __WEBPACK_IMPORTED_MODULE_3__auth_guard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_auth_guard__ = __webpack_require__("../../../../../src/app/auth/admin-auth.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "AdminAuthGuard", function() { return __WEBPACK_IMPORTED_MODULE_4__admin_auth_guard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dealer_policy_guard__ = __webpack_require__("../../../../../src/app/auth/dealer-policy.guard.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "DealerPolicyGuard", function() { return __WEBPACK_IMPORTED_MODULE_5__dealer_policy_guard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__no_access_no_access_component__ = __webpack_require__("../../../../../src/app/auth/no-access/no-access.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "NoAccessComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__no_access_no_access_component__["a"]; });







//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/auth/no-access/no-access.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"border:none;\" class=\"container padding-t-2\">\n    <div class=\"row col-md-6 col-md-offset-3\">\n        <div class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\">Not Authorized</h3>\n            </div>\n            <div class=\"panel-body\">\n                <p>You are not authorized to perform this action or to access this portion of the site.</p>\n                <p>If you feel that this is incorrect, please contact <strong>MB Sports</strong> @ <a href=\"mailto:info@mbsportsusa.com\">info@mbsportsusa.com</a>.</p>\n                <ul style=\"list-style:none\">\n                    <li>Click <a href=\"/\"><small>here</small></a> to go back to the main page.</li>\n                    <li>Click <a href=\"/model/select\"><small>here</small></a> to select a boat.</li>\n                </ul>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/auth/no-access/no-access.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NoAccessComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var NoAccessComponent = (function () {
    function NoAccessComponent() {
    }
    return NoAccessComponent;
}());
NoAccessComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-no-access',
        template: __webpack_require__("../../../../../src/app/auth/no-access/no-access.component.html"),
    })
], NoAccessComponent);

//# sourceMappingURL=no-access.component.js.map

/***/ }),

/***/ "../../../../../src/app/auth/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







var AuthService = AuthService_1 = (function () {
    function AuthService(http, diag, appState, router) {
        this.http = http;
        this.diag = diag;
        this.appState = appState;
        this.router = router;
        this._redirectUrlKey = '__redirect_url';
        this.lockSettings$ = this
            .appState
            .appSettings$
            .filter(function (setting) { return !!setting['auth0:ClientID'] && !!setting['auth0:Domain']; });
        this.baseUrl = '';
        this.redirectUrl = '';
        this.authKey = 'authorization_token_key';
        this._userInfo$ = new __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Subject"]();
        if (!!sessionStorage.getItem(this.userKey)) {
            var userObj = sessionStorage.getItem(this.userKey);
            this._userInfo$.next(userObj);
        }
    }
    Object.defineProperty(AuthService.prototype, "userInfo$", {
        get: function () {
            return this._userInfo$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.isLoggedIn = function () {
        var expireIn = sessionStorage.getItem('expire_in');
        var hasExpired = !!expireIn ? this.isTokenExpired(Date.parse(expireIn)) : true;
        if (hasExpired) {
            sessionStorage.removeItem(this.userKey);
            sessionStorage.removeItem(this.authKey);
            sessionStorage.removeItem('expire_in');
        }
        return !hasExpired;
    };
    AuthService.prototype.changePassword = function (oldPass, newPass, confirmPass) {
        var _this = this;
        var body = {
            'OldPassword': oldPass,
            'NewPassword': newPass,
            'ConfirmPassword': confirmPass
        };
        return this
            .http
            .post(this.baseUrl + "/api/account/changepassword", JSON.stringify(body))
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                _this.diag.logError("");
                throw new Error();
            }
            return true;
        })
            .catch(function (error) {
            var errMessage = error.message || 'Internal Server Error';
            _this.diag.logError(errMessage, AuthService_1.name + ".changePassword()");
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(errMessage);
        });
    };
    AuthService.prototype.login = function () {
        var _this = this;
        return this.http.get(this.baseUrl + "/Auth0Account/Login")
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                _this.diag.logError("Error Response Status (" + res.status + ") while logging in.", AuthService_1.name + '.login()');
                throw new Error("Error Response Status (" + res.status + ") while logging in.");
            }
            return res.json();
        })
            .map(function (authHttp) {
            if (authHttp.access_token) {
                var jsonAuthHttp = JSON.stringify(authHttp);
                sessionStorage.setItem(_this.authKey, jsonAuthHttp);
                return authHttp.access_token;
            }
            return '';
        })
            .catch(function (error) {
            // In a real world app, we might use a remote logging infrastructure
            var errMsg = error.message || 'Server error';
            _this.diag.logError(errMsg, AuthService_1.name + '.login()');
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(errMsg);
        });
    };
    // logout(): Observable<boolean> {
    //     return this.http.post('/api/Account/Logout', null)
    //         .map(res => {
    //             if (res.status < 200 || res.status >= 300) {
    //                 this.diag.logError(`Error Response Status (${res.status}) while requesting logged in UserInfo.`, AuthService.name + '.getLoggedInUserInfo()')
    //                 throw new Error(`Error Response Status (${res.status}) while requesting logged in UserInfo.`);
    //             }
    //             sessionStorage.removeItem(this.userKey)
    //             sessionStorage.removeItem(this.authKey)
    //             this.appState.resetCurrentUser()
    //             this.toastsManager.success('Successful Sign Out', 'Success')
    //             return true
    //         })
    // }
    AuthService.prototype.logout = function () {
        sessionStorage.removeItem(this.userKey);
        sessionStorage.removeItem(this.authKey);
        this.appState.resetCurrentUser();
        window.location.href = '/Auth0Account/LogOff';
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].create(function () { return true; });
    };
    AuthService.prototype.getLoggedInUserInfo = function () {
        var _this = this;
        this.diag.logVerbose('Getting UserInfo', AuthService_1.name + ".getLoggedInUserInfo()");
        return this.http.get(this.baseUrl + "/api/Account/UserInfo")
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                _this.diag.logError("Error Response Status (" + res.status + ") while requesting logged in UserInfo.", AuthService_1.name + '.getLoggedInUserInfo()');
                throw new Error("Error Response Status (" + res.status + ") while requesting logged in UserInfo.");
            }
            _this.diag.logVerbose('Requested UserInfo found.', AuthService_1.name + ".getLoggedInUserInfo()");
            var userInfo = res.json();
            sessionStorage.setItem(_this.userKey, res.json());
            _this._userInfo$.next(userInfo);
            return userInfo;
        })
            .catch(function (error) {
            // In a real world app, we might use a remote logging infrastructure
            var errMsg = error.message || 'Server error';
            _this.diag.logError(errMsg, AuthService_1.name + '.getLoggedInUserInfo()');
            return __WEBPACK_IMPORTED_MODULE_4_rxjs_Rx__["Observable"].throw(errMsg);
        });
    };
    AuthService.prototype.isTokenExpired = function (expireIn, offsetSeconds) {
        var curr = Date.parse(new Date().toUTCString());
        return curr > expireIn;
    };
    AuthService.prototype.cleanLocalStorage = function () {
        // Remove token from sessionStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        sessionStorage.removeItem('profile');
        this.appState.CurrentUser = JSON.parse('{}');
    };
    return AuthService;
}());
AuthService = AuthService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]; }))),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]; }))),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]; }))),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _d || Object])
], AuthService);

var AuthService_1, _a, _b, _c, _d;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/auth/user-info.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export parsedAuth0Profile */
function parsedAuth0Profile(profile) {
    var metadataNamespace = 'https://mbsports.com';
    return {
        UserName: profile.username,
        Email: profile.email,
        IsAdmin: profile[metadataNamespace + "/is_admin"],
        Roles: profile[metadataNamespace + "/roles"],
        //PriceLevel       : profile.email_verified,
        //DefaultPriceLevel: profile[`${metadataNamespace}/price_level`],
        //DealerID         : profile[`${metadataNamespace}/dealer_codes`][0],
        //DefaultDealerID  : profile.sub,
        //Dealer           : <IDealer>profile[`${metadataNamespace}/dealer`],
        DealerCodes: profile[metadataNamespace + "/dealer_codes"]
    };
}
//# sourceMappingURL=user-info.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/configuration-renderer/configuration-svg-renderer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".stage {\n    top: 0px;\n    left: 0px;\n    position:relative;\n    height: 555px;\n}\n.active {\n    top: 0px !important;\n    left: 0px !important;\n    transition: height 1s ease-in, width 1s ease-in, top 1s ease-in, left 1s ease-in, background-color 1s ease-in;\n    -webkit-transform: height 1s ease-in, width 1s ease-in, top 1s ease-in, left 1s ease-in, background-color 1s ease-in; /** Chrome & Safari **/\n    -o-transform: height 1s ease-in, width 1s ease-in, top 1s ease-in, left 1s ease-in, background-color 1s ease-in; /** Opera **/\n    -moz-transform: height 1s ease-in, width 1s ease-in, top 1s ease-in, left 1s ease-in, background-color 1s ease-in; /** Firefox **/\n    z-index: 1\n}\n.thumbnail {\n    width: 176px;\n    height: 83px;\n    top: 50px;\n    left: 50px;\n    background-color: #666;\n    z-index: 2\n}\n@media (max-width: 769px) {\n    .active {\n        height: 100% !important;\n        width: 100% !important;\n    }\n    .stage {\n        height: 420px;\n    }\n    .thumbnail {\n        width: 135px;\n        height: 60px;\n        top: 7px;\n        left: 50px;\n    }\n}\n\n@media (max-width: 425px) {\n    .stage {\n        height: initial;\n    }\n}\n@media (min-width: 992px) {\n    .active {\n        height: 551px !important;\n        width: 992px !important;\n    }\n}\n@media (min-width: 1024px) and (orientation: portrait) {\n    .active {\n        width: 1024px !important;\n    }\n}\n@media (min-width: 1024px) and (orientation: landscape) {\n    .active {\n        width: 100% !important;\n    }\n}\n@media (min-width: 1200px) {\n    .active {\n        width: 1200px !important;\n    }\n}\n@media (max-width: 769px) and (orientation: landscape) {\n    .active {\n        height: 100% !important;\n        width: 100% !important;\n    }\n    .stage {\n        height: 100%;\n        width: 100%;\n        position: fixed;\n        top: 0;\n        margin: auto;\n    }\n    .mobile-view-changer { \n        position: absolute;\n        top: 90%;\n        left: 45%;\n    }\n}\n#exteriorSvg,\n#interiorSvg {\n    position: absolute;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/configuration/configuration-renderer/configuration-svg-renderer.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"stage hidden-xs\">\n    <iframe [src]=\"exteriorUrl\" sandbox=\"allow-same-origin allow-scripts\" seamless=\"seamless\" id=\"exteriorSvg\" class=\"active\"></iframe>\n    <iframe [src]=\"interiorUrl\" sandbox=\"allow-same-origin allow-scripts\" seamless=\"seamless\" id=\"interiorSvg\" class=\"thumbnail\"></iframe>\n    <div (click)=\"toggleView($event)\" style=\"z-index: 100; width: 176px; height: 83px; position: absolute; top: 50px; left: 50px;\"></div>\n</div>\n<div class=\"stage hidden-md hidden-lg hidden-sm\" *ngIf=\"bootstrapObj.Size === 'xs'\">\n    <iframe [src]=\"mobileExteriorUrl\" sandbox=\"allow-same-origin allow-scripts\" seamless=\"seamless\" id=\"mobileExteriorSvg\" class=\"hidden-md hidden-lg hidden-sm active\"></iframe>\n    <iframe [src]=\"mobileInteriorUrl\" sandbox=\"allow-same-origin allow-scripts\" seamless=\"seamless\" id=\"mobileInteriorSvg\" class=\"hidden-md hidden-lg hidden-sm hidden\"></iframe>\n    <div class=\"mobile-view-changer\"><a (click)=\"toggleMobileView($event)\" title=\"Click here to {{nextMobileView}}\">View {{nextMobileView}}</a></div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/configuration/configuration-renderer/configuration-svg-renderer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationSvgRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconfiguration__ = __webpack_require__("../../../../../src/app/configuration/iconfiguration.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconfiguration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__iconfiguration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__specification__ = __webpack_require__("../../../../../src/app/specification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_util__ = __webpack_require__("../../../../../src/app/_shared/util.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromEvent__ = __webpack_require__("../../../../rxjs/add/observable/fromEvent.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromEvent___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_observable_fromEvent__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var ConfigurationSvgRenderer = ConfigurationSvgRenderer_1 = (function (_super) {
    __extends(ConfigurationSvgRenderer, _super);
    function ConfigurationSvgRenderer(sanitizer, diag, appState, el) {
        var _this = _super.call(this) || this;
        _this.sanitizer = sanitizer;
        _this.diag = diag;
        _this.appState = appState;
        _this.viewElementIds = [
            "exteriorSvg",
            "interiorSvg",
            "mobileExteriorSvg",
            "mobileInteriorSvg"
        ];
        _this.baseRendererUrl = "/svgrenderer/render";
        _this.activeId = "exteriorSvg";
        _this.activeMobileId = 'mobileExteriorSvg';
        _this.currentMobileView = "Exterior";
        _this.nextMobileView = "Interior";
        _this.bootStrapObj$.subscribe(function (obj) { return _this.bootstrapObj = obj; });
        _this.el = el.nativeElement;
        return _this;
    }
    Object.defineProperty(ConfigurationSvgRenderer.prototype, "navigation", {
        set: function (displayName) {
            if (displayName === "Upholstery") {
                this.setView("interiorSvg");
                this.setMobileView("mobileInteriorSvg");
                this.currentMobileView = "Interior";
                this.nextMobileView = (this.currentMobileView === "Exterior") ? "Interior" : "Exterior";
            }
            if (displayName === "Gelcoat") {
                this.setView("exteriorSvg");
                this.setMobileView("mobileExteriorSvg");
                this.currentMobileView = "Exterior";
                this.nextMobileView = (this.currentMobileView === "Exterior") ? "Interior" : "Exterior";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationSvgRenderer.prototype, "configuration", {
        set: function (config) {
            var _this = this;
            this.prevConfiguration = config;
            this.diag.logInformation("Receiving configuration.", ConfigurationSvgRenderer_1.name);
            // TODO:
            this.runAgainstVisibleViews(function (el) { return _this.pushOrDefer(el, config); });
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationSvgRenderer.prototype.isVisible = function (el) {
        return !!el && el.offsetWidth !== 0 && el.offsetHeight !== 0;
    };
    ConfigurationSvgRenderer.prototype.runAgainstVisibleViews = function (callback) {
        var _this = this;
        this.viewElementIds
            .map(function (id) { return _this.el.ownerDocument.getElementById(id); })
            .filter(function (el) { return _this.isVisible(el); })
            .forEach(function (el) { return callback(el); });
    };
    ConfigurationSvgRenderer.prototype.pushOrDefer = function (iframe, config) {
        var _this = this;
        if (iframe.contentWindow && iframe.contentWindow.applyConfiguration) {
            this.pushConfig(iframe, config);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"]
                .fromEvent(iframe, "load")
                .subscribe(function (e) { return _this.pushConfig(iframe, config); });
        }
    };
    ConfigurationSvgRenderer.prototype.resetOrDefer = function (iframe) {
        var _this = this;
        if (iframe.contentWindow && iframe.contentWindow.clear) {
            this.resetConfig(iframe);
        }
        else {
            __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__["Observable"]
                .fromEvent(iframe, "load")
                .subscribe(function (e) { return _this.resetConfig(iframe); });
        }
    };
    ConfigurationSvgRenderer.prototype.ngOnInit = function () {
        var _this = this;
        this.exteriorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseRendererUrl + "/" + this.specification.ID + "/Exterior");
        this.interiorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseRendererUrl + "/" + this.specification.ID + "/Interior");
        this.mobileExteriorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseRendererUrl + "/" + this.specification.ID + "/Exterior/sm");
        this.mobileInteriorUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseRendererUrl + "/" + this.specification.ID + "/Interior/sm");
        this.appState
            .onResetChildrenConfiguration
            .subscribe(function () {
            return _this.runAgainstVisibleViews(function (el) { return _this.resetOrDefer(el); });
        });
        this.appState
            .configuration$
            .subscribe(function (config) {
            _this.prevConfiguration = config;
            _this.diag.logInformation("Receiving configuration.", ConfigurationSvgRenderer_1.name);
            // TODO:
            _this.runAgainstVisibleViews(function (el) { return _this.pushOrDefer(el, config); });
        });
        this.runAgainstVisibleViews(function (el) { return _this.pushOrDefer(el, _this.prevConfiguration); });
    };
    ConfigurationSvgRenderer.prototype.pushConfig = function (el, config) {
        el.contentWindow.applyConfiguration(config.Items);
    };
    ConfigurationSvgRenderer.prototype.resetConfig = function (el) {
        el.contentWindow.clear();
    };
    ConfigurationSvgRenderer.prototype.toggleView = function (event) {
        var newActiveId = (this.activeId === "exteriorSvg") ? "interiorSvg" : "exteriorSvg";
        this.setView(newActiveId);
    };
    ConfigurationSvgRenderer.prototype.setView = function (view) {
        if (this.activeId === view) {
            return;
        }
        var newActiveId = (this.activeId === "exteriorSvg") ? "interiorSvg" : "exteriorSvg";
        var newActiveEl = this.el.ownerDocument.getElementById(newActiveId);
        var newInactiveEl = this.el.ownerDocument.getElementById(this.activeId);
        newActiveEl.classList.add("active");
        setTimeout(function () {
            newActiveEl.classList.remove("thumbnail");
            newInactiveEl.classList.remove("active");
            newInactiveEl.classList.add("thumbnail");
        }, 1200);
        this.activeId = newActiveId;
    };
    ConfigurationSvgRenderer.prototype.setMobileView = function (view) {
        if (this.activeMobileId === view || this.bootstrapObj.Size !== 'xs') {
            return;
        }
        var newActiveId = (this.activeMobileId === "mobileExteriorSvg") ? "mobileInteriorSvg" : "mobileExteriorSvg";
        var newActiveEl = this.el.ownerDocument.getElementById(newActiveId);
        var newInactiveEl = this.el.ownerDocument.getElementById(this.activeMobileId);
        newActiveEl.classList.add("active");
        newActiveEl.classList.remove("hidden");
        newInactiveEl.classList.remove("active");
        newInactiveEl.classList.add("hidden");
        this.pushConfig(newActiveEl, this.prevConfiguration);
        this.activeMobileId = newActiveId;
    };
    ConfigurationSvgRenderer.prototype.toggleMobileView = function (event) {
        this.nextMobileView = this.currentMobileView;
        this.currentMobileView = (this.currentMobileView === "Exterior") ? "Interior" : "Exterior";
        this.setMobileView("mobile" + this.currentMobileView + "Svg");
    };
    return ConfigurationSvgRenderer;
}(__WEBPACK_IMPORTED_MODULE_4__shared_util__["a" /* ResponsiveHelper */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__specification__["ISpecification"]) === "function" && _a || Object)
], ConfigurationSvgRenderer.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ConfigurationSvgRenderer.prototype, "view", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], ConfigurationSvgRenderer.prototype, "navigation", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__iconfiguration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__iconfiguration__["IConfiguration"]) === "function" && _b || Object),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__iconfiguration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__iconfiguration__["IConfiguration"]) === "function" && _c || Object])
], ConfigurationSvgRenderer.prototype, "configuration", null);
ConfigurationSvgRenderer = ConfigurationSvgRenderer_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'configuration-svg-renderer',
        template: __webpack_require__("../../../../../src/app/configuration/configuration-renderer/configuration-svg-renderer.component.html"),
        styles: [__webpack_require__("../../../../../src/app/configuration/configuration-renderer/configuration-svg-renderer.component.css")]
    }),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_5__shared__["f" /* DiagnosticService */]; }))),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["DomSanitizer"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared__["f" /* DiagnosticService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* ApplicationState */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _g || Object])
], ConfigurationSvgRenderer);

var ConfigurationSvgRenderer_1, _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=configuration-svg-renderer.component.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/configuration.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createConfiguration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createConfigurationItem; });
/* unused harmony export createInputConfigurationItem */
/* harmony export (immutable) */ __webpack_exports__["c"] = createTrimedConfiguration;
/* unused harmony export cloneConfiguration */
/* unused harmony export linkConfiguration */
/* harmony export (immutable) */ __webpack_exports__["d"] = linkConfigurationFromRootSpec;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};

var createConfiguration = function (rootSpecification, createdBy, modifiedBy) {
    if (rootSpecification === void 0) { rootSpecification = null; }
    if (createdBy === void 0) { createdBy = 'anonymous'; }
    if (modifiedBy === void 0) { modifiedBy = 'anonymous'; }
    return ({
        ID: 0,
        Name: '',
        CreatedBy: createdBy || "anonymous",
        CreatedDate: new Date(),
        ModifiedBy: modifiedBy || "anonymous",
        ModifiedDate: new Date(),
        Items: [],
        RootSpecification: rootSpecification,
        RootSpecificationID: (!rootSpecification) ? 0 : rootSpecification.ID,
        RootDisplayName: (!rootSpecification) ? '' : rootSpecification.DisplayName,
        ErrorMessage: '',
        HasError: false,
        RootSpecificationPrice: 0,
        ConnectedSystemName: '',
        ConnectedSystemID: '',
        ViewToken: '',
        Owner: '',
        SummaryText: '',
        ImageUrl: '',
        FileName: '',
        TempFileLocation: '',
        AdjustmentData: '',
        ConfigurationImages: null
    });
};

var createConfigurationItem = function (keySpecification, valueSpecification, configuration, createdBy, modifiedBy) {
    if (keySpecification === void 0) { keySpecification = null; }
    if (valueSpecification === void 0) { valueSpecification = null; }
    if (configuration === void 0) { configuration = null; }
    if (createdBy === void 0) { createdBy = 'anonymous'; }
    if (modifiedBy === void 0) { modifiedBy = 'anonymous'; }
    return ({
        ID: 0,
        CreatedBy: createdBy || 'anonymous',
        CreatedDate: new Date(),
        ModifiedBy: modifiedBy || 'anonymous',
        ModifiedDate: new Date(),
        Configuration: configuration,
        ConfigurationID: (!configuration) ? 0 : configuration.ID,
        KeySpecification: keySpecification,
        KeySpecificationID: (!keySpecification) ? 0 : keySpecification.ID,
        KeyDisplayName: (!keySpecification) ? '' : keySpecification.DisplayName,
        ValueSpecification: valueSpecification,
        ValueSpecificationID: (!valueSpecification) ? null : valueSpecification.ID,
        ValueDisplayName: (!valueSpecification) ? '' : valueSpecification.DisplayName,
        ErrorMessage: '',
        HasError: false,
        InputValue: '',
        SortOrder: 0,
        State: 0,
        ValueData: valueSpecification.Metadata,
        Price: 0,
        SummaryLabel: '',
        SummaryText: '',
    });
};
function createInputConfigurationItem(keySpecification, inputValue, configuration, createdBy, modifiedBy) {
    if (keySpecification === void 0) { keySpecification = null; }
    if (createdBy === void 0) { createdBy = null; }
    if (modifiedBy === void 0) { modifiedBy = null; }
    return {
        ID: 0,
        CreatedBy: createdBy || "anonymous",
        CreatedDate: new Date(),
        ModifiedBy: modifiedBy || "anonymous",
        ModifiedDate: new Date(),
        Configuration: configuration,
        ConfigurationID: (!configuration) ? 0 : configuration.ID,
        KeySpecification: keySpecification,
        KeySpecificationID: (!keySpecification) ? 0 : keySpecification.ID,
        KeyDisplayName: (!keySpecification) ? "" : keySpecification.DisplayName,
        ValueSpecification: null,
        ValueSpecificationID: null,
        ValueDisplayName: "",
        InputValue: inputValue,
        ErrorMessage: '',
        HasError: false,
        SortOrder: 0,
        ValueData: null,
        State: 0,
        Price: 0,
        SummaryLabel: '',
        SummaryText: '',
    };
}
function createTrimedConfiguration(config, createdBy, modifiedBy, copyValueSpecification) {
    if (createdBy === void 0) { createdBy = "anonymous"; }
    if (modifiedBy === void 0) { modifiedBy = "anonymous"; }
    if (copyValueSpecification === void 0) { copyValueSpecification = false; }
    return {
        ID: config.ID,
        AdjustmentData: config.AdjustmentData,
        Name: config.Name,
        CreatedBy: config.CreatedBy || createdBy,
        CreatedDate: config.CreatedDate,
        ModifiedBy: config.ModifiedBy || modifiedBy,
        ModifiedDate: config.ModifiedDate,
        RootSpecificationID: config.RootSpecificationID,
        RootDisplayName: config.RootDisplayName,
        Items: config.Items.map(function (ci) { return ({
            ID: ci.ID,
            CreatedBy: ci.CreatedBy || "anonymous",
            CreatedDate: ci.CreatedDate,
            ModifiedBy: ci.ModifiedBy || "anonymous",
            ModifiedDate: ci.ModifiedDate,
            KeySpecificationID: ci.KeySpecificationID,
            KeyDisplayName: ci.KeyDisplayName,
            ValueSpecificationID: ci.ValueSpecificationID,
            ValueSpecification: copyValueSpecification ? ci.ValueSpecification : null,
            ValueDisplayName: ci.ValueDisplayName,
            ValueData: ci.ValueData,
            HasError: ci.HasError,
            ErrorMessage: ci.ErrorMessage,
            SortOrder: ci.SortOrder,
            Price: ci.Price,
            InputValue: ci.InputValue,
            SummaryText: ci.SummaryText,
            SummaryLabel: ci.SummaryLabel,
        }); }),
        HasError: config.HasError,
        ErrorMessage: config.ErrorMessage,
        RootSpecificationPrice: config.RootSpecificationPrice,
        ViewToken: config.ViewToken,
        ConnectedSystemID: config.ConnectedSystemID,
        ConnectedSystemName: config.ConnectedSystemName,
        Owner: config.Owner,
        RootSpecification: null,
        SummaryText: config.SummaryText,
        ImageUrl: '',
        FileName: '',
        TempFileLocation: '',
        ConfigurationImages: config.ConfigurationImages
    };
}
function cloneConfiguration(config) {
    var clone = __assign({}, config);
    clone.Items = config.Items.map(function (i) { return (__assign({}, i)); });
    return clone;
}
function linkConfiguration(configuration, specifications) {
    configuration.RootSpecification = specifications.find(function (s) { return s.ID === configuration.RootSpecificationID; });
    configuration.Items =
        configuration
            .Items
            .map(function (item) {
            item.KeySpecification = specifications.find(function (s) { return s.ID === item.KeySpecificationID; }) || item.KeySpecification;
            item.ValueSpecification = specifications.find(function (s) { return s.ID === item.ValueSpecificationID; }) || item.ValueSpecification;
            item.KeyDisplayName = item.KeySpecification.DisplayName;
            item.ValueDisplayName = item.ValueSpecification ? item.ValueSpecification.DisplayName : null;
            item.Configuration = configuration;
            item.ConfigurationID = configuration.ID;
            return item;
        });
    return configuration;
}
function linkConfigurationFromRootSpec(specConfigPair) {
    var spec = specConfigPair[0], config = specConfigPair[1];
    // link up the config to specification.
    var flatSpec = Object(__WEBPACK_IMPORTED_MODULE_0__shared__["j" /* flattenArray */])(spec, function (s) { return s.Children; });
    config.RootSpecification = spec;
    config.Items =
        config
            .Items
            .map(function (item) {
            item.KeySpecification = flatSpec.find(function (s) { return s.ID === item.KeySpecificationID; }) || item.KeySpecification;
            item.ValueSpecification = flatSpec.find(function (s) { return s.ID === item.ValueSpecificationID; }) || item.ValueSpecification;
            item.KeyDisplayName = item.KeySpecification ? item.KeySpecification.DisplayName : null;
            item.ValueDisplayName = item.ValueSpecification ? item.ValueSpecification.DisplayName : null;
            item.ValueData = item.ValueSpecification ? item.ValueSpecification.Metadata : null;
            item.Configuration = config;
            item.ConfigurationID = config.ID;
            return item;
        });
    return config;
}
//# sourceMappingURL=configuration.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/directives/configuration-svg.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationSvg; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconfiguration__ = __webpack_require__("../../../../../src/app/configuration/iconfiguration.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconfiguration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__iconfiguration__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ConfigurationSvg = (function () {
    function ConfigurationSvg(el) {
        this.el = el.nativeElement;
    }
    ConfigurationSvg.prototype.ngOnInit = function () {
    };
    ConfigurationSvg.prototype.ngOnChanges = function (changes) {
        var svgGetDoc = this.el;
        this.el.addEventListener("load", function () {
            var svgDoc = svgGetDoc.getSVGDocument();
            var colorAreaEl = svgDoc.getElementById("gel5-color");
            colorAreaEl.setAttribute("class", "animateToRed");
        });
    };
    return ConfigurationSvg;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('SvgConfiguration'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__iconfiguration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__iconfiguration__["IConfiguration"]) === "function" && _a || Object)
], ConfigurationSvg.prototype, "configuration", void 0);
ConfigurationSvg = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[SvgConfiguration]'
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object])
], ConfigurationSvg);

var _a, _b;
//# sourceMappingURL=configuration-svg.directive.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/iconfiguration.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=iconfiguration.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconfiguration__ = __webpack_require__("../../../../../src/app/configuration/iconfiguration.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iconfiguration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "ConfigurationService")) __webpack_require__.d(__webpack_exports__, "ConfigurationService", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["ConfigurationService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "ConfigurationSort")) __webpack_require__.d(__webpack_exports__, "ConfigurationSort", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["ConfigurationSort"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "ConfigurationSvg")) __webpack_require__.d(__webpack_exports__, "ConfigurationSvg", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["ConfigurationSvg"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "ConfigurationSvgRenderer")) __webpack_require__.d(__webpack_exports__, "ConfigurationSvgRenderer", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["ConfigurationSvgRenderer"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "IConfiguration")) __webpack_require__.d(__webpack_exports__, "IConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["IConfiguration"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "createConfiguration")) __webpack_require__.d(__webpack_exports__, "createConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["createConfiguration"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "createConfigurationItem")) __webpack_require__.d(__webpack_exports__, "createConfigurationItem", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["createConfigurationItem"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "createTrimedConfiguration")) __webpack_require__.d(__webpack_exports__, "createTrimedConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["createTrimedConfiguration"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__iconfiguration__, "linkConfigurationFromRootSpec")) __webpack_require__.d(__webpack_exports__, "linkConfigurationFromRootSpec", function() { return __WEBPACK_IMPORTED_MODULE_0__iconfiguration__["linkConfigurationFromRootSpec"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configuration__ = __webpack_require__("../../../../../src/app/configuration/configuration.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "createConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_1__configuration__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "createConfigurationItem", function() { return __WEBPACK_IMPORTED_MODULE_1__configuration__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "createTrimedConfiguration", function() { return __WEBPACK_IMPORTED_MODULE_1__configuration__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "linkConfigurationFromRootSpec", function() { return __WEBPACK_IMPORTED_MODULE_1__configuration__["d"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__ = __webpack_require__("../../../../../src/app/configuration/services/configuration.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ConfigurationService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_configuration_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration_renderer_configuration_svg_renderer_component__ = __webpack_require__("../../../../../src/app/configuration/configuration-renderer/configuration-svg-renderer.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ConfigurationSvgRenderer", function() { return __WEBPACK_IMPORTED_MODULE_3__configuration_renderer_configuration_svg_renderer_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_configuration_svg_directive__ = __webpack_require__("../../../../../src/app/configuration/directives/configuration-svg.directive.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ConfigurationSvg", function() { return __WEBPACK_IMPORTED_MODULE_4__directives_configuration_svg_directive__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pipes_configuration_pipe__ = __webpack_require__("../../../../../src/app/configuration/pipes/configuration.pipe.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ConfigurationSort", function() { return __WEBPACK_IMPORTED_MODULE_5__pipes_configuration_pipe__["a"]; });






//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/mb-helpers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return trailerFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return notTrailerFilter; });
var trailerFilter = function (item) {
    return (item.ValueSpecification.DisplayName.indexOf('Boatmate Trailer') > -1) ||
        (item.ValueSpecification.SystemName.indexOf('TrailerOption') > -1);
};
var notTrailerFilter = function (item) {
    return !trailerFilter(item);
};
//# sourceMappingURL=mb-helpers.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/pipes/configuration.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationSort; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ConfigurationSort = (function () {
    function ConfigurationSort() {
    }
    ConfigurationSort.prototype.transform = function (configurations) {
        return configurations.sort(function (a, b) {
            return a.SortOrder > b.SortOrder ? 1
                : a.SortOrder < b.SortOrder ? -1
                    : 0;
        });
    };
    return ConfigurationSort;
}());
ConfigurationSort = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'configurationSort' })
], ConfigurationSort);

//# sourceMappingURL=configuration.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/configuration/services/configuration.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigurationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration__ = __webpack_require__("../../../../../src/app/configuration/configuration.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_from__ = __webpack_require__("../../../../rxjs/add/observable/from.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_from___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_observable_from__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_services_auth_service__ = __webpack_require__("../../../../../src/app/auth/services/auth.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};











var ConfigurationService = ConfigurationService_1 = (function (_super) {
    __extends(ConfigurationService, _super);
    function ConfigurationService(http, diag, appState, auth) {
        var _this = _super.call(this, http, diag, '/', 'http://localhost:44337/api/customwise/configuration') || this;
        _this.appState = appState;
        _this.auth = auth;
        _this._configuration$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Subject"]();
        _this._configurationList$ = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Subject"]();
        _this.dirty = true;
        _this.dataStore = {
            configuration: Object(__WEBPACK_IMPORTED_MODULE_3__configuration__["a" /* createConfiguration */])(null, _this.appState.CurrentUser.UserName, _this.appState.CurrentUser.UserName),
            configurations: []
        };
        return _this;
    }
    Object.defineProperty(ConfigurationService.prototype, "configuration$", {
        get: function () {
            return this._configuration$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigurationService.prototype, "configurationList$", {
        get: function () {
            return this._configurationList$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    ConfigurationService.prototype.insertConfiguration = function (configuration) {
        var _this = this;
        this.httpPut('', configuration, function (res) { return res; }).subscribe(function (res) {
            _this._diag.logVerbose('Extracting http response data.', ConfigurationService_1.name + '.addroot()');
            if (res.status < 200 || res.status >= 300) {
                _this._diag.logError("Response status: " + res.status, ConfigurationService_1.name + '.addroot()');
                throw new Error("Response status: " + res.status);
            }
            _this.dataStore.configuration.ID = parseInt(res.text());
            _this._configuration$.next(_this.dataStore.configuration);
            return res;
        }, function (error) {
            var errMsg = error.message || 'Server error';
            _this._diag.logError(errMsg, ConfigurationService_1.name + '.addroot()');
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
        });
    };
    ConfigurationService.prototype.loadConfiguration = function (configurationID) {
        var _this = this;
        if (this.dirty) {
            this.httpGet("/" + configurationID, function (res) { return (res.json() || {}); })
                .subscribe(function (data) {
                _this.dataStore.configuration = data;
                _this.dirty = false;
                _this._configuration$.next(_this.dataStore.configuration);
            }, function (error) {
                // In a real world app, we might use a remote logging infrastructure
                var errMsg = error.message || 'Server error';
                _this._diag.logError(errMsg, ConfigurationService_1.name + '.loadConfiguration()');
            });
        }
        else {
            this._configuration$.next(this.dataStore.configuration);
        }
    };
    ConfigurationService.prototype.loadAll = function () {
        var _this = this;
        this._diag.logInformation(ConfigurationService_1.name + ".loadAll()", ConfigurationService_1.name);
        this.httpGet('', function (res) { return (res.json() || []); })
            .subscribe(function (data) {
            _this.dataStore.configurations = data;
            _this._configurationList$.next(_this.dataStore.configurations);
        }, function (error) {
            // In a real world app, we might use a remote logging infrastructure
            var errMsg = error.message || 'Server error';
            _this._diag.logError(errMsg, ConfigurationService_1.name + '.loadAll()');
        });
    };
    ConfigurationService.prototype.addConfiguration = function (config) {
        return this.httpPut("?priceLevel=" + this.appState.CurrentUser.PriceLevel, Object(__WEBPACK_IMPORTED_MODULE_3__configuration__["c" /* createTrimedConfiguration */])(config), function (res) { return res.json(); });
    };
    ConfigurationService.prototype.updateConfiguration = function (configuration) {
        return this.httpPost("?priceLevel=" + this.appState.CurrentUser.PriceLevel, Object(__WEBPACK_IMPORTED_MODULE_3__configuration__["c" /* createTrimedConfiguration */])(configuration), function (res) { return res.json(); });
    };
    ConfigurationService.prototype.addRootConfiguration = function (specification) {
        var configuration = Object(__WEBPACK_IMPORTED_MODULE_3__configuration__["a" /* createConfiguration */])(specification, this.appState.CurrentUser.UserName, this.appState.CurrentUser.UserName);
        return this.httpPut(this.baseUrl, configuration, function (res) { return res.json(); });
    };
    ConfigurationService.prototype.getConfigurationByID = function (id) {
        return this.httpGet("/" + id, function (res) { return res.json(); });
    };
    ConfigurationService.prototype.validate = function (configuration) {
        return this.httpPost("/validate", Object(__WEBPACK_IMPORTED_MODULE_3__configuration__["c" /* createTrimedConfiguration */])(configuration), function (res) { return (res.json() || {}); });
    };
    ConfigurationService.prototype.getConfigurationImage = function (configurationID, view, size) {
        if (size === void 0) { size = ''; }
        return this.httpGet("/image/" + configurationID + "?view=" + view + "&size=" + size, function (res) { return res.json(); });
    };
    ConfigurationService.prototype.getConfigurationsLockState = function (ids) {
        return this.httpGet("/lock?ids=" + ids.join(','), function (res) { return res.json(); });
    };
    ConfigurationService.prototype.updateConfigurationLock = function (id, lockState) {
        return this.httpPut("/lock/" + id, { locked: lockState }, function (res) { return res; });
    };
    return ConfigurationService;
}(__WEBPACK_IMPORTED_MODULE_5__shared_services_base_proxy_service__["a" /* BaseProxy */]));
ConfigurationService = ConfigurationService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */]; }))),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]; }))),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_10__auth_services_auth_service__["a" /* AuthService */]; }))),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10__auth_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__auth_services_auth_service__["a" /* AuthService */]) === "function" && _d || Object])
], ConfigurationService);

var ConfigurationService_1, _a, _b, _c, _d;
//# sourceMappingURL=configuration.service.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/dealer-contract/dealer-contract.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div *ngIf=\"currentDealer$ | async as dealer\" class=\"col-md-8 col-md-offset-2\">\n        <div *ngIf=\"dealer.ContractAcknowledged; else acknowledge\" >\n            <policy-summary \n                [policyResult]=\"policyResult$ | async\"\n                successMessage=\"You have already Acknowledged your Dealer Contract.\"\n                successRoute=\"/manage/orders\"\n                successRouteName=\"Manage your orders\"></policy-summary>\n        </div>\n        <pdf-viewer\n            [src]=\"dealer.ContractUrl\"\n            [original-size]=\"false\"\n            [fit-to-page]=\"true\"\n            [render-text]=\"true\"\n            [autoresize]=\"true\"\n            [external-link-target]=\"'blank'\"\n            ></pdf-viewer>\n        <ng-template #acknowledge>\n            <div class=\"row text-center\">\n                <button class=\"btn btn-primary\" (click)=\"onAcknowledge($event)\">I Acknowledge</button>\n            </div>\n        </ng-template>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/dealer/dealer-contract/dealer-contract.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerContractComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_dealer_client_service__ = __webpack_require__("../../../../../src/app/dealer/services/dealer-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_services_policy_client_service__ = __webpack_require__("../../../../../src/app/order/services/policy-client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DealerContractComponent = (function () {
    function DealerContractComponent(dealerService, policyService, toastr) {
        this.dealerService = dealerService;
        this.policyService = policyService;
        this.toastr = toastr;
        this.currentDealer$ = this.dealerService.getCurrentDealer().share();
        this.acknowledged$ = this.currentDealer$.map(function (d) { return d.ContractAcknowledged; });
        this.contractUrl$ = this.currentDealer$.map(function (d) { return d.ContractUrl; });
        this.policyResult$ = this.policyService.dealer();
    }
    DealerContractComponent.prototype.onAcknowledge = function () {
        var _this = this;
        this.dealerService
            .acknowledgeDealerContract()
            .first()
            .subscribe(function () { return _this.currentDealer$ = _this.dealerService.getCurrentDealer(); }, function (msg) { return _this.toastr.error(msg); });
    };
    return DealerContractComponent;
}());
DealerContractComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/dealer/dealer-contract/dealer-contract.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_dealer_client_service__["a" /* DealerClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_dealer_client_service__["a" /* DealerClientService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__order_services_policy_client_service__["a" /* PolicyClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__order_services_policy_client_service__["a" /* PolicyClientService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_toastr__["ToastsManager"]) === "function" && _c || Object])
], DealerContractComponent);

var _a, _b, _c;
//# sourceMappingURL=dealer-contract.component.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/dealer-projections/dealer-projections-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerProjectionsPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_dealer_client_service__ = __webpack_require__("../../../../../src/app/dealer/services/dealer-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__order_services_policy_client_service__ = __webpack_require__("../../../../../src/app/order/services/policy-client.service.ts");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DealerProjectionsPageComponent = (function () {
    function DealerProjectionsPageComponent(dealerService, policyService, toastr) {
        var _this = this;
        this.dealerService = dealerService;
        this.policyService = policyService;
        this.toastr = toastr;
        this.currentDealerProjections$ = this
            .dealerService
            .getCurrentDealerProjections()
            .share();
        this.flagProjectionsList = function (projectionsList) {
            return projectionsList.map(function (projections) { return (__assign({}, projections, { Submitted: true })); });
        };
        this.policyResult$ = this.policyService.dealer();
        this.submitProjections = function (projections) {
            return _this.dealerService
                .updateCurrentDealerProjections(_this.flagProjectionsList(projections))
                .first()
                .subscribe(function () { return _this.toastr.success("Your projections have been submitted."); }, function (msg) { return _this.toastr.error("An error occured while submitting your projections."); });
        };
        this.canSubmit = function (projections) {
            return projections.every(function (p) { return !p.Submitted; });
        };
    }
    return DealerProjectionsPageComponent;
}());
DealerProjectionsPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n        <policy-summary\n            [policyResult]=\"policyResult$ | async\"\n            successMessage=\"You have already Acknowledged your submitted your Model Projections.\"\n            successRoute=\"/manage/orders\"\n            successRouteName=\"Manage your orders\"></policy-summary>\n\n        <div *ngIf=\"currentDealerProjections$ | async as projections\" class=\"container\">\n            <mb-dealer-projections [projections]=\"projections\"></mb-dealer-projections>\n            <div class=\"row\">\n                <button\n                    [disabled]=\"!canSubmit(projections)\"\n                    (click)=\"submitProjections(projections)\"\n                    class=\"btn btn-primary\">Submit</button>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_dealer_client_service__["a" /* DealerClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_dealer_client_service__["a" /* DealerClientService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__order_services_policy_client_service__["a" /* PolicyClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__order_services_policy_client_service__["a" /* PolicyClientService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ng2_toastr__["ToastsManager"]) === "function" && _c || Object])
], DealerProjectionsPageComponent);

var _a, _b, _c;
//# sourceMappingURL=dealer-projections-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/dealer-projections/dealer-projections.component.html":
/***/ (function(module, exports) {

module.exports = "<table class=\"table\">\n  <thead>\n    <tr>\n        <th>Item</th>\n        <th *ngFor=\"let map of monthMap\">{{ map.month }}</th>\n      </tr>\n  </thead>\n  <tbody>\n    <tr *ngFor=\"let p of specificationProjections\">\n      <td>{{ (specificationLookup[p.SpecificationID] | async)?.DisplayName }}</td>\n      <td *ngFor=\"let map of monthMap\">\n        <input [disabled]=\"projections.Submitted\" [(ngModel)]=\"p[map.field]\" style=\"height: 100%; width:100%\" type=\"number\" />\n      </td>\n    </tr>\n    <tr *ngFor=\"let p of artifactProjections\">\n      <td>{{ (artifactLookup[p.ArtifactID] | async)?.DisplayName }}</td>\n      <td *ngFor=\"let map of monthMap\">\n        <input [disabled]=\"projections.Submitted\" [(ngModel)]=\"p[map.field]\" style=\"height: 100%; width:100%\" type=\"number\" />\n      </td>\n    </tr>\n  </tbody>\n</table>\n"

/***/ }),

/***/ "../../../../../src/app/dealer/dealer-projections/dealer-projections.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerProjectionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__artifact_services_artifact_client_service__ = __webpack_require__("../../../../../src/app/artifact/services/artifact-client.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DealerProjectionsComponent = (function () {
    function DealerProjectionsComponent(specificationService, artifactService) {
        this.specificationService = specificationService;
        this.artifactService = artifactService;
        this._projections = [];
        this.artifactProjections = [];
        this.specificationProjections = [];
        this.specificationLookup = {};
        this.artifactLookup = {};
        this.monthMap = [
            { field: 'Month01Quantity', month: 'Jul' },
            { field: 'Month02Quantity', month: 'Aug' },
            { field: 'Month03Quantity', month: 'Sep' },
            { field: 'Month04Quantity', month: 'Oct' },
            { field: 'Month05Quantity', month: 'Nov' },
            { field: 'Month06Quantity', month: 'Dec' },
            { field: 'Month07Quantity', month: 'Jan' },
            { field: 'Month08Quantity', month: 'Feb' },
            { field: 'Month09Quantity', month: 'Mar' },
            { field: 'Month10Quantity', month: 'Apr' },
            { field: 'Month11Quantity', month: 'May' },
            { field: 'Month12Quantity', month: 'Jun' },
        ];
    }
    Object.defineProperty(DealerProjectionsComponent.prototype, "projections", {
        get: function () { return this._projections; },
        set: function (value) {
            var _this = this;
            this._projections = value || [];
            this.specificationProjections = this
                ._projections
                .filter(function (p) { return p.SpecificationID; });
            this.artifactProjections = this
                ._projections
                .filter(function (p) { return p.ArtifactID; });
            this.specificationLookup = this
                .specificationProjections
                .reduce(function (prev, curr) {
                prev[curr.SpecificationID] = _this.specificationService.getByID(curr.SpecificationID);
                return prev;
            }, {});
            this.artifactLookup = this
                .artifactProjections
                .reduce(function (prev, curr) {
                prev[curr.ArtifactID] = _this.artifactService.getArtifact(curr.ArtifactID);
                return prev;
            }, {});
        },
        enumerable: true,
        configurable: true
    });
    return DealerProjectionsComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DealerProjectionsComponent.prototype, "projections", null);
DealerProjectionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'mb-dealer-projections',
        template: __webpack_require__("../../../../../src/app/dealer/dealer-projections/dealer-projections.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_2__artifact_services_artifact_client_service__["a" /* ArtifactClientService */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["SpecificationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["SpecificationService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__artifact_services_artifact_client_service__["a" /* ArtifactClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__artifact_services_artifact_client_service__["a" /* ArtifactClientService */]) === "function" && _b || Object])
], DealerProjectionsComponent);

var _a, _b;
//# sourceMappingURL=dealer-projections.component.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/dealer.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=dealer.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/idealer-projections.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=idealer-projections.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dealer__ = __webpack_require__("../../../../../src/app/dealer/dealer.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dealer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__dealer__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "DealerClientService")) __webpack_require__.d(__webpack_exports__, "DealerClientService", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["DealerClientService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "DealerContractComponent")) __webpack_require__.d(__webpack_exports__, "DealerContractComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["DealerContractComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "DealerProjectionsComponent")) __webpack_require__.d(__webpack_exports__, "DealerProjectionsComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["DealerProjectionsComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "DealerProjectionsPageComponent")) __webpack_require__.d(__webpack_exports__, "DealerProjectionsPageComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["DealerProjectionsPageComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "IDealer")) __webpack_require__.d(__webpack_exports__, "IDealer", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["IDealer"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "ManageDealerCardComponent")) __webpack_require__.d(__webpack_exports__, "ManageDealerCardComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["ManageDealerCardComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "ManageDealerListComponent")) __webpack_require__.d(__webpack_exports__, "ManageDealerListComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["ManageDealerListComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__dealer__, "ManageDealerPageComponent")) __webpack_require__.d(__webpack_exports__, "ManageDealerPageComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__dealer__["ManageDealerPageComponent"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idealer_projections__ = __webpack_require__("../../../../../src/app/dealer/idealer-projections.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__idealer_projections___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "DealerClientService")) __webpack_require__.d(__webpack_exports__, "DealerClientService", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["DealerClientService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "DealerContractComponent")) __webpack_require__.d(__webpack_exports__, "DealerContractComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["DealerContractComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "DealerProjectionsComponent")) __webpack_require__.d(__webpack_exports__, "DealerProjectionsComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["DealerProjectionsComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "DealerProjectionsPageComponent")) __webpack_require__.d(__webpack_exports__, "DealerProjectionsPageComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["DealerProjectionsPageComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "IDealer")) __webpack_require__.d(__webpack_exports__, "IDealer", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["IDealer"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "ManageDealerCardComponent")) __webpack_require__.d(__webpack_exports__, "ManageDealerCardComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["ManageDealerCardComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "ManageDealerListComponent")) __webpack_require__.d(__webpack_exports__, "ManageDealerListComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["ManageDealerListComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__idealer_projections__, "ManageDealerPageComponent")) __webpack_require__.d(__webpack_exports__, "ManageDealerPageComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__idealer_projections__["ManageDealerPageComponent"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_dealer_client_service__ = __webpack_require__("../../../../../src/app/dealer/services/dealer-client.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "DealerClientService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_dealer_client_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dealer_contract_dealer_contract_component__ = __webpack_require__("../../../../../src/app/dealer/dealer-contract/dealer-contract.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "DealerContractComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__dealer_contract_dealer_contract_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dealer_projections_dealer_projections_component__ = __webpack_require__("../../../../../src/app/dealer/dealer-projections/dealer-projections.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "DealerProjectionsComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__dealer_projections_dealer_projections_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__dealer_projections_dealer_projections_page_component__ = __webpack_require__("../../../../../src/app/dealer/dealer-projections/dealer-projections-page.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "DealerProjectionsPageComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__dealer_projections_dealer_projections_page_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__manage_manage_dealer_list_component__ = __webpack_require__("../../../../../src/app/dealer/manage/manage-dealer-list.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ManageDealerListComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__manage_manage_dealer_list_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__manage_manage_dealer_card_component__ = __webpack_require__("../../../../../src/app/dealer/manage/manage-dealer-card.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ManageDealerCardComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__manage_manage_dealer_card_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__manage_manage_dealer_page_component__ = __webpack_require__("../../../../../src/app/dealer/manage/manage-dealer-page.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ManageDealerPageComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__manage_manage_dealer_page_component__["a"]; });









//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/manage/manage-dealer-card.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageDealerCardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__("../../../../../src/app/dealer/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ManageDealerCardComponent = (function () {
    function ManageDealerCardComponent(dealerService) {
        this.dealerService = dealerService;
        this._dealer = {};
    }
    Object.defineProperty(ManageDealerCardComponent.prototype, "dealer", {
        get: function () { return this._dealer; },
        set: function (dealer) {
            if (!dealer) {
                return;
            }
            this._dealer = dealer;
            this.projections$ = this.dealerService.getDealerProjections(this._dealer.ID).take(1);
        },
        enumerable: true,
        configurable: true
    });
    return ManageDealerCardComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1____["IDealer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1____["IDealer"]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1____["IDealer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1____["IDealer"]) === "function" && _b || Object])
], ManageDealerCardComponent.prototype, "dealer", null);
ManageDealerCardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'mb-dealer-card',
        template: "\n        <div *ngIf=\"dealer\">\n            <h2>{{ dealer?.Name || 'Default' }}</h2>\n            <address>\n                {{ dealer.Street }}<br>\n                {{ dealer.City }}, {{ dealer.State }} {{ dealer.Zip }}<br>\n                Phone: {{ dealer.Phone }}<br>\n                Fax: {{ dealer.Fax }}\n            </address>\n            <p>\n                Contract Acknowledged: <strong>{{ dealer.ContractAcknowledged ? 'Yes' : 'No' }}</strong>\n                <a *ngIf=\"dealer.ContractUrl\" href=\"{{ dealer.ContractUrl }}\" target=\"_blank\" class=\"btn btn-primary\"><i class=\"fa fa-save\"></i> Download Contract</a>\n            </p>\n\n            <h2>Projections</h2>\n            <mb-dealer-projections [projections]=\"projections$ | async\"></mb-dealer-projections>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1____["DealerClientService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1____["DealerClientService"]) === "function" && _c || Object])
], ManageDealerCardComponent);

var _a, _b, _c;
//# sourceMappingURL=manage-dealer-card.component.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/manage/manage-dealer-list.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageDealerListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ManageDealerListComponent = (function () {
    function ManageDealerListComponent() {
        var _this = this;
        this.dealers = [];
        this.dealerSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.selectDealer = function (event, dealer) {
            event.preventDefault();
            _this.currentDealer = dealer;
            _this.dealerSelected.emit(dealer);
        };
    }
    return ManageDealerListComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], ManageDealerListComponent.prototype, "dealers", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], ManageDealerListComponent.prototype, "dealerSelected", void 0);
ManageDealerListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'mb-dealer-list',
        template: "\n        <div class=\"list-group\">\n        <a *ngFor=\"let dealer of dealers\"\n            (click)=\"selectDealer($event, dealer)\"\n            [ngClass]=\"{ active: dealer === currentDealer }\"\n            href=\"#\"\n            class=\"list-group-item\"\n            >{{ dealer.Name }}</a>\n        </div>\n    "
    })
], ManageDealerListComponent);

//# sourceMappingURL=manage-dealer-list.component.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/manage/manage-dealer-page.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageDealerPageComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1____ = __webpack_require__("../../../../../src/app/dealer/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ManageDealerPageComponent = (function () {
    function ManageDealerPageComponent(dealerService) {
        var _this = this;
        this.dealerService = dealerService;
        this.dealers$ = this
            .dealerService
            .getDealers();
        this.onDealerSelected = function (dealer) { return _this.currentDealer = dealer; };
    }
    return ManageDealerPageComponent;
}());
ManageDealerPageComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: "\n        <div class=\"container\">\n            <div class=\"col-md-3\">\n                <mb-dealer-list [dealers]=\"dealers$ | async\" (dealerSelected)=\"onDealerSelected($event)\" ></mb-dealer-list>\n            </div>\n            <div class=\"col-md-9\">\n                <mb-dealer-card [dealer]=\"currentDealer\"></mb-dealer-card>\n            </div>\n        </div>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1____["DealerClientService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1____["DealerClientService"]) === "function" && _a || Object])
], ManageDealerPageComponent);

var _a;
//# sourceMappingURL=manage-dealer-page.component.js.map

/***/ }),

/***/ "../../../../../src/app/dealer/services/dealer-client.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealerClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DealerClientService = DealerClientService_1 = (function (_super) {
    __extends(DealerClientService, _super);
    function DealerClientService(http, diag, auth) {
        var _this = _super.call(this, http, diag, '/', 'http://localhost:44337/api/dealers') || this;
        _this.getDealers = function () {
            return _this.httpGet('', function (res) { return res.json(); });
        };
        _this.getCurrentDealer = function () {
            return _this.httpGet('/me', function (res) { return res.json(); });
        };
        _this.acknowledgeDealerContract = function () {
            return _this.httpPost('/me/contract/acknowledge', {}, function (res) { return true; });
        };
        _this.getCurrentDealerProjections = function () {
            return _this.httpGet('/me/projections/2019', function (res) { return res.json(); });
        };
        _this.updateCurrentDealerProjections = function (projections) {
            return _this.httpPost('/me/projections/2019', projections, function (res) { return res; });
        };
        _this.getDealerProjections = function (id) {
            return _this.httpGet("/projections/" + id + "/2019", function (res) { return res.json(); });
        };
        _this.serviceName = DealerClientService_1.name;
        return _this;
    }
    return DealerClientService;
}(__WEBPACK_IMPORTED_MODULE_2__shared_services_base_proxy_service__["a" /* BaseProxy */]));
DealerClientService = DealerClientService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"]) === "function" && _c || Object])
], DealerClientService);

var DealerClientService_1, _a, _b, _c;
//# sourceMappingURL=dealer-client.service.js.map

/***/ }),

/***/ "../../../../../src/app/discount/discount.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=discount.js.map

/***/ }),

/***/ "../../../../../src/app/discount/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__discount__ = __webpack_require__("../../../../../src/app/discount/discount.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__discount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__discount__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__discount__, "DiscountService")) __webpack_require__.d(__webpack_exports__, "DiscountService", function() { return __WEBPACK_IMPORTED_MODULE_0__discount__["DiscountService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__discount__, "asLookup")) __webpack_require__.d(__webpack_exports__, "asLookup", function() { return __WEBPACK_IMPORTED_MODULE_0__discount__["asLookup"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_discount_service__ = __webpack_require__("../../../../../src/app/discount/services/discount.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "DiscountService", function() { return __WEBPACK_IMPORTED_MODULE_1__services_discount_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "asLookup", function() { return __WEBPACK_IMPORTED_MODULE_1__services_discount_service__["b"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/discount/services/discount.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DiscountService; });
/* harmony export (immutable) */ __webpack_exports__["b"] = asLookup;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_catch__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DiscountService = (function (_super) {
    __extends(DiscountService, _super);
    function DiscountService(auth, http, diag) {
        var _this = _super.call(this, http, diag, '/', 'http://localhost:44337/api/discount') || this;
        _this.auth = auth;
        _this.http = http;
        _this.diag = diag;
        return _this;
    }
    DiscountService.prototype.getDiscount = function () {
        return this.httpGet('/', function (res) { return res.json() || []; });
    };
    DiscountService.prototype.getDealerModelDiscount = function (discountKey, dealerID) {
        return this
            .httpGet("/discountkey/" + discountKey + "/dealerID/" + dealerID, function (res) { return res.json() || []; });
    };
    DiscountService.prototype.getDiscountForOrder = function (orderID, dealerID) {
        return this
            .httpGet("/" + orderID + "/" + dealerID, function (res) { return res.json() || []; });
    };
    return DiscountService;
}(__WEBPACK_IMPORTED_MODULE_4__shared_services_base_proxy_service__["a" /* BaseProxy */]));
DiscountService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], DiscountService);

function asLookup(discounts$) {
    return discounts$
        .map(function (ds) { return ds
        .reduce(function (prev, curr) {
        var keyLookup = prev[curr.DiscountKey] || {};
        var priceLevelLookup = keyLookup[curr.PriceLevel] || [];
        priceLevelLookup.push(curr);
        keyLookup[curr.PriceLevel] = priceLevelLookup;
        prev[curr.DiscountKey] = keyLookup;
        return prev;
    }, {}); });
}
var _a, _b, _c;
//# sourceMappingURL=discount.service.js.map

/***/ }),

/***/ "../../../../../src/app/home/components/home.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n:root {\n    --main-bg-color: #f00b0b;\n}\n\n@media (max-width: 769px) and (orientation: landscape) {\n    top-navigation {\n        display: none;\n    }\n}\n\n.padding-t-0 { padding-top: 0; }\n.padding-t-1 { padding-top: 1%; }\n.padding-t-2 { padding-top: 2%; }\n.padding-t-3 { padding-top: 3%; }\n.padding-t-4 { padding-top: 4%; }\n\n.padding-r-0 { padding-right: 0; }\n.padding-r-1 { padding-right: 1%; }\n.padding-r-2 { padding-right: 2%; }\n.padding-r-3 { padding-right: 3%; }\n.padding-r-4 { padding-right: 4%; }\n\n.padding-b-0 { padding-bottom: 0; }\n.padding-b-1 { padding-bottom: 1%; }\n.padding-b-2 { padding-bottom: 2%; }\n.padding-b-3 { padding-bottom: 3%; }\n.padding-b-4 { padding-bottom: 4%; }\n\n.padding-l-0 { padding-left: 0; }\n.padding-l-1 { padding-left: 1%; }\n.padding-l-2 { padding-left: 2%; }\n.padding-l-3 { padding-left: 3%; }\n.padding-l-4 { padding-left: 4%; }\n\n.color-swatch {\n    box-shadow: 2px 2px 5px #888888;\n    -webkit-box-shadow: 2px 2px 5px #888888;\n    -moz-box-shadow: 2px 2px 5px #888888;\n    margin: auto 3px;\n    height: 50px;\n    width: 50px;\n}\n\n.color-swatch:hover {\n    border: 5px solid rgba(255, 0, 0, 0.50);\n}\n\n.color-swatch > img {\n    height: 50px;\n    width: 50px;\n}\n\n@media (min-width: 768px) {\n    .color-swatch {\n        margin-bottom: 0;\n        box-shadow: 2px 2px 5px #888888;\n        -webkit-box-shadow: 2px 2px 5px #888888;\n        -moz-box-shadow: 2px 2px 5px #888888;\n        height: 45px;\n        width: 45px;\n    }\n    .color-swatch > img {\n        height: 45px;\n        width: 45px;\n    }\n}\n\n.color-swatch-name {\n    margin-top: 5px;\n    /*white-space: nowrap;*/\n    font-size: 1.2rem;\n}\n\n.color-swatch.selected::after {\n    content: \"\\F00C\";\n    display: inline-block;\n    color: var(--main-bg-color);\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: 3rem;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n}\n\n.color-swatch-container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n    /*justify-content: center;*/\n}\n\n.model {\n    height: 200px;\n    cursor: pointer;\n    box-shadow: 0 0 0 rgba(0,0,0,0.2);\n    border: 1px solid #898989;\n}\n\n.feature {\n    cursor: pointer;\n    color: #898989;\n    margin-bottom: 10px !important;\n}\n\n@media (min-width: 320px) and (max-width: 425px) {\n    .feature {\n        height: inherit;\n        margin-bottom: 5px !important;\n    }\n    .feature .caption {\n        padding: 5px !important;\n    }\n    .feature .caption p {\n        margin: 0;\n    }\n    .panel-body {\n        padding: 0 !important;\n    }\n}\n\n.model .img {\n    filter: grayscale(100%);\n    -webkit-filter: grayscale(100%);\n    -moz-filter:    grayscale(100%);\n    -ms-filter:     grayscale(100%);\n    -o-filter:      grayscale(100%);\n    border-top-left-radius: 4px;\n    border-top-right-radius: 4px;\n    box-shadow: inset 0px 0px 100px -8px rgba(0,0,0,0.25);\n    height: 124px;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n}\n\n.feature.selected {\n    box-shadow: 0 0 5px rgba(255,0,0,0.9);\n    border: solid 1px rgba(255,0,0,0.9);\n}\n\n.feature.selected[data-defaultitem='true'] {\n    background: initial;\n    color: #666;\n}\n\n.feature.selected[data-defaultitem='true'] .fa-check {\n    color: #F00;\n}\n\n.feature.selected:hover {\n    box-shadow: 0 0 20px rgba(0,0,0,0.2);\n    background-color: solid 1px rgba(255,0,0,0.9);\n    border: solid 1px rgba(255,0,0,0.9);\n    text-decoration: none !important;\n}\n\n.feature.selected .img{\n    filter: none;\n    -webkit-filter: none;\n    -moz-filter:    grayscale(0%);\n    -ms-filter:     grayscale(0%);\n    -o-filter:      grayscale(0%);\n    box-shadow: inset 0px 0px 100px -8px rgba(0,0,0,0.0);\n}\n\n.feature.selected .info-box-img {\n    filter: none;\n    -webkit-filter: none;\n    -moz-filter:    grayscale(0%);\n    -ms-filter:     grayscale(0%);\n    -o-filter:      grayscale(0%);\n    box-shadow: inset 0px 0px 191px 35px rgba(0,0,0,0.0);\n}\n\n.feature:hover, .model:hover {\n    box-shadow: 0 0 20px rgba(0,0,0,0.2);\n    color: var(--main-bg-color);\n    border: solid 1px rgba(255,255,255,0.0);\n    text-decoration: none;\n}\n\n.feature:hover .info-box-img, .model:hover .img {\n    filter: none;\n    -webkit-filter: none;\n    -moz-filter:    grayscale(0%);\n    -ms-filter:     grayscale(0%);\n    -o-filter:      grayscale(0%);\n    box-shadow: inset 0px 0px 100px -8px rgba(0,0,0,0.0);\n}\n\n.feature div.caption p {\n    overflow: hidden;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 12px;\n}\n\n.truncate {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.floating-btn {\n    position: absolute;\n    z-index: 99;\n}\n\n.floating-btn-right {\n    right: 5%;\n}\n\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n    max-height: 380px !important;\n}\n/*\n * Component: Info Box\n * -------------------\n */\n.info-box {\n  display: block;\n  min-height: 90px;\n  background: #fff;\n  width: 100%;\n  box-shadow: 0px 0px 13px rgba(0, 0, 0, 0.13);\n  border-radius: 2px;\n  margin-bottom: 15px;\n}\n.info-box small {\n  font-size: 14px;\n}\n.info-box .progress {\n  background: rgba(0, 0, 0, 0.2);\n  margin: 5px -10px 5px -10px;\n  height: 2px;\n}\n.info-box .progress,\n.info-box .progress .progress-bar {\n  border-radius: 0;\n}\n.info-box .progress .progress-bar {\n  background: #fff;\n}\n.info-box-icon {\n  border-top-left-radius: 2px;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 2px;\n  display: block;\n  float: left;\n  height: 90px;\n  width: 90px;\n  text-align: center;\n  font-size: 45px;\n  line-height: 90px;\n  background: rgba(0, 0, 0, 0.2);\n}\n.info-box-icon > img {\n  max-width: 100%;\n}\n.info-box-content {\n  padding: 5px 10px;\n  margin-left: 90px;\n}\n.info-box-number {\n  display: block;\n  font-weight: bold;\n  font-size: 18px;\n}\n.progress-description,\n.info-box-text {\n  display: block;\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.info-box-more {\n  display: block;\n}\n.info-box-img {\n    border-radius: 0;\n    display: block;\n    float: left;\n    height: 90px;\n    width: 90px;\n    text-align: center;\n    font-size: 45px;\n    line-height: 90px;\n    background: rgba(0, 0, 0, 0.2);\n    filter: grayscale(100%);\n    -webkit-filter: grayscale(100%);\n    -moz-filter:    grayscale(100%);\n    -ms-filter:     grayscale(100%);\n    -o-filter:      grayscale(100%);\n    box-shadow: inset 0px 0px 100px -8px rgba(0,0,0,0.25);\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n}\n\n.info-box:hover .info-box-img {\n    filter: none;\n    -webkit-filter: none;\n    -moz-filter:    grayscale(0%);\n    -ms-filter:     grayscale(0%);\n    -o-filter:      grayscale(0%);\n    box-shadow: inset 0px 0px 100px -8px rgba(0,0,0,0.0);\n}\n\n.info-box.selected { \n    background-color: var(--main-bg-color);\n    color: #fff;\n}\n\n.info-box-footer {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    margin-bottom: 20px;\n    margin-right: 30px;\n}\n\n.btn.btn-radio {\n    text-align: left;\n    border: none;\n    box-shadow: none;\n    color: #666;\n}\n\n.btn.btn-radio.focus {\n    border:none;\n    outline:none;\n}\n\n.btn.btn-radio.active::before {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    content: \"\\F14A\";\n}\n\n.btn.btn-radio::before {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    content: \"\\F096\";\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/home/components/home.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n\n<div class=\"container\" *ngIf=\"specifications$ | async\">\n    <div *ngFor=\"let year of years$ | async\" class=\"clearfix\">\n        <h2>{{year}} Models</h2>\n        <cwd-specification-display *ngFor=\"let specification of specByYear[year]\" (specificationSelectedEvent)=\"specificationSelectedEventHandler($event)\" [specification]=\"specification\"></cwd-specification-display>\n    </div>\n</div>\n\n<div bsModal #programModal=\"bs-modal\" class=\"modal modal-success fade\" tabindex=\"-1\" role=\"dialog\"\n     aria-labelledby=\"programModal\" aria-hidden=\"true\"\n     [config]=\"{backdrop: 'static'}\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Creating an Order</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"form-group\" *ngIf=\"availableDealers && appState.CurrentUser.IsAdmin\">\n                    <label>Create order as:</label>\n                    <div class=\"btn-group-vertical btn-block\" data-toggle=\"buttons\">\n                        <select class=\"form-control\" (change)=\"selectedDealerChanged($event.target.value)\">\n                            <option *ngFor=\"let dealer of availableDealers\" value=\"{{dealer.DealerID}}\" selected=\"{{ dealer.DealerID === appState.CurrentUser.DealerID ? 'selected' : '' }}\">{{dealer.Name}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\" *ngIf=\"showPrograms\">\n                    <label>Please select a payment option:</label>\n                    <div class=\"btn-group-vertical btn-block\" data-toggle=\"buttons\">\n                        <label class=\"btn btn-radio\" *ngFor=\"let program of availablePrograms[selectedProgramKey][appState.CurrentUser.PriceLevel]\" (click)=\"selectedProgram = program\">\n                            <input type=\"radio\" name=\"program\" autocomplete=\"off\" value=\"{{program.DiscountTypeID}}\" />{{program.DiscountTypeName}}\n                        </label>\n                    </div>\n                </div>\n                <button class=\"btn btn-primary\" disabled=\"{{ !showPrograms || selectedProgram ? '' : 'disabled'}}\" (click)=\"createOrderClickedHandler()\"><i class=\"fa fa-plus\"></i> Create Order</button>\n                <button class=\"btn btn-default\" (click)=\"programModal.hide()\"><i class=\"fa fa-close\"></i> Cancel</button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/home/components/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification__ = __webpack_require__("../../../../../src/app/specification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pricing__ = __webpack_require__("../../../../../src/app/pricing/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__discount__ = __webpack_require__("../../../../../src/app/discount/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomeComponent = HomeComponent_1 = (function () {
    function HomeComponent(settingService, appState, router, specificationService, discountService, auth, priceService, diag, d) {
        var _this = this;
        this.settingService = settingService;
        this.appState = appState;
        this.router = router;
        this.specificationService = specificationService;
        this.discountService = discountService;
        this.auth = auth;
        this.priceService = priceService;
        this.diag = diag;
        this.d = d;
        this.specByYear = {};
        this.specifications$ = this
            .settingService
            .applicationSetting$
            .filter(function (setting) { return setting !== null; })
            .map(function (setting) { return setting['ModelYear']; })
            .switchMap(function (year) { return _this
            .specificationService
            .getBySpecificationTypeNameAndDepth('Model')
            .map(function (ss) { return ss
            .filter(function (s) { return !!s; })
            .filter(function (s) {
            return (_this.isAdm(_this.appState.CurrentUser.Email)) ?
                s.Metadata['ui.designer.model.year'] === year || +s.Metadata['ui.designer.model.year'] === +year + 1 :
                s.Metadata['ui.designer.model.year'] === year;
        })
            .reduce(function (lookup, curr) {
            var year = curr.Metadata['ui.designer.model.year'];
            var models = lookup[year] || [];
            models.push(curr);
            lookup[year] = models;
            return lookup;
        }, {}); }); });
        this.years$ = this
            .specifications$
            .map(function (s) { return Object.keys(s); });
    }
    HomeComponent.prototype.isAdm = function (user) {
        return user === 'sophcon' || user === 'dustin' || user === 'blake';
    };
    HomeComponent.prototype.lookupByYear$ = function (year) {
        return this
            .specifications$
            .map(function (s) { return s[year]; });
    };
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //console.log("ertrertr",);
        console.log(this.d.location);
        this.specifications$
            .first()
            .subscribe(function (s) { return _this.specByYear = s; });
        this.appState.selectedProgram = null;
        this.availablePrograms = {};
        this.appState.resetImpersonation();
        this.showPrograms = false;
        this.appState.editOrder = null;
        if (this.appState.configuration) {
            this.appState.resetConfiguration();
        }
        if (this.auth.isLoggedIn()) {
            Object(__WEBPACK_IMPORTED_MODULE_7__discount__["asLookup"])(this.discountService.getDiscount())
                .subscribe(function (discounts) { return _this.availablePrograms = discounts; });
            if (this.appState.CurrentUser.IsAdmin) {
                this.getPricingLevels();
            }
        }
    };
    HomeComponent.prototype.specificationSelectedEventHandler = function (arg) {
        this.selectedProgramKey = arg.specification.Metadata["domain.mb.rebate.key"];
        if (this.appState.CurrentUser.Dealer && !!this.availablePrograms[this.selectedProgramKey][this.appState.CurrentUser.PriceLevel]) {
            this.selectedSpecification = arg.specification;
            this.showPrograms = !!this.availablePrograms[this.selectedProgramKey] && !!this.availablePrograms[this.selectedProgramKey][this.appState.CurrentUser.PriceLevel] && this.availablePrograms[this.selectedProgramKey][this.appState.CurrentUser.PriceLevel].length > 0;
            this.programModal.show();
        }
        else {
            this.router.navigate(['/model', arg.specification.ID]);
        }
    };
    HomeComponent.prototype.createOrderClickedHandler = function () {
        this.appState.selectedProgram = this.showPrograms ? this.selectedProgram : null;
        this.router.navigate(['/model', this.selectedSpecification.ID]);
    };
    HomeComponent.prototype.getPricingLevels = function () {
        var _this = this;
        this.priceService.getDealerPricingLevels().subscribe(function (pricingLevels) { return _this.availableDealers = pricingLevels; }, function (error) {
            _this.diag.logError('Error getting dealer price levels', HomeComponent_1.name);
        });
    };
    HomeComponent.prototype.selectedDealerChanged = function (dealerID) {
        var dealer = this.availableDealers.find(function (d) { return d.DealerID === +dealerID; });
        this.showPrograms = !!this.availablePrograms[this.selectedProgramKey] && !!this.availablePrograms[this.selectedProgramKey][dealer.PriceLevel] && this.availablePrograms[this.selectedProgramKey][dealer.PriceLevel].length > 0;
        if (dealer && this.appState.CurrentUser.DealerID !== dealer.DealerID) {
            this.appState.setImpersonation(dealer.PriceLevel, dealer.DealerID, dealer.Name);
        }
    };
    return HomeComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('programModal'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _a || Object)
], HomeComponent.prototype, "programModal", void 0);
HomeComponent = HomeComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/home/components/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/home/components/home.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_2__specification__["SpecificationService"], __WEBPACK_IMPORTED_MODULE_7__discount__["DiscountService"]]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__application_setting__["ApplicationSettingService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__specification__["SpecificationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__specification__["SpecificationService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__discount__["DiscountService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__discount__["DiscountService"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_5__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__auth__["AuthService"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_6__pricing__["PricingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__pricing__["PricingService"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_9__angular_common__["PlatformLocation"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__angular_common__["PlatformLocation"]) === "function" && _k || Object])
], HomeComponent);

var HomeComponent_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/home/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_component__ = __webpack_require__("../../../../../src/app/home/components/home.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_home_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/interactive-designer/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__layouts_main_layout_component__ = __webpack_require__("../../../../../src/app/interactive-designer/layouts/main-layout.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__layouts_main_layout_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__summary_component__ = __webpack_require__("../../../../../src/app/interactive-designer/summary.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__summary_component__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/interactive-designer/layouts/main-layout.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".site-footer.site-footer-fixed {\n    position: fixed;\n    height: auto;\n}\n.title-summary {\n    position:absolute;\n    top: auto;\n    right: 0;\n    bottom: 0;\n    left: auto;\n    text-align: right;\n}\n\n.title-summary h1 {\n    border-bottom: 2px solid red; \n    padding-bottom: 5px\n}\n\n@media (max-width: 769px) and (orientation: landscape) {\n    .interactive-designer .content {\n        display: none;\n    }\n    .site-footer {\n        display: none;\n    }\n}\n@media (min-width: 320px) and (max-width: 426px) {\n    .site-footer {\n        overflow: hidden;\n        height: auto;\n    }\n\n    .interactive-designer .header  {\n        width: 100%;\n        position: fixed;\n        overflow: hidden;\n        z-index: 1;\n        background-color: #FCFCFC;\n        padding: 0;\n        margin: -10px 0 0 0;\n    }\n\n    .interactive-designer .content {\n        margin-top: 49%;\n        overflow: auto;\n        width: 100%;\n        padding: inherit;\n    }\n}\n@media (max-width: 320px) and (orientation: portrait) {\n    .interactive-designer .content {\n        margin-top: 55%;\n    }\n}\n\n.site-footer {\n    background-color: rgba(255,255,255,0.9);\n    bottom: 0;\n    width: 100%;\n    z-index: 1001;\n    position: absolute;\n    height: auto;\n    padding: 10px;\n}\n\n.mobile-landscape-stage {\n    position: absolute; \n    z-index: 9999; \n    width: 100%; \n    background-color: #666; \n    height: 100%; \n    top: 0;\n}\n\n.btn.btn-radio {\n    text-align: left;\n    border: none;\n    box-shadow: none;\n    color: #666;\n}\n\n.btn.btn-radio.focus {\n    border:none;\n    outline:none;\n}\n\n.btn.btn-radio.active::before {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    content: \"\\F14A\";\n}\n\n.btn.btn-radio::before {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    content: \"\\F096\";\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/interactive-designer/layouts/main-layout.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" style=\"padding-bottom:25px;\" *ngIf=\"settingService.applicationSetting$ | async\">\n    <div class=\"interactive-designer row\">\n        <div class=\"header text-center\">\n            <div *ngIf=\"specification && configuration\" style=\"position:relative\">\n                <configuration-svg-renderer [configuration]=\"configuration\" [specification]=\"specification\" [view]=\"view\" [navigation]=\"currentNavigation\"></configuration-svg-renderer>\n                <div class=\"title-summary\" [ngClass]=\"{'hidden': (bootstrapObj.Size === 'xs' || bootstrapObj.Size === 'sm')}\">\n                    <h2>{{specification.DisplayName}}</h2>\n                    <p *ngIf=\"calcService.CurrTotalSummary\">\n                        Boat Total: {{ calcService.CurrTotalSummary.BoatTotal | currency:(isoCurrencyCode$|async):true }} <br/>\n                        As Configured: {{ calcService.CurrTotalSummary.Total | currency:(isoCurrencyCode$|async):true }}\n                    </p>\n                </div>\n            </div>\n        </div>\n        <div class=\"navigation\">\n            <div *ngIf=\"specification\">\n                <cwd-specification-item-navigation [selectedID]=\"!!selectedSpecification ? selectedSpecification.ID : -1\" [specification]=\"specification\" (navigationClicked)=\"handleNavigationClicked($event)\"></cwd-specification-item-navigation>\n            </div>\n        </div>\n        <div class=\"content col-md-12\">\n            <div *ngIf=\"selectedSpecification && !showSummary\">\n                <cwd-specification-display [specification]=\"selectedSpecification\" [configuration]=\"configuration\" (specificationSelectedEvent)=\"handleSpecificationSelected($event)\"></cwd-specification-display>\n            </div>\n            <div *ngIf=\"showSummary\">\n                <cwd-summary [specification]=\"specification\" [configuration]=\"configuration\"></cwd-summary>\n            </div>\n        </div>\n    </div>\n</div>\n<footer class=\"site-footer site-footer-fixed text-gray-lightest hidden-sm hidden-md hidden-lg\" *ngIf=\"settingService.applicationSetting$ | async\">\n    <div title=\"showPrev: {{showPrev}}; showNext: {{showNext}}\">\n        <button [ngClass]=\"{'hidden': !showPrev}\" class=\"btn btn-default col-xs-2\" (click)=\"handleBackButtonClicked()\"><i class=\"fa fa-chevron-left\"></i></button>\n        <button [ngClass]=\"{'hidden': !showNext, 'col-xs-offset-6': !showPrev, 'col-xs-offset-4': showPrev}\" class=\"btn btn-primary col-xs-6 col-xs-offset-4\" (click)=\"handleNextButtonClicked()\">{{nextSpecName}} <i class=\"fa fa-chevron-right\"></i></button>\n    </div>\n</footer>\n\n<div bsModal #programModal=\"bs-modal\" class=\"modal modal-success fade\" tabindex=\"-1\" role=\"dialog\"\n     aria-labelledby=\"programModal\" aria-hidden=\"true\"\n     [config]=\"{backdrop: 'static'}\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Creating an Order</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"form-group\" *ngIf=\"availableDealers && appState.CurrentUser.IsAdmin\">\n                    <label>Create order as:</label>\n                    <div class=\"btn-group-vertical btn-block\" data-toggle=\"buttons\">\n                        <select class=\"form-control\" (change)=\"selectedDealerChanged($event.target.value)\">\n                            <option *ngFor=\"let dealer of availableDealers\" value=\"{{dealer.DealerID}}\" selected=\"{{ dealer.DealerID === appState.CurrentUser.DealerID ? 'selected' : '' }}\">{{dealer.Name}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"form-group\" *ngIf=\"showPrograms\">\n                    <label>Please select a payment option:</label>\n                    <div class=\"btn-group-vertical btn-block\" data-toggle=\"buttons\">\n                        <label class=\"btn btn-radio\" *ngFor=\"let program of availablePrograms[selectedProgramKey][appState.CurrentUser.PriceLevel]\" (click)=\"selectedProgram = program\">\n                            <input type=\"radio\" name=\"program\" autocomplete=\"off\" value=\"{{program.DiscountTypeID}}\" />{{program.DiscountTypeName}}\n                        </label>\n                    </div>\n                </div>\n                <button class=\"btn btn-primary\" disabled=\"{{ !showPrograms || selectedProgram ? '' : 'disabled'}}\" (click)=\"contuneConfigurationClicked()\"><i class=\"fa fa-arrow-right\"></i> Continue</button>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/interactive-designer/layouts/main-layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainLayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__specification__ = __webpack_require__("../../../../../src/app/specification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pricing__ = __webpack_require__("../../../../../src/app/pricing/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__discount__ = __webpack_require__("../../../../../src/app/discount/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__surcharge__ = __webpack_require__("../../../../../src/app/surcharge/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dealer__ = __webpack_require__("../../../../../src/app/dealer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_lodash__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var MainLayoutComponent = MainLayoutComponent_1 = (function (_super) {
    __extends(MainLayoutComponent, _super);
    function MainLayoutComponent(appState, settingService, specificationService, configurationService, router, route, diag, discountService, priceService, auth, surchargeService, toastr, calcService) {
        var _this = _super.call(this) || this;
        _this.appState = appState;
        _this.settingService = settingService;
        _this.specificationService = specificationService;
        _this.configurationService = configurationService;
        _this.router = router;
        _this.route = route;
        _this.diag = diag;
        _this.discountService = discountService;
        _this.priceService = priceService;
        _this.auth = auth;
        _this.surchargeService = surchargeService;
        _this.toastr = toastr;
        _this.calcService = calcService;
        _this.view = "Exterior";
        _this.nextSpecName = "";
        _this.optionsTotal = 0.0;
        _this.runningTotal = 0.0;
        _this.basePrice = 0.0;
        _this.currentNavigation = "";
        _this.bootStrapObj$.subscribe(function (obj) { return _this.bootstrapObj = obj; });
        _this.loadingConfig = false;
        return _this;
    }
    Object.defineProperty(MainLayoutComponent.prototype, "currentIndex", {
        get: function () {
            return !!this.specification && !!this.selectedSpecification ? this.specification.Children.indexOf(this.selectedSpecification) : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainLayoutComponent.prototype, "showNext", {
        get: function () {
            return this.currentIndex !== -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainLayoutComponent.prototype, "showPrev", {
        get: function () {
            return this.currentIndex === -1 || this.currentIndex > 0;
        },
        enumerable: true,
        configurable: true
    });
    MainLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.availablePrograms = {};
        this.showPrograms = false;
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
        //this.diag.logVerbose('Executing ngOninit().', `${MainLayoutComponent.name}.ngOnChanges()`)
        this.view = "Exterior";
        this.routeSub = this.route.params
            .filter(function (params) { return !!params['configurationID'] || !!params['id']; })
            .subscribe(function (params) {
            if (!!params['configurationID']) {
                _this.loadingConfig = true;
                _this.loadConfiguration(+params['configurationID']);
            }
            else if (!!params['id']) {
                if (!_this.appState && !_this.appState.configuration && _this.appState.configuration.RootSpecificationID !== +params['id']) {
                    _this.appState.resetConfiguration();
                }
                _this.specificationService
                    .getByID(+params['id'])
                    .subscribe(function (spec) {
                    if (_this.appState.configuration === null || (_this.appState.configuration && _this.appState.configuration.ID < 1 && _this.appState.configuration.RootSpecificationID !== spec.ID)) {
                        _this.appState.addRootConfiguration(spec);
                    }
                    if (_this.appState.configuration.RootSpecificationID === spec.ID) {
                        _this.appState.udpateConfigurationPricing(spec);
                    }
                    _this.configuration = _this.appState.configuration;
                    _this.setSpecification(spec);
                });
            }
        }, function (error) { return _this.diag.logError('Error getting parameters.', MainLayoutComponent_1.name + ".ngOnInit()"); });
        this.loadSurcharges();
        this.configurationChangedEmitter = this.appState
            .onConfigurationChanged
            .subscribe(function (c) {
            if (!_this.loadingConfig) {
                _this.configuration = c || _this.configuration;
                if (_this.configuration) {
                    _this.loadSpecification(_this.configuration.RootSpecificationID);
                }
            }
        });
        if (this.auth.isLoggedIn()) {
            Object(__WEBPACK_IMPORTED_MODULE_6__discount__["asLookup"])(this.discountService.getDiscount())
                .subscribe(function (discounts) {
                _this.availablePrograms = discounts;
                _this.loadProgram(_this.specification);
            });
            if (this.appState.CurrentUser.IsAdmin) {
                this.getPricingLevels();
            }
        }
        this.calcService.onTotalChangedEvent.subscribe(function (totalSummaryObj) { return _this.totalSummary = totalSummaryObj; });
    };
    MainLayoutComponent.prototype.ngOnDestroy = function () {
        this.diag.logVerbose(MainLayoutComponent_1.name + ".ngOnDestroy()", MainLayoutComponent_1.name);
        if (this.routeSub)
            this.routeSub.unsubscribe();
        if (this.configurationChangedEmitter)
            this.configurationChangedEmitter.unsubscribe();
    };
    MainLayoutComponent.prototype.loadSpecification = function (specificationID) {
        var _this = this;
        if (this.specification && this.specification.ID === specificationID)
            return;
        this.diag.logInformation("Loading Specification for ID: " + specificationID + ".", MainLayoutComponent_1.name);
        this.specificationService.getByID(specificationID).subscribe(function (spec) { return _this.setSpecification(spec); }, function (error) { return _this.diag.logError("Error calling specificationService.specificationByID", MainLayoutComponent_1.name + ".loadSpecification()"); });
    };
    MainLayoutComponent.prototype.loadConfiguration = function (configurationID) {
        var _this = this;
        this.diag.logInformation("Loading Configuration for ID: " + configurationID + ".", MainLayoutComponent_1.name + ".loadConfiguration()");
        this
            .configurationService
            .getConfigurationByID(configurationID)
            .switchMap(function (config) { return _this.specificationService.getByID(config.RootSpecificationID); }, function (config, spec) {
            _this.configuration = Object(__WEBPACK_IMPORTED_MODULE_2__configuration__["linkConfigurationFromRootSpec"])([spec, config]);
            _this.appState.configuration = _this.configuration;
            _this.setSpecification(spec);
        })
            .subscribe(function (spec) { return _this.diag.logInformation('Found a root Specification'); }, function (error) { return _this.diag.logError("Error loading configurations and root specification.", MainLayoutComponent_1.name + ".loadConfiguration()"); });
    };
    MainLayoutComponent.prototype.loadSurcharges = function () {
        var _this = this;
        this.surchargeTypes = [];
        this.surchargeTypeCodes = [];
        var s = this.surchargeService
            .getSurchargeTypes()
            .subscribe(function (surchargeTypes) { return surchargeTypes.forEach(function (sType) {
            if (!_this.surchargeTypeCodes.some(function (st) { return st === sType.Code; })) {
                _this.surchargeTypeCodes.push(sType.Code);
            }
            _this.surchargeTypes.push(sType);
        }); }, function (error) {
            _this.diag.logError(error, MainLayoutComponent_1.name + ".loadSurcharges()");
            _this.toastr.error('There was an error while fetching system data, please refresh your browser and try again.', 'Error');
        }, function () { return s.unsubscribe(); });
    };
    MainLayoutComponent.prototype.handleSpecificationSelected = function (arg) {
        if (arg instanceof __WEBPACK_IMPORTED_MODULE_3__specification__["ChoiceArgs"]) {
            this.configuration = this.appState.updateChoice(this.selectedSpecification, arg.choiceSpecification, arg.selectionSpecification);
        }
        else if (arg instanceof __WEBPACK_IMPORTED_MODULE_3__specification__["MultiSelectArgs"]) {
            this.configuration = this.appState.updateMultiChoice(this.selectedSpecification, arg.choiceSpecification, arg.selectionSpecification, arg.attributeData);
        }
        else if (arg instanceof __WEBPACK_IMPORTED_MODULE_3__specification__["SelectionArgs"]) {
            arg.specification.Selected = !arg.specification.Selected;
            this.configuration = this.appState.updateMultiChoice(this.selectedSpecification, this.selectedSpecification, arg.specification, arg.attributeData);
        }
    };
    MainLayoutComponent.prototype.handleNavigationClicked = function (specification) {
        this.selectedSpecification = specification;
        this.showSummary = !this.selectedSpecification;
        if (!!specification) {
            var nextIndex = this.specification.Children.indexOf(this.selectedSpecification) + 1;
            this.nextSpecName = nextIndex > this.specification.Children.length ? ""
                : nextIndex === this.specification.Children.length ? "Summary"
                    : this.specification.Children[nextIndex].DisplayName;
            this.currentNavigation = specification.DisplayName;
        }
    };
    MainLayoutComponent.prototype.handleNextButtonClicked = function () {
        var prevIndex = this.specification.Children.indexOf(this.selectedSpecification);
        var currIndex = prevIndex + 1;
        var nextIndex = currIndex + 1;
        this.handleNavigationClicked(this.specification.Children[currIndex]);
    };
    MainLayoutComponent.prototype.handleBackButtonClicked = function () {
        var prevIndex = !!this.selectedSpecification ? this.specification.Children.indexOf(this.selectedSpecification) : this.specification.Children.length;
        var currIndex = prevIndex - 1;
        var nextIndex = currIndex + 1;
        this.handleNavigationClicked(currIndex > -1 ? this.specification.Children[currIndex] : null);
    };
    MainLayoutComponent.prototype.setSpecification = function (spec) {
        this.specification = spec;
        this.rootSpecificationID = spec.ID;
        this.specification.Children.sort(function (a, b) { return a.Order > b.Order ? 1 : a.Order < b.Order ? -1 : 0; });
        this.selectedSpecification = spec.Children[0];
        this.nextSpecName = spec.Children[1].DisplayName;
        this.loadProgram(spec);
        this.appState.cacheConfiguration();
        this.diag.logVerbose('Specification Loaded', MainLayoutComponent_1.name + ".loadSpecification()");
    };
    MainLayoutComponent.prototype.loadProgram = function (specification) {
        if (!this.auth.isLoggedIn() || !this.availablePrograms || !specification)
            return;
        this.selectedProgramKey = specification.Metadata["domain.mb.rebate.key"];
        this.showPrograms = (this.appState.CurrentUser.IsAdmin && this.appState.CurrentUser.PriceLevel < 0) || (!!this.availablePrograms[this.selectedProgramKey] && this.availablePrograms[this.selectedProgramKey][this.appState.CurrentUser.PriceLevel] && this.availablePrograms[this.selectedProgramKey][this.appState.CurrentUser.PriceLevel].length > 0);
        if (!this.appState.selectedProgram && this.showPrograms) {
            this.programModal.show();
        }
    };
    MainLayoutComponent.prototype.contuneConfigurationClicked = function () {
        this.appState.selectedProgram = this.showPrograms ? this.selectedProgram : null;
        this.programModal.hide();
    };
    MainLayoutComponent.prototype.getPricingLevels = function () {
        var _this = this;
        this.priceService.getDealerPricingLevels().subscribe(function (pricingLevels) { return _this.availableDealers = pricingLevels; }, function (error) {
            _this.diag.logError('Error getting dealer price levels', MainLayoutComponent_1.name);
        });
    };
    MainLayoutComponent.prototype.selectedDealerChanged = function (dealerID) {
        var dealer = this.availableDealers.find(function (d) { return d.DealerID === +dealerID; });
        this.showPrograms = !!this.availablePrograms[this.selectedProgramKey] && !!this.availablePrograms[this.selectedProgramKey][dealer.PriceLevel] && this.availablePrograms[this.selectedProgramKey][dealer.PriceLevel].length > 0;
        if (dealer && this.appState.CurrentUser.DealerID !== dealer.DealerID) {
            this.appState.setImpersonation(dealer.PriceLevel, dealer.DealerID, dealer.Name);
        }
    };
    return MainLayoutComponent;
}(__WEBPACK_IMPORTED_MODULE_4__shared__["i" /* ResponsiveHelper */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('programModal'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _a || Object)
], MainLayoutComponent.prototype, "programModal", void 0);
MainLayoutComponent = MainLayoutComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/interactive-designer/layouts/main-layout.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_6__discount__["DiscountService"], __WEBPACK_IMPORTED_MODULE_5__pricing__["PricingService"], __WEBPACK_IMPORTED_MODULE_7__surcharge__["SurchargeService"], __WEBPACK_IMPORTED_MODULE_4__shared__["c" /* CalculationService */], __WEBPACK_IMPORTED_MODULE_10__dealer__["DealerClientService"]],
        styles: [__webpack_require__("../../../../../src/app/interactive-designer/layouts/main-layout.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__application_setting__["ApplicationSettingService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__specification__["SpecificationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__specification__["SpecificationService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__configuration__["ConfigurationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__configuration__["ConfigurationService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["ActivatedRoute"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_6__discount__["DiscountService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__discount__["DiscountService"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__pricing__["PricingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__pricing__["PricingService"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_9__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__auth__["AuthService"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_7__surcharge__["SurchargeService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__surcharge__["SurchargeService"]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["c" /* CalculationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["c" /* CalculationService */]) === "function" && _p || Object])
], MainLayoutComponent);

var MainLayoutComponent_1, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
//# sourceMappingURL=main-layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/interactive-designer/summary.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@media (max-width: 425px) {\n    .hr-right {\n        border: none;\n    }\n    .hr-left {\n        border: none;\n    }\n}\n\n.hr-right {\n    border-right: solid 1px #f00b0b;\n}\n\n.hr-left {\n    border-left: solid 1px #f00b0b;\n}\n\n.color-indicator {\n    width: 50px;\n    height: 22px;\n    border-radius: 2px;\n    border: 1px solid rgba(0, 0, 0, 0.56);\n}\n\n/*\n * Component: modal\n * ----------------\n */\n.modal {\n  background: rgba(0, 0, 0, 0.3);\n}\n.modal-content {\n  border-radius: 0;\n  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.125);\n  border: 0;\n}\n@media (min-width: 768px) {\n  .modal-content {\n    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.125);\n  }\n}\n.modal-header {\n  border-bottom-color: #f4f4f4;\n}\n.modal-footer {\n  border-top-color: #f4f4f4;\n}\n.modal-primary .modal-header,\n.modal-primary .modal-footer {\n  border-color: #307095;\n}\n.modal-warning .modal-header,\n.modal-warning .modal-footer {\n  border-color: #c87f0a;\n}\n.modal-info .modal-header,\n.modal-info .modal-footer {\n  border-color: #0097bc;\n}\n.modal-success .modal-header,\n.modal-success .modal-footer {\n  border-color: #00733e;\n}\n.modal-danger .modal-header,\n.modal-danger .modal-footer {\n  border-color: #c23321;\n}\n/*\n * Component: Social Widgets\n * -------------------------\n */\n\n.btn.btn-radio {\n    text-align: left;\n    border: none;\n    box-shadow: none;\n    color: #666;\n}\n\n.btn.btn-radio.focus {\n    border:none;\n    outline:none;\n}\n\n.btn.btn-radio.active::before {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    content: \"\\F14A\";\n}\n\n.btn.btn-radio::before {\n    display: inline-block;\n    font: normal normal normal 14px/1 FontAwesome;\n    font-size: inherit;\n    text-rendering: auto;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    content: \"\\F096\";\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/interactive-designer/summary.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngIf]=\"validatedConfiguration\">\n    <div class=\"col-md-8\">\n        <table class=\"table table-striped table-condensed\">\n            <tbody>\n                <tr>\n                    <td colspan=\"3\"><strong>Gelcoat</strong></td>\n                </tr>\n                <ng-template [ngIf]=\"child\" *ngFor=\"let child of validatedConfiguration.Gelcoat | configurationSort\">\n                    <tr *ngIf=\"child.KeySpecification.SpecificationTypeSystemName === 'ColorArea' && child.HasError\">\n                        <td></td>\n                        <td><i class=\"fa fa-close text-danger\"></i> {{ child.KeyDisplayName }}</td>\n                        <td class=\"text-right\" style=\"white-space:nowrap\">Color Required</td>\n                    </tr>\n                    <tr *ngIf=\"child.KeySpecification.SpecificationTypeSystemName === 'ColorArea' && !child.HasError\">\n                        <td></td>\n                        <td><i class=\"fa fa-check text-success\"></i> {{child.KeyDisplayName}}</td>\n                        <td *ngIf=\"configDictionary[child.KeySpecificationID] && !!configDictionary[child.KeySpecificationID].ValueSpecification.Metadata\">\n                            <div *ngIf=\"configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.rgb']\"\n                                tooltip=\"{{configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['domain.mb.swatch.number']}} : {{child.ValueDisplayName}}\" tooltipPlacement=\"left\" class=\"pull-right color-indicator\" [ngStyle]=\"{'background-color': configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.rgb']}\"></div>\n                            <div *ngIf=\"configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.css-class']\"\n                                tooltip=\"{{configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['domain.mb.color.texture']}} : {{child.ValueDisplayName}}\" tooltipPlacement=\"left\" class=\"pull-right color-indicator {{configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.css-class']}}\"></div>\n                        </td>\n                    </tr>\n                </ng-template>\n\n                <tr>\n                    <td colspan=\"3\"><strong>Upholstery</strong></td>\n                </tr>\n                <ng-template [ngIf]=\"child\" *ngFor=\"let child of validatedConfiguration.Upholstery | configurationSort\">\n                    <tr *ngIf=\"child.KeySpecification.SpecificationTypeSystemName === 'ColorArea' && child.HasError\">\n                        <td></td>\n                        <td><i class=\"fa fa-close text-danger\"></i> {{ child.KeyDisplayName }}</td>\n                        <td class=\"text-right\" style=\"white-space:nowrap\">Color Required</td>\n                    </tr>\n                    <tr *ngIf=\"child.KeySpecification.SpecificationTypeSystemName === 'ColorArea' && !child.HasError\">\n                        <td></td>\n                        <td><i class=\"fa fa-check text-success\"></i> {{child.KeyDisplayName}}</td>\n                        <td *ngIf=\"configDictionary[child.KeySpecificationID] && !!configDictionary[child.KeySpecificationID].ValueSpecification.Metadata\">\n                            <div *ngIf=\"configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.rgb']\"\n                                tooltip=\"{{configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['domain.mb.swatch.number']}} : {{child.ValueDisplayName}}\" tooltipPlacement=\"left\" class=\"pull-right color-indicator\" [ngStyle]=\"{'background-color': configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.rgb']}\"></div>\n                            <div *ngIf=\"configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.css-class']\"\n                                tooltip=\"{{configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['domain.mb.color.texture']}} : {{child.ValueDisplayName}}\" tooltipPlacement=\"left\" class=\"pull-right color-indicator {{configDictionary[child.KeySpecificationID].ValueSpecification.Metadata['ui.designer.color.css-class']}}\"></div>\n                        </td>\n                    </tr>\n                </ng-template>\n\n                <tr>\n                    <td colspan=\"3\"><strong>Options</strong></td>\n                </tr>\n                <ng-template [ngIf]=\"child\" *ngFor=\"let child of validatedConfiguration.Options | configurationSort\">\n                    <tr [ngClass]=\"{'text-danger': child.HasError, 'text-success': !child.HasError}\">\n                        <td style=\"width:10px\"></td>\n                        <td>{{child.ValueDisplayName}}<span *ngIf=\"child.InputValue\"> - {{ attributeSummary(child) }}</span></td>\n                        <td class=\"text-right\">{{child.Price | currency: (isoCurrencyCode$ | async): true}}</td>\n                    </tr>\n                </ng-template>\n\n                <ng-template [ngIf]=\"calcService.CurrGelUpcharge\">\n                    <tr *ngFor=\"let sur of calcService.CurrGelUpcharge\">\n                        <td></td>\n                        <td>{{sur.SurchargeTypeName}}</td>\n                        <td class=\"text-right\">{{sur.Amount | currency:(isoCurrencyCode$|async):true}}</td>\n                    </tr>\n                </ng-template>\n                <tr>\n                    <td></td>\n                    <td class=\"text-right\"><strong>Total</strong></td>\n                    <td class=\"text-right\"><strong>{{calcService.CurrTotalSummary.OptionsTotal | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                </tr>\n\n                <tr>\n                    <td colspan=\"3\"><strong>Trailer</strong></td>\n                </tr>\n                <ng-template [ngIf]=\"child\" *ngFor=\"let child of validatedConfiguration.Trailer | configurationSort\">\n                    <tr [ngClass]=\"{'text-danger': child.HasError, 'text-success': !child.HasError}\">\n                        <td style=\"width:10px\"></td>\n                        <td>{{child.ValueDisplayName}}<span *ngIf=\"child.InputValue\"> - {{ attributeSummary(child) }}</span></td>\n                        <td class=\"text-right\">{{child.Price | currency: (isoCurrencyCode$ | async): true}}</td>\n                    </tr>\n                </ng-template>\n\n                <tr>\n                    <td></td>\n                    <td class=\"text-right\"><strong>Total</strong></td>\n                    <td class=\"text-right\"><strong>{{calcService.CurrTotalSummary.Trailer | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                </tr>\n\n                <ng-template [ngIf]=\"appState.editOrder && appState.editOrder.OrderItems\">\n                    <tr>\n                        <td colspan=\"3\"><strong>Additional Item(s)</strong></td>\n                    </tr>\n                    <tr *ngFor=\"let oi of appState.editOrder.OrderItems\">\n                        <td></td>\n                        <td>{{oi.Description}}</td>\n                        <td class=\"text-right\">{{oi.Amount | currency:(isoCurrencyCode$|async):true}}</td>\n                    </tr>\n                    <tr>\n                        <td></td>\n                        <td class=\"text-right\"><strong>Total</strong></td>\n                        <td class=\"text-right\"><strong>{{calcService.CurrTotalSummary.OrderItemsTotal | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                    </tr>\n                </ng-template>\n                <!--<tr>\n                    <td></td>\n                    <td class=\"text-right\"><strong>Total</strong></td>\n                    <td class=\"text-right\"><strong>{{(calcService.CurrTotalSummary.OptionsTotal + calcService.CurrTotalSummary.OrderItemsTotal) | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                </tr>-->\n            </tbody>\n        </table>\n    </div>\n    <div class=\"col-md-4 hr-left\">\n        <table class=\"table table-striped table-condensed\">\n            <tbody *ngIf=\"calcService.CurrTotalSummary\">\n                <tr *ngIf=\"calcService.CurrTotalSummary.DealerDiscount!==0\">\n                    <td class=\"text-right col-md-10\">Base Price ({{configuration.RootSpecification.DisplayName}}):</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.BasePrice | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.DealerDiscount!==0\">\n                    <td class=\"text-right col-md-10\">Dealer Discount:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.DealerDiscount | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr style=\"border-top:double 1px #666\">\n                    <td class=\"text-right\">Boat Total:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.BoatTotal | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.OptionsTotal!==0\">\n                    <td class=\"text-right\">Options Total:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.OptionsTotal | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.OrderItemsTotal!==0\">\n                    <td class=\"text-right\">Additional Items Total:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.OrderItemsTotal | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.Trailer!==0\">\n                    <td class=\"text-right\">Trailer Total:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.Trailer | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"appState.editOrder&&appState.editOrder.Freight!==0\">\n                    <td class=\"text-right\">Freight Total:</td>\n                    <td class=\"text-right\">{{appState.editOrder.Freight | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.SubTotal!==calcService.CurrTotalSummary.Total\" style=\"border-top:double 1px #666\">\n                    <td class=\"text-right\"><strong>Subtotal:</strong></td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.SubTotal | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.FactoryIncentive!==0\">\n                    <td class=\"text-right\">Factory Incentive:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.FactoryIncentive | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.Surcharge!==0\">\n                    <td class=\"text-right\">Surcharges:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.Surcharge | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr style=\"border-top:double 2px #666\">\n                    <td class=\"text-right\"><strong>Total:</strong></td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.Total | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n            </tbody>\n        </table>\n        <div class=\"panel panel-primary\" *ngIf=\"availablePrograms && availablePrograms.length > 0\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Please select a payment option</h4>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"btn-group-vertical btn-block\" data-toggle=\"buttons\">\n                    <label [ngClass]=\"{'active': (appState.selectedProgram && program.DiscountTypeID === appState.selectedProgram.DiscountTypeID)}\" class=\"btn btn-radio\" *ngFor=\"let program of availablePrograms\" (click)=\"programChanged(program)\">\n                        <input type=\"radio\" name=\"program\" autocomplete=\"off\" value=\"{{program.DiscountTypeID}}\" />{{program.DiscountTypeName}}\n                    </label>\n                </div>\n            </div>\n        </div>\n        <button class=\"btn btn-primary disabled btn-block\" *ngIf=\"!auth.isLoggedIn()\">Submit To Dealer (Coming Soon)</button>\n        <button class=\"btn btn-primary btn-block\" *ngIf=\"auth.isLoggedIn()\" (click)=\"openConfirmSave()\">Save Order</button>\n        <button class=\"btn btn-primary btn-block\" (click)=\"printRetail()\">Print</button>\n    </div>\n\n    <div bsModal #saveOrderModal=\"bs-modal\" class=\"modal modal-success fade\" tabindex=\"-1\" role=\"dialog\"\n         aria-labelledby=\"saveOrderModal\" aria-hidden=\"true\"\n         [config]=\"{backdrop: 'static'}\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" (click)=\"saveOrderModal.hide()\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                    </button>\n                    <h4 class=\"modal-title\">Submit an order</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div class=\"alert alert-info\">\n                        By clicking on <em>Confirm Order Sumission</em> the configured boat will be sent\n                        to MB Sports for order processing.\n                    </div>\n                    <button class=\"btn btn-primary\" (click)=\"saveOrderEventHandler()\"><i class=\"fa fa-save\"></i> Confirm Order Sumission</button>\n                    <button class=\"btn btn-default\" (click)=\"saveOrderModal.hide()\"><i class=\"fa fa-close\"></i> Cancel</button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div bsModal #savedBoatNotification=\"bs-modal\" class=\"modal modal-success fade\" tabindex=\"-1\" role=\"dialog\"\n         aria-labelledby=\"savedBoatNotification\" aria-hidden=\"true\"\n         [config]=\"{backdrop: 'static'}\">\n        <div class=\"modal-dialog\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h4 class=\"modal-title\">{{ orderID > 0 ? \"Boat Saved\" : \"Saving Boat...\" }}</h4>\n                </div>\n                <div class=\"modal-body\">\n                    <div *ngIf=\"orderID > 0\">\n                        <h4>Your boat has been successfully saved.</h4>\n                        <div class=\"alert alert-info\">\n                            Your reference order number is : <span style=\"font-size:2rem;font-weight:900\">{{orderID}}</span>\n                        </div>\n                        <p>What would you like to do?</p>\n                        <div class=\"btn-group-vertical btn-block\">\n                            <a [routerLink]=\"['/model/select']\" class=\"btn btn-sm btn-default\">Design a new MB</a>\n                            <a href=\"{{(retailBaseUrl$|async)}}\" class=\"btn btn-sm btn-default\"><i class=\"fa fa-home\"></i> Go to homepage</a>\n                            <button *ngIf=\"orderID > 0\" type=\"button\" class=\"btn btn-sm btn-success\" (click)=\"printOrder()\"><i class=\"fa fa-print\"></i> Print Your Order</button>\n                            <a *ngIf=\"appState.CurrentUser.IsAdmin\" [routerLink]=\"['/manage/orders']\" class=\"btn btn-sm btn-info\"><i class=\"fa fa-file-text-o\"></i> Manage Orders</a>\n                        </div>\n                    </div>\n                    <div *ngIf=\"orderID < 1\">\n                        <h4>Your boat is currently being {{appState.editOrder ? 'updated' : 'saved'}}...</h4>\n                        <div style=\"display:flex; justify-content: center\">\n                            <img alt=\"Loading\" src=\"../../images/mb-loader.svg\" style=\"width: 300px; height: auto;\"/>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</ng-template>\n"

/***/ }),

/***/ "../../../../../src/app/interactive-designer/summary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SummaryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration_iconfiguration__ = __webpack_require__("../../../../../src/app/configuration/iconfiguration.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration_iconfiguration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__configuration_iconfiguration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__specification__ = __webpack_require__("../../../../../src/app/specification/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__order__ = __webpack_require__("../../../../../src/app/order/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__discount__ = __webpack_require__("../../../../../src/app/discount/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_add_operator_mergeMap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__configuration_mb_helpers__ = __webpack_require__("../../../../../src/app/configuration/mb-helpers.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















var SummaryComponent = (function () {
    function SummaryComponent(appState, auth, calcService, settingService, router, orderService, configService, diag, toastsManager, discountService) {
        this.appState = appState;
        this.auth = auth;
        this.calcService = calcService;
        this.settingService = settingService;
        this.router = router;
        this.orderService = orderService;
        this.configService = configService;
        this.diag = diag;
        this.toastsManager = toastsManager;
        this.discountService = discountService;
        this.orderID = 0;
        this.attributeSummary = function (configurationItem) {
            var data = JSON.parse(configurationItem.InputValue);
            return data
                .map(function (attr) { return "(" + attr.displayName + ")"; })
                .join(' ');
        };
    }
    SummaryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.savedConfigurationID = 0;
        this.enableSave = true;
        this.validateConfiguration(this.configuration);
        this.configDictionary = {};
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
        this.retailBaseUrl$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['RetailBaseUrl']; });
        this.configuration
            .Items
            .forEach(function (c) {
            _this.configDictionary[c.KeySpecificationID] = c;
        });
        if (this.auth.isLoggedIn()) {
            this.discountService
                .getDealerModelDiscount(this.configuration.RootSpecification.Metadata["domain.mb.rebate.key"], this.appState.CurrentUser.DealerID)
                .subscribe(function (discounts) {
                _this.availablePrograms = discounts;
            });
        }
    };
    SummaryComponent.prototype.validateConfiguration = function (configurationToValidate) {
        var _this = this;
        this.configService
            .validate(configurationToValidate)
            .do(function (c) { return Object(__WEBPACK_IMPORTED_MODULE_2__configuration__["linkConfigurationFromRootSpec"])(([_this.specification, c])); })
            .map(function (c) { return c.Items; })
            .map(function (items) { return items
            .reduce(function (prev, curr) {
            var key = _this.getCategoryFromConfigurationItem(curr);
            var entries = prev[key] || [];
            entries.push(curr);
            prev[key] = entries;
            return prev;
        }, {}); })
            .subscribe(function (config) {
            return _this.validatedConfiguration = config;
        });
    };
    SummaryComponent.prototype.getCategoryFromConfigurationItem = function (configItem) {
        if (configItem.ValueSpecification && Object(__WEBPACK_IMPORTED_MODULE_15__configuration_mb_helpers__["b" /* trailerFilter */])(configItem)) {
            return 'Trailer';
        }
        if (configItem.KeySpecification.SpecificationTypeSystemName === 'ColorArea') {
            if (configItem.KeyDisplayName.startsWith('Gel') || configItem.KeyDisplayName === 'Swimstep') {
                return 'Gelcoat';
            }
            else {
                return 'Upholstery';
            }
        }
        return 'Options';
    };
    SummaryComponent.prototype.openConfirmSave = function () {
        if (this.hasValidationError()) {
            return;
        }
        this.saveOrderModal.show();
    };
    SummaryComponent.prototype.saveOrderEventHandler = function () {
        var _this = this;
        this.enableSave = false;
        if (this.hasValidationError()) {
            return;
        }
        var selectedDiscount = this.appState.selectedProgram;
        if (this.availablePrograms && this.availablePrograms.length > 0 && !selectedDiscount) {
            this.toastsManager.error('Please select a program before proceeding.', 'Error');
            return;
        }
        this.saveOrderModal.hide();
        this.savedBoatNotification.show();
        if (this.appState.editOrder) {
            var order = this.appState.editOrder;
            if (selectedDiscount) {
                var dealerDiscount = order.OrderDiscounts.find(function (d) { return _this.availablePrograms.some(function (p) { return p.DiscountTypeID === d.DiscountTypeID; }); });
                if (!dealerDiscount) {
                    dealerDiscount = {
                        ID: 0,
                        Description: selectedDiscount.DiscountTypeName,
                        OrderID: order.ID,
                        DiscountAmount: selectedDiscount.Amount,
                        DiscountTypeID: selectedDiscount.DiscountTypeID,
                        DiscountTypeName: selectedDiscount.DiscountTypeName
                    };
                    order.OrderDiscounts.push(dealerDiscount);
                }
                dealerDiscount.Description = selectedDiscount.DiscountTypeName;
                dealerDiscount.DiscountAmount = selectedDiscount.Amount;
                dealerDiscount.DiscountTypeID = selectedDiscount.DiscountTypeID;
                dealerDiscount.DiscountTypeName = selectedDiscount.DiscountTypeName;
            }
            this.configService
                .updateConfiguration(this.configuration)
                .subscribe(function (config) {
                return _this.orderService
                    .updateOrder(order)
                    .subscribe(function (order) {
                    _this.savedConfigurationID = order.ConfigurationID;
                    _this.appState.resetConfiguration();
                    _this.appState.editOrder = null;
                    _this.orderID = order.ID;
                    _this.appState.resetConfiguration();
                    _this.appState.selectedProgram = null;
                }, function (error) {
                    var errMsg = error || 'There was an error while saving your boat, please try again.';
                    _this.toastsManager.error(errMsg, 'Error');
                    _this.savedBoatNotification.hide();
                });
            }, function (error) {
                var errMsg = error || 'There was an error while saving your boat, please try again.';
                _this.toastsManager.error(errMsg, 'Error');
                _this.savedBoatNotification.hide();
            });
        }
        else {
            this.configService.addConfiguration(this.configuration)
                .flatMap(function (config) { return _this.orderService.addOrder(config.ID, selectedDiscount); })
                .subscribe(function (order) {
                _this.savedConfigurationID = order.ConfigurationID;
                _this.appState.resetConfiguration();
                _this.orderID = order.ID;
                _this.appState.resetConfiguration();
                _this.appState.selectedProgram = null;
            }, function (error) {
                var errMsg = error || 'There was an error while saving your boat, please try again.';
                _this.toastsManager.error(errMsg, 'Error');
                _this.savedBoatNotification.hide();
            }, function () {
                _this.enableSave = true;
            });
        }
    };
    SummaryComponent.prototype.getConfigMetadata = function (keyID, key) {
        if (this.configDictionary[keyID] && this.configDictionary[keyID].ValueSpecification.Metadata) {
            return this.configDictionary[keyID].ValueSpecification.Metadata[key];
        }
        return '';
    };
    SummaryComponent.prototype.printRetail = function () {
        var _this = this;
        if (this.savedConfigurationID < 1) {
            if (this.configuration.ID > 0) {
                // save then redirect to print
                this.configService
                    .updateConfiguration(this.configuration)
                    .subscribe(function (config) {
                    _this.savedConfigurationID = config.ID;
                    _this.configuration = config;
                    window.open("/print/Retail/" + config.ID + "/" + (_this.appState.CurrentUser.DealerID || ''), '_newtab');
                });
            }
            else {
                // save then redirect to print
                this.configService
                    .addConfiguration(this.configuration)
                    .subscribe(function (config) {
                    _this.savedConfigurationID = config.ID;
                    _this.configuration = config;
                    window.open("/print/Retail/" + config.ID + "/" + (_this.appState.CurrentUser.DealerID || ''), '_newtab');
                });
            }
        }
        else {
            window.open("/print/Retail/" + this.savedConfigurationID + "/" + (this.appState.CurrentUser.DealerID || ''), '_newtab');
        }
    };
    SummaryComponent.prototype.printOrder = function () {
        window.open("print/modelpricing/" + this.orderID, '_modelPricing', '', false);
    };
    SummaryComponent.prototype.programChanged = function (program) {
        this.appState.selectedProgram = program;
        this.calcService.calculateTotal(this.configuration);
    };
    SummaryComponent.prototype.hasValidationError = function () {
        var _this = this;
        var validationMsgs = Object.keys(this.validatedConfiguration)
            .filter(function (key) { return _this.validatedConfiguration[key].some(function (item) { return item.HasError; }); })
            .map(function (key) { return "Please provide a " + (key === 'Options' ? 'selection' : 'color') + " for all " + key + " before saving."; });
        validationMsgs
            .forEach(function (msg) { return _this.toastsManager.error(msg, 'Validation Error'); });
        return validationMsgs.length > 0;
    };
    return SummaryComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__configuration_iconfiguration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__configuration_iconfiguration__["IConfiguration"]) === "function" && _a || Object)
], SummaryComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__specification__["ISpecification"]) === "function" && _b || Object)
], SummaryComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('savedBoatNotification'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _c || Object)
], SummaryComponent.prototype, "savedBoatNotification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('saveOrderModal'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _d || Object)
], SummaryComponent.prototype, "saveOrderModal", void 0);
SummaryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-summary',
        template: __webpack_require__("../../../../../src/app/interactive-designer/summary.component.html"),
        styles: [__webpack_require__("../../../../../src/app/interactive-designer/summary.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_5__order__["OrderService"], __WEBPACK_IMPORTED_MODULE_11__discount__["DiscountService"]]
    }),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared__["a" /* ApplicationState */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__auth__["AuthService"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__shared__["c" /* CalculationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared__["c" /* CalculationService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__application_setting__["ApplicationSettingService"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_5__order__["OrderService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__order__["OrderService"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_2__configuration__["ConfigurationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__configuration__["ConfigurationService"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_7__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared__["f" /* DiagnosticService */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_11__discount__["DiscountService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__discount__["DiscountService"]) === "function" && _p || Object])
], SummaryComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
//# sourceMappingURL=summary.component.js.map

/***/ }),

/***/ "../../../../../src/app/navigation/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__top_navigation_component__ = __webpack_require__("../../../../../src/app/navigation/top-navigation.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__top_navigation_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/navigation/top-navigation.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default navbar-fixed-top\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" [ngClass]=\"{'collapsed': collapsed}\" class=\"navbar-toggle\" (click)=\"toggleNavigation()\" [attr.aria-expanded]=\"!collapsed\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"{{(retailBaseUrl$|async)}}\"><img src=\"/images/mb-logo.svg\" alt=\"MB Sports Logo.\" width=\"300\" /></a>\n        </div>\n        <div [ngClass]=\"{'collapse':collapsed, 'in':!collapsed}\" class=\"collapse navbar-collapse\" id=\"main-navigation\">\n            <ul class=\"nav navbar-nav navbar-right\">\n                <li *ngFor=\"let navItem of navigationItems\">\n                    <a *ngIf=\"navItem.external && navItem.showInNavigation\" href=\"{{(retailBaseUrl$|async)}}{{navItem.path.replace('external', '')}}\" routerLinkActive=\"active\">{{navItem.name}}</a>\n                    <a *ngIf=\"!navItem.external && navItem.showInNavigation\" (click)=\"toggleNavigation()\" [routerLink]=\"navItem.path\" routerLinkActive=\"active\">{{navItem.name}}</a>\n                </li>\n                <li>\n                    <button *ngIf=\"!auth.isLoggedIn()\" class=\"btn btn-link\" (click)=\"login()\">\n                        <i class=\"fa fa-unlock\"></i>\n                        Sign In\n                    </button>\n                    <div *ngIf=\"auth.isLoggedIn()\">\n                        <notification-menu></notification-menu>\n                        <div class=\"btn-group\" dropdown>\n                            <button id=\"single-button\" type=\"button\" class=\"btn btn-link dropdown-toggle\" dropdownToggle [disabled]=\"disabled\">\n                                <i class=\"fa fa-user\"></i>\n                            </button>\n                            <ul *dropdownMenu class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"single-button\">\n                                <li role=\"menuitem\" *ngFor=\"let authNavItem of authNavItems\">\n                                    <a class=\"dropdown-item\" [routerLink]=\"[authNavItem.path]\">{{authNavItem.name}}</a>\n                                </li>\n                                <!--<li *ngIf=\"appState.CurrentUser.IsAdmin\">\n                                    <a style=\"cursor:pointer\" class=\"dropdown-item\" (click)=\"openDealerImpersonantionModal()\">Impersonate a Dealer</a>\n                                </li>-->\n                                <li role=\"separator\" class=\"divider\"></li>\n                                <li role=\"menuitem\">\n                                    <a style=\"cursor:pointer\" class=\"dropdown-item\" (click)=\"logout()\">Sign Out</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </div>\n</nav>\n<div bsModal #changePricingLevels=\"bs-modal\" class=\"modal modal-success fade\" tabindex=\"-1\" role=\"dialog\"\n     aria-labelledby=\"changePricingLevels\" aria-hidden=\"true\"\n     [config]=\"{backdrop: 'static'}\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" (click)=\"changePricingLevels.hide()\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n                <h5 class=\"modal-title\">Please select a pricing level</h5>\n            </div>\n            <div class=\"modal-body\">\n                <select class=\"form-control\" *ngIf=\"dealerPriceLevels\" [(ngModel)]=\"selectedDealerID\">\n                    <option *ngFor=\"let priceLevel of dealerPriceLevels\" selected=\"{{priceLevel.DealerID === selectedDealerID}}\" value=\"{{priceLevel.DealerID}}\">{{priceLevel.Name}}</option>\n                </select>\n            </div>\n            <div class=\"modal-footer\">\n                <button class=\"btn btn-primary\" (click)=\"setPricingLevel()\">Apply</button>\n                <button class=\"btn btn-default\" (click)=\"changePricingLevels.hide()\">Cancel</button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/navigation/top-navigation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopNavigationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_routes__ = __webpack_require__("../../../../../src/app/app.routes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pricing__ = __webpack_require__("../../../../../src/app/pricing/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__auth_admin_auth_guard__ = __webpack_require__("../../../../../src/app/auth/admin-auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var TopNavigationComponent = TopNavigationComponent_1 = (function () {
    function TopNavigationComponent(router, appState, auth, priceService, diag, toastr, appSettingService) {
        this.router = router;
        this.appState = appState;
        this.auth = auth;
        this.priceService = priceService;
        this.diag = diag;
        this.toastr = toastr;
        this.appSettingService = appSettingService;
    }
    Object.defineProperty(TopNavigationComponent.prototype, "authNavItems", {
        get: function () {
            var filterPaths = ['logout', 'config/:configurationID', 'dealer/projections/2019', 'dealer/contract', 'account/change-password'];
            var all = __WEBPACK_IMPORTED_MODULE_2__app_routes__["a" /* AllRoutes */]
                .filter(function (r) { return r.canActivate.length > 0; })
                .filter(function (r) { return !filterPaths.some(function (p) { return p === r.path; }); });
            var auth = all.filter(function (r) { return !r.canActivate.some(function (g) { return g === __WEBPACK_IMPORTED_MODULE_9__auth_admin_auth_guard__["a" /* AdminAuthGuard */]; }); });
            return this.appState.CurrentUser.IsAdmin ? all : auth;
        },
        enumerable: true,
        configurable: true
    });
    TopNavigationComponent.prototype.ngOnInit = function () {
        this.retailBaseUrl$ = this.appSettingService
            .applicationSetting$
            .filter(function (setting) { return setting !== null; })
            .map(function (setting) { return setting['RetailBaseUrl']; });
        this.navigationItems = __WEBPACK_IMPORTED_MODULE_2__app_routes__["a" /* AllRoutes */].filter(function (r) { return !r.parentName; });
        this.collapsed = true;
        if (this.auth.isLoggedIn()) {
            this.getPricingLevels();
        }
    };
    TopNavigationComponent.prototype.logout = function () {
        //this.auth.redirectUrl = this.appState.CurrentRouteData.url
        //this.router.navigate(['/logout'])
        this.auth.logout();
        this.toggleNavigation();
    };
    TopNavigationComponent.prototype.login = function () {
        this.auth.redirectUrl = this.appState.CurrentRouteData.url;
        this.router.navigate(['/login']);
        this.toggleNavigation();
    };
    TopNavigationComponent.prototype.toggleNavigation = function () {
        this.collapsed = !this.collapsed;
    };
    TopNavigationComponent.prototype.setPricingLevel = function () {
        var _this = this;
        var dealerPricingLevel = this.dealerPriceLevels.find(function (d) { return d.DealerID === +_this.selectedDealerID; });
        if (dealerPricingLevel) {
            this.appState.setImpersonation(dealerPricingLevel.PriceLevel, dealerPricingLevel.DealerID, dealerPricingLevel.Name);
            this.diag.logInformation("Current User PriceLevel: " + this.appState.CurrentUser.PriceLevel, TopNavigationComponent_1.name);
            this.toastr.success("You are now impersonating " + dealerPricingLevel.Name + ".", 'Picing Level Set');
        }
        else {
            this.toastr.error('The pricing level was not set, please try again.', 'Error Setting Picing Level');
        }
        this.changePricingLevels.hide();
    };
    TopNavigationComponent.prototype.getPricingLevels = function () {
        var _this = this;
        this.priceService.getDealerPricingLevels().subscribe(function (pricingLevels) { return _this.dealerPriceLevels = pricingLevels; }, function (error) {
            _this.diag.logError('Error getting dealer price levels', TopNavigationComponent_1.name);
        });
    };
    TopNavigationComponent.prototype.openDealerImpersonantionModal = function () {
        if (this.appState.configuration && this.appState.configuration.ID > 0) {
            this.toastr.warning('Impersonantion has been disabled when editing an exsting boat.');
            return;
        }
        this.selectedDealerID = this.appState.CurrentUser.DealerID.toString();
        if (!this.dealerPriceLevels) {
            this.getPricingLevels();
        }
        this.changePricingLevels.show();
    };
    return TopNavigationComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('changePricingLevels'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _a || Object)
], TopNavigationComponent.prototype, "changePricingLevels", void 0);
TopNavigationComponent = TopNavigationComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'top-navigation',
        template: __webpack_require__("../../../../../src/app/navigation/top-navigation.component.html"),
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth__["AuthService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__pricing__["PricingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__pricing__["PricingService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__application_setting__["ApplicationSettingService"]) === "function" && _h || Object])
], TopNavigationComponent);

var TopNavigationComponent_1, _a, _b, _c, _d, _e, _f, _g, _h;
//# sourceMappingURL=top-navigation.component.js.map

/***/ }),

/***/ "../../../../../src/app/ng-flowscheduler/flowscheduler.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".unscheduled-scroll {\n    max-height: 85vh;\n    height: auto;\n    overflow-y: scroll;\n}\n\n.drag-enter {\n    border: 2px solid gray;\n    cursor: pointer;\n}\n\n.arrow-right {\n    float: right;\n    cursor: pointer;\n}\n\n.arrow-left {\n    float: left;\n    cursor: pointer;\n}\n\n[draggable] {\n    opacity: 1;\n}\n\n/* Let's get this party started */\n::-webkit-scrollbar {\n    width: 8px;\n}\n\n/* Track */\n::-webkit-scrollbar-track {\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);\n    border-radius: 10px;\n}\n\n/* Handle */\n::-webkit-scrollbar-thumb {\n    border-radius: 10px;\n    background: rgba(0, 0, 0, 0.8);\n    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);\n}\n\n::-webkit-scrollbar-thumb:window-inactive {\n    background: rgba(0, 0, 0, 0.4);\n}\n\n[draggable] {\n    cursor: -webkit-grab;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/ng-flowscheduler/flowscheduler.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"container\">\n    <div class=\"col-md-3\" pDroppable=\"order\" (onDrop)=\"dropUnscheduled($event)\" (onDragOver)=\"dragEnterUnscheduled($event)\" (onDragLeave)=\"dragLeaveUnscheduled($event)\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Unscheduled</h4>\n            </div>\n            <ul scroller [scrollCallback]=\"scrollCallback\" class=\"column-content list-group unscheduled-scroll\" [ngClass]=\"unscheduledDragEnterClass\" >\n                <li *ngFor=\"let item of scheduler.unscheduled$ | async\" pDraggable=\"order\" (onDragStart)=\"dragStart($event, item)\" (onDragEnd)=\"dragEnd($event)\" (click)=\"click(item)\" class=\"list-group-item\">\n                    <ng-template ngFor [ngForOf]=\"[item]\" [ngForTemplate]=\"unscheduledTemplate\" [ngForTrackBy]=\"trackBy\"></ng-template>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"col-md-4\" pDroppable=\"order\" (onDrop)=\"dropMonth($event)\"   (onDragOver)=\"dragEnterMonth($event)\" (onDragLeave)=\"dragLeaveMonth($event)\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">\n                    <span class=\"glyphicon glyphicon-chevron-left arrow-left\" aria-hidden=\"true\" (click)=\"scheduler.addMonth(-1)\"></span>\n                    {{ (scheduler.activeMonth$ | async).format('MMMM YYYY') }}\n                    <span class=\"glyphicon glyphicon-chevron-right arrow-right\" aria-hidden=\"true\" (click)=\"scheduler.addMonth()\"></span>\n                </h4>\n            </div>\n            <ul class=\"column-content list-group\" [ngClass]=\"monthDragEnterClass\">\n                <li *ngFor=\"let order of (scheduler.scheduledMonth$ | async)\" pDraggable=\"order\" (onDragStart)=\"dragStart($event, order)\" (onDragEnd)=\"dragEnd($event)\" (click)=\"click(order)\" class=\"list-group-item\">\n                    <ng-template ngFor [ngForOf]=\"[order]\" [ngForTemplate]=\"monthTemplate\" [ngForTrackBy]=\"trackBy\"></ng-template>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <div class=\"col-md-5\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">\n                    <span class=\"glyphicon glyphicon-chevron-left arrow-left\" aria-hidden=\"true\" (click)=\"scheduler.addWeek(-1)\" *ngIf=\"this.selectedWeek > -5\"></span>\n                    {{ (scheduler.activeWeek$ | async).format('M/DD/YYYY') }}\n                    <span class=\"glyphicon glyphicon-chevron-right arrow-right\" aria-hidden=\"true\" (click)=\"scheduler.addWeek()\" *ngIf=\"this.selectedWeek < 5\"></span>\n                </h4>\n            </div>\n            <div class=\"panel-body\">\n                <div *ngFor=\"let day of weekdays$ | async\" class=\"panel panel-default col-md-6 {{day.cssClass}}\">\n                    <div class=\"panel-heading\">\n                        <h5 class=\"panel-title\">{{ day.date.format('ddd D, YYYY') }}</h5>\n                    </div>\n                    <ul pDroppable=\"order\" (onDrop)=\"dropDay($event, day)\" (onDragOver)=\"dragEnterDay($event, day)\" (onDragLeave)=\"dragLeaveDay($event, day)\" class=\"list-group\" style=\"min-height: 100px\" >\n                        <li *ngFor=\"let item of day.items$ | async\" pDraggable=\"order\" (onDragStart)=\"dragStart($event, item)\" (onDragEnd)=\"dragEnd($event)\" (click)=\"click(item)\" class=\"list-group-item\">\n                            <ng-template ngFor [ngForOf]=\"[item]\" [ngForTemplate]=\"weekTemplate\" [ngForTrackBy]=\"trackBy\"></ng-template>\n                        </li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/ng-flowscheduler/flowscheduler.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ItemTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlowSchedulerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_scheduled_service__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/services/scheduled.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__schedule_type__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/schedule-type.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ItemTemplate = (function () {
    function ItemTemplate(template) {
        this.template = template;
    }
    ItemTemplate.prototype.getType = function () { return this.name; };
    return ItemTemplate;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], ItemTemplate.prototype, "type", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('itemTemplate'),
    __metadata("design:type", String)
], ItemTemplate.prototype, "name", void 0);
ItemTemplate = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[itemTemplate]',
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) === "function" && _a || Object])
], ItemTemplate);

var FlowSchedulerComponent = (function () {
    function FlowSchedulerComponent(changeDetectorRef, scheduler, ref) {
        this.changeDetectorRef = changeDetectorRef;
        this.scheduler = scheduler;
        this.ref = ref;
        this.selectedMonth = 0;
        this.selectedWeek = 0;
        this.draggedItem = null;
        this.unscheduledDragEnterClass = "";
        this.monthDragEnterClass = "";
        this.weekdays$ = this
            .scheduler
            .activeWeekdays$
            .map(function (ds) { return ds.map(function (d) { return ({
            date: d.date,
            items$: d.items$,
            cssClass: ""
        }); }); });
    }
    FlowSchedulerComponent.prototype.ngOnInit = function () { };
    FlowSchedulerComponent.prototype.dragStart = function (event, item) {
        this.changeDetectorRef.markForCheck();
        this.draggedItem = item;
    };
    FlowSchedulerComponent.prototype.dragEnterUnscheduled = function (event) {
        this.unscheduledDragEnterClass = 'drag-enter';
        this.changeDetectorRef.markForCheck();
    };
    FlowSchedulerComponent.prototype.dragLeaveUnscheduled = function (event) {
        this.unscheduledDragEnterClass = '';
    };
    FlowSchedulerComponent.prototype.dragEnterMonth = function (event) {
        this.monthDragEnterClass = 'drag-enter';
        this.changeDetectorRef.markForCheck();
    };
    FlowSchedulerComponent.prototype.dragLeaveMonth = function (event) {
        this.monthDragEnterClass = "";
    };
    FlowSchedulerComponent.prototype.dragEnterDay = function (event, day) {
        day.cssClass = 'drag-enter';
        this.changeDetectorRef.markForCheck();
    };
    FlowSchedulerComponent.prototype.dragLeaveDay = function (event, day) {
        day.cssClass = '';
        this.changeDetectorRef.markForCheck();
    };
    FlowSchedulerComponent.prototype.dragEnd = function (event) {
        event.path[0].removeAttribute('style');
        this.draggedItem = null;
    };
    FlowSchedulerComponent.prototype.click = function (item) {
        this.scheduler.itemSelected(item);
    };
    FlowSchedulerComponent.prototype.dropMonth = function (event) {
        if (!this.draggedItem) {
            return;
        }
        this.scheduler.setMonth(this.draggedItem, __WEBPACK_IMPORTED_MODULE_2_moment__().add(this.selectedMonth, "months").toDate());
    };
    FlowSchedulerComponent.prototype.dropDay = function (event, day) {
        if (!this.draggedItem || this.scheduler.resolveScheduleType(this.draggedItem) === __WEBPACK_IMPORTED_MODULE_3__schedule_type__["a" /* Scheduled */].Scheduled) {
            return;
        }
        this.scheduler.setScheduled(this.draggedItem, day.date.toDate());
    };
    FlowSchedulerComponent.prototype.dropUnscheduled = function (event) {
        if (!this.draggedItem) {
            return;
        }
        this.scheduler.setUnscheduled(this.draggedItem);
    };
    FlowSchedulerComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'unscheduled':
                    _this.unscheduledTemplate = item.template;
                    break;
                case 'month':
                    _this.monthTemplate = item.template;
                    break;
                case 'week':
                    _this.weekTemplate = item.template;
                    break;
            }
        });
    };
    FlowSchedulerComponent.prototype.ngAfterViewChecked = function () { };
    return FlowSchedulerComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(ItemTemplate),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _b || Object)
], FlowSchedulerComponent.prototype, "templates", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], FlowSchedulerComponent.prototype, "scrollCallback", void 0);
FlowSchedulerComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ng-flowscheduler',
        template: __webpack_require__("../../../../../src/app/ng-flowscheduler/flowscheduler.component.html"),
        styles: [__webpack_require__("../../../../../src/app/ng-flowscheduler/flowscheduler.component.css")],
        changeDetection: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectionStrategy"].OnPush
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_scheduled_service__["a" /* ScheduledService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_scheduled_service__["a" /* ScheduledService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _e || Object])
], FlowSchedulerComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=flowscheduler.component.js.map

/***/ }),

/***/ "../../../../../src/app/ng-flowscheduler/flowscheduler.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlowSchedulerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ng_infinite_scroller_infinite_scroller_module__ = __webpack_require__("../../../../../src/app/ng-infinite-scroller/infinite-scroller.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__flowscheduler_component__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/flowscheduler.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var FlowSchedulerModule = (function () {
    function FlowSchedulerModule() {
    }
    return FlowSchedulerModule;
}());
FlowSchedulerModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"], __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["DragDropModule"], __WEBPACK_IMPORTED_MODULE_3__ng_infinite_scroller_infinite_scroller_module__["a" /* InfiniteScrollerModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_4__flowscheduler_component__["a" /* FlowSchedulerComponent */], __WEBPACK_IMPORTED_MODULE_4__flowscheduler_component__["b" /* ItemTemplate */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_4__flowscheduler_component__["a" /* FlowSchedulerComponent */], __WEBPACK_IMPORTED_MODULE_4__flowscheduler_component__["b" /* ItemTemplate */]],
        providers: [],
    })
], FlowSchedulerModule);

//# sourceMappingURL=flowscheduler.module.js.map

/***/ }),

/***/ "../../../../../src/app/ng-flowscheduler/schedule-type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scheduled; });
var Scheduled;
(function (Scheduled) {
    Scheduled[Scheduled["Unscheduled"] = 0] = "Unscheduled";
    Scheduled[Scheduled["Scheduled"] = 1] = "Scheduled";
    Scheduled[Scheduled["SoftMonthYear"] = 2] = "SoftMonthYear";
})(Scheduled || (Scheduled = {}));
//# sourceMappingURL=schedule-type.js.map

/***/ }),

/***/ "../../../../../src/app/ng-flowscheduler/services/scheduled.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduledService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__ = __webpack_require__("../../../../rxjs/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__schedule_type__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/schedule-type.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ScheduledService = (function () {
    function ScheduledService(initems$, getMonthItems, getWeekItems, dateField, scheduleTypeField) {
        var _this = this;
        this.getMonthItems = getMonthItems;
        this.getWeekItems = getWeekItems;
        this.dateField = dateField;
        this.scheduleTypeField = scheduleTypeField;
        this._activeMonth = __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('month');
        this._activeMonthSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](this._activeMonth);
        this.activeMonth$ = this._activeMonthSubject.asObservable();
        this._activeWeek = __WEBPACK_IMPORTED_MODULE_6_moment__().startOf('isoWeek');
        this._activeWeekSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](this._activeWeek);
        this.activeWeek$ = this._activeWeekSubject.asObservable();
        this.scheduledWeek$ = this
            .activeWeek$
            .switchMap(function (week) { return _this.getWeekItems(week.year(), week.isoWeek()).share(); });
        this.activeWeekdays$ = this
            .activeWeek$
            .map(function (week) { return ({ week: week, items$: _this.getWeekItems(week.year(), week.isoWeek()).share() }); })
            .map(function (wi) { return Array
            .from(new Array(7), function (_, i) { return i; })
            .map(function (weekdayNumber) { return wi.week.clone().add(weekdayNumber, 'd'); })
            .map(function (date) { return ({
            date: date,
            items$: wi.items$
                .map(function (items) { return items
                .filter(function (i) { return __WEBPACK_IMPORTED_MODULE_6_moment__(_this.resolveDateValue(i)).isSame(date.toDate(), "day"); }); })
        }); }); });
        this._items = [];
        this._itemsSubject = new __WEBPACK_IMPORTED_MODULE_3_rxjs_BehaviorSubject__["BehaviorSubject"](this._items);
        this.items$ = this._itemsSubject.asObservable();
        this._itemUnscheduledSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this._itemScheduledMonthSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this._itemScheduledSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this._itemSelectedSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.itemUnscheduled$ = this._itemUnscheduledSubject.asObservable();
        this.itemScheduledMonth$ = this._itemScheduledMonthSubject.asObservable();
        this.itemScheduled$ = this._itemScheduledSubject.asObservable();
        this.itemSelected$ = this._itemSelectedSubject.asObservable();
        this.scheduled$ = this
            .items$
            .map(function (items) { return items.filter(_this._filterScheduled); });
        this.unscheduled$ = this
            .items$
            .map(function (items) { return items.filter(_this._filterUnscheduled); });
        this.scheduledMonth$ = this
            .activeMonth$
            .switchMap(function (monthDate) {
            return _this.getMonthItems(monthDate.year(), monthDate.month() + 1);
        });
        this._filterScheduled = function (i) { return _this.resolveScheduleType(i) === __WEBPACK_IMPORTED_MODULE_7__schedule_type__["a" /* Scheduled */].Scheduled; };
        this._filterUnscheduled = function (i) { return _this.resolveScheduleType(i) === __WEBPACK_IMPORTED_MODULE_7__schedule_type__["a" /* Scheduled */].Unscheduled; };
        this.resolveDateValue = function (item) { return new Date(item[_this.dateField]); };
        this.resolveScheduleType = function (item) { return item[_this.scheduleTypeField]; };
        initems$.subscribe(function (is) { return _this._itemsSubject.next(_this._items = is); });
    }
    ScheduledService.prototype.addMonth = function (offset) {
        if (offset === void 0) { offset = 1; }
        this._activeMonth.add(offset, "month");
        this._activeMonthSubject.next(this._activeMonth);
    };
    ScheduledService.prototype.addWeek = function (offset) {
        if (offset === void 0) { offset = 1; }
        this._activeWeek.add(offset, "w");
        this._activeWeekSubject.next(this._activeWeek);
    };
    ScheduledService.prototype.getScheduledDay$ = function (day) {
        var _this = this;
        return this
            .scheduledWeek$
            .map(function (items) { return items
            .filter(function (i) { return __WEBPACK_IMPORTED_MODULE_6_moment__(_this.resolveDateValue(i)).isSame(day, "day"); }); });
    };
    ScheduledService.prototype.setUnscheduled = function (item) {
        this._itemUnscheduledSubject.next(item);
        this._itemsSubject.next(this._items);
    };
    ScheduledService.prototype.setMonth = function (item, date) {
        this._itemScheduledMonthSubject.next([item, date]);
        this._itemsSubject.next(this._items);
    };
    ScheduledService.prototype.setScheduled = function (item, date) {
        this._itemScheduledSubject.next([item, date]);
        this._itemsSubject.next(this._items);
    };
    ScheduledService.prototype.itemSelected = function (item) {
        this._itemSelectedSubject.next(item);
    };
    return ScheduledService;
}());
ScheduledService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]) === "function" && _a || Object, Function, Function, String, String])
], ScheduledService);

var _a;
//# sourceMappingURL=scheduled.service.js.map

/***/ }),

/***/ "../../../../../src/app/ng-infinite-scroller/infinite-scroller.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollerDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DEFAULT_SCROLL_POSITION = {
    sT: 0,
    sH: 0,
    cH: 0
};
var InfiniteScrollerDirective = (function () {
    function InfiniteScrollerDirective(el) {
        this.el = el;
        this.scrollPercent = 90;
        this.immediateCallback = false;
        this.useDocument = false;
        this.scrollCallback = function () { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].interval(1).first(); };
    }
    InfiniteScrollerDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        var scrollEl = this.useDocument ? this.el.nativeElement.ownerDocument : this.el.nativeElement;
        var scroll$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]
            .fromEvent(scrollEl, 'scroll')
            .map(function (e) { return _this.useDocument ? e.target.documentElement : e.target; });
        var touch$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]
            .fromEvent(scrollEl, 'touchmove')
            .map(function (e) { return window.document.documentElement; });
        var scrollEvent$ = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"]
            .merge(scroll$, touch$);
        var scrollDown$ = scrollEvent$
            .map(function (target) { return ({
            sT: target.scrollTop,
            sH: target.scrollHeight,
            cH: target.clientHeight
        }); })
            .pairwise()
            .filter(function (ps) { return ps[0].sT < ps[1].sT; })
            .filter(function (ps) { return ((ps[0].sT + ps[0].cH) / ps[0].sH) > (_this.scrollPercent / 100); });
        var requestOnScroll$ = this.immediateCallback
            ? scrollDown$.startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION])
            : scrollDown$;
        this.requestOnScrollSub = requestOnScroll$
            .exhaustMap(function (_) { return _this.scrollCallback(); })
            .subscribe(function () { });
    };
    InfiniteScrollerDirective.prototype.ngOnDestroy = function () {
        if (this.requestOnScrollSub) {
            this.requestOnScrollSub.unsubscribe();
        }
    };
    return InfiniteScrollerDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], InfiniteScrollerDirective.prototype, "scrollPercent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], InfiniteScrollerDirective.prototype, "immediateCallback", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], InfiniteScrollerDirective.prototype, "useDocument", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Function)
], InfiniteScrollerDirective.prototype, "scrollCallback", void 0);
InfiniteScrollerDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[scroller]'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], InfiniteScrollerDirective);

var _a;
//# sourceMappingURL=infinite-scroller.directive.js.map

/***/ }),

/***/ "../../../../../src/app/ng-infinite-scroller/infinite-scroller.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__infinite_scroller_directive__ = __webpack_require__("../../../../../src/app/ng-infinite-scroller/infinite-scroller.directive.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var InfiniteScrollerModule = (function () {
    function InfiniteScrollerModule() {
    }
    return InfiniteScrollerModule;
}());
InfiniteScrollerModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"]],
        exports: [__WEBPACK_IMPORTED_MODULE_2__infinite_scroller_directive__["a" /* InfiniteScrollerDirective */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_2__infinite_scroller_directive__["a" /* InfiniteScrollerDirective */]],
        providers: [],
    })
], InfiniteScrollerModule);

//# sourceMappingURL=infinite-scroller.module.js.map

/***/ }),

/***/ "../../../../../src/app/notiification/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification__ = __webpack_require__("../../../../../src/app/notiification/notification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__notification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__notification__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__notification__, "NotificationClientService")) __webpack_require__.d(__webpack_exports__, "NotificationClientService", function() { return __WEBPACK_IMPORTED_MODULE_0__notification__["NotificationClientService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__notification__, "NotificationMenuComponent")) __webpack_require__.d(__webpack_exports__, "NotificationMenuComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__notification__["NotificationMenuComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__notification__, "NotificationService")) __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return __WEBPACK_IMPORTED_MODULE_0__notification__["NotificationService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_menu_notification_menu_component__ = __webpack_require__("../../../../../src/app/notiification/notification-menu/notification-menu.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "NotificationMenuComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__notification_menu_notification_menu_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_notification_client_service__ = __webpack_require__("../../../../../src/app/notiification/services/notification-client.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "NotificationClientService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_notification_client_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_notification_service__ = __webpack_require__("../../../../../src/app/notiification/services/notification.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_notification_service__["a"]; });




//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/notiification/notification-menu/notification-menu.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".dropdown-menu.scrollable {\n    height: auto;\n    overflow-x: hidden;\n    max-height: 500px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/notiification/notification-menu/notification-menu.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"btn-group\" dropdown>\n    <button id=\"notifications\" class=\"btn btn-link dropdown-toggle\" dropdownToggle (click)=\"showNotifications()\" >\n        <i class=\"fa fa-bell\" [ngClass]=\"{'text-danger': (notificationService.unreadNotifications$ | async)?.length > 0}\"></i>\n    </button>\n    <ul *dropdownMenu class=\"dropdown-menu scrollable\" role=\"menu\" aria-labelledby=\"notifications\">\n        <li role=\"menuItem\" *ngFor=\"let notification of notificationList$ | async\">\n            <a class=\"dropdown-item\" [ngClass]=\"{'bg-warning': !notification.read }\" >\n                <h6>{{ notification.message }}<br />\n                <small>{{ notification.date }}</small></h6>\n            </a>\n        </li>\n        <li role=\"menuItem\" *ngIf=\"(notificationService.hasNext$ | async) && !(notificationService.loading$ | async)\" style=\"text-align: center\">\n            <a class=\"dropdown-item\" href=\"#\" (click)=\"more($event)\">show more</a>\n        </li>\n        <li role=\"menuItem\" *ngIf=\"(notificationService.loading$ | async)\" style=\"text-align: center\">\n            <span class=\"dropdown-item\">loading...</span>\n        </li>\n    </ul>\n</div>"

/***/ }),

/***/ "../../../../../src/app/notiification/notification-menu/notification-menu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationMenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_notification_service__ = __webpack_require__("../../../../../src/app/notiification/services/notification.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NotificationMenuComponent = (function () {
    function NotificationMenuComponent(notificationService) {
        this.notificationService = notificationService;
        this.notificationList$ = this
            .notificationService
            .notifications$
            .map(function (ns) {
            return ns.data.map(function (n) { return ({
                id: n.id,
                message: n.message,
                read: n.read,
                date: __WEBPACK_IMPORTED_MODULE_2_moment__(n.date).fromNow()
            }); });
        });
    }
    NotificationMenuComponent.prototype.showNotifications = function () {
        this.notificationService
            .readAll()
            .first()
            .subscribe();
    };
    NotificationMenuComponent.prototype.more = function (event) {
        event.preventDefault();
        event.cancelBubble = true;
        this.notificationService.nextPage();
    };
    return NotificationMenuComponent;
}());
NotificationMenuComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'notification-menu',
        template: __webpack_require__("../../../../../src/app/notiification/notification-menu/notification-menu.component.html"),
        styles: [__webpack_require__("../../../../../src/app/notiification/notification-menu/notification-menu.component.css")],
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_notification_service__["a" /* NotificationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_notification_service__["a" /* NotificationService */]) === "function" && _a || Object])
], NotificationMenuComponent);

var _a;
//# sourceMappingURL=notification-menu.component.js.map

/***/ }),

/***/ "../../../../../src/app/notiification/notification.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=notification.js.map

/***/ }),

/***/ "../../../../../src/app/notiification/services/notification-client.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MOCK_NOTIFICATIONS = [
    { id: 1, read: false, message: 'AWS has submited Order: 12345', date: new Date('12/26/2017') },
    { id: 2, read: false, message: 'test2', date: new Date('1/22/2018') },
    { id: 3, read: false, message: 'test3', date: new Date('1/26/2018') },
];
var NotificationClientService = (function (_super) {
    __extends(NotificationClientService, _super);
    function NotificationClientService(http, diag, auth) {
        var _this = _super.call(this, http, diag, '/', 'http://localhost:44337/api/customwise/notification') || this;
        _this.getNotifications = function (page) {
            if (page === void 0) { page = 1; }
            //Observable.of(MOCK_NOTIFICATIONS)
            return _this.httpGet("?page=" + page, function (res) { return res.json(); });
        };
        _this.readAllNotifications = function () {
            return _this.httpPost('/read/all', {}, function () { _this._diag.logInformation('Marking all notifications as read.'); });
        };
        return _this;
    }
    return NotificationClientService;
}(__WEBPACK_IMPORTED_MODULE_2__shared_services_base_proxy_service__["a" /* BaseProxy */]));
NotificationClientService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared_services_diagnostic_service__["a" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared_services_diagnostic_service__["a" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth__["AuthService"]) === "function" && _c || Object])
], NotificationClientService);

var _a, _b, _c;
//# sourceMappingURL=notification-client.service.js.map

/***/ }),

/***/ "../../../../../src/app/notiification/services/notification.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__notification_client_service__ = __webpack_require__("../../../../../src/app/notiification/services/notification-client.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DEFAULT_PAGE = {
    hasNext: false,
    data: []
};
var NotificationService = (function () {
    function NotificationService(notificationService) {
        var _this = this;
        this.notificationService = notificationService;
        this._page = 1;
        this._hasNext = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.hasNext$ = this._hasNext.asObservable();
        this._loading = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](false);
        this.loading$ = this._loading.asObservable();
        this._notifications = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](DEFAULT_PAGE);
        this.notifications$ = this
            ._notifications
            .asObservable()
            .scan(function (prev, curr) { return ({
            hasNext: curr.hasNext,
            data: prev.data.concat(curr.data)
        }); }, DEFAULT_PAGE);
        this.unreadNotifications$ = this
            .notifications$
            .map(function (ns) { return ns.data.filter(function (n) { return !n.read; }); });
        this.readAll = function () {
            return _this.notificationService.readAllNotifications();
        };
        this.init();
    }
    NotificationService.prototype.init = function () {
        this.loadPage(this._page);
    };
    NotificationService.prototype.loadPage = function (page) {
        var _this = this;
        this._loading.next(true);
        this.notificationService
            .getNotifications(page)
            .first()
            .subscribe(function (ns) {
            _this._page += (ns.hasNext) ? 1 : 0;
            _this._hasNext.next(ns.hasNext);
            _this._notifications.next(ns);
        }, function () { }, // error
        function () { _this._loading.next(false); });
    };
    NotificationService.prototype.nextPage = function () {
        this.loadPage(this._page);
    };
    return NotificationService;
}());
NotificationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__notification_client_service__["a" /* NotificationClientService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__notification_client_service__["a" /* NotificationClientService */]) === "function" && _a || Object])
], NotificationService);

var _a;
//# sourceMappingURL=notification.service.js.map

/***/ }),

/***/ "../../../../../src/app/order/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__orders_component__ = __webpack_require__("../../../../../src/app/order/orders.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__orders_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_order_service__ = __webpack_require__("../../../../../src/app/order/services/order.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "OrderService", function() { return __WEBPACK_IMPORTED_MODULE_1__services_order_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__ = __webpack_require__("../../../../../src/app/order/services/ipolicy-result.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__, "OrderFormComponent")) __webpack_require__.d(__webpack_exports__, "OrderFormComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__["OrderFormComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__, "OrderNotesComponent")) __webpack_require__.d(__webpack_exports__, "OrderNotesComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__["OrderNotesComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__, "OrderNotesModalComponent")) __webpack_require__.d(__webpack_exports__, "OrderNotesModalComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__["OrderNotesModalComponent"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__, "PolicyClientService")) __webpack_require__.d(__webpack_exports__, "PolicyClientService", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__["PolicyClientService"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__, "ScheduleSprayDatesComponent")) __webpack_require__.d(__webpack_exports__, "ScheduleSprayDatesComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__services_ipolicy_result__["ScheduleSprayDatesComponent"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_policy_client_service__ = __webpack_require__("../../../../../src/app/order/services/policy-client.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "PolicyClientService", function() { return __WEBPACK_IMPORTED_MODULE_3__services_policy_client_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order_form_order_form_component__ = __webpack_require__("../../../../../src/app/order/order-form/order-form.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "OrderFormComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__order_form_order_form_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__order_notes_order_notes_component__ = __webpack_require__("../../../../../src/app/order/order-notes/order-notes.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "OrderNotesComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__order_notes_order_notes_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__order_notes_order_notes_modal_component__ = __webpack_require__("../../../../../src/app/order/order-notes/order-notes-modal.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "OrderNotesModalComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__order_notes_order_notes_modal_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__schedule_spray_dates_schedule_spray_dates_component__ = __webpack_require__("../../../../../src/app/order/schedule-spray-dates/schedule-spray-dates.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ScheduleSprayDatesComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__schedule_spray_dates_schedule_spray_dates_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__order_status__ = __webpack_require__("../../../../../src/app/order/order-status.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__order_status___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__order_status__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__order__ = __webpack_require__("../../../../../src/app/order/order.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__order___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__order__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__order_paging_factory__ = __webpack_require__("../../../../../src/app/order/order-paging-factory.ts");
/* unused harmony namespace reexport */











//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/order/order-form/order-form.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngIf]=\"tempOrder\">\n    <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dismissedClicked()\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n        <h4 class=\"modal-title\">Edit Order #{{tempOrder.ID}}</h4>\n    </div>\n    <div class=\"modal-body\">\n        <div class=\"panel panel-info\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Dealer Information</h4>\n            </div>\n            <div class=\"panel-body\">\n                <div [ngClass]=\"{'col-md-4': showProgram, 'col-md-6': !showProgram}\" class=\"form-group form-group-sm\">\n                    <label for=\"DealerID\">Dealer:</label>\n                    <select id=\"DealerID\" [disabled]=\"!enableDealerSelect\" [(ngModel)]=\"tempOrder.DealerID\" #dealer class=\"form-control input-sm\" (change)=\"dealerChangeEventHandler(dealer.value)\">\n                        <option *ngFor=\"let dealer of dealers\" [value]=\"dealer.ID\">{{dealer.Name}}</option>\n                    </select>\n                </div>\n                <div class=\"form-group form-group-sm col-md-4\" *ngIf=\"showProgram\">\n                    <label for=\"Program\">Select Program:</label>\n                    <select id=\"Program\" type=\"text\" #dealer class=\"form-control input-sm\" (change)=\"programChangedHandler($event.target.value)\">\n                        <option value=\"null\"></option>\n                        <option *ngFor=\"let val of discounts\" [value]=\"val.DiscountTypeID\" selected=\"{{ val.DiscountTypeID === selectedProgramID ? 'selected' : '' }}\">{{val.DiscountTypeName}}</option>\n                    </select>\n                </div>\n                <div [ngClass]=\"{'col-md-4': showProgram, 'col-md-6': !showProgram}\" class=\"form-group form-group-sm\">\n                    <label for=\"DealerPO\">Dealer PO:</label>\n                    <input id=\"DealerPO\" type=\"text\" [(ngModel)]=\"tempOrder.DealerPO\" class=\"form-control input-sm\" />\n                </div>\n            </div>\n        </div>\n        <div class=\"panel panel-info\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Order Information</h4>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"form-group form-group-sm col-md-6\">\n                    <label for=\"OrderDate\">Order Date:</label>\n                    <div class=\"input-group\">\n                        <input id=\"OrderDate\" class=\"form-control input-sm\" placeholder=\"yyyy-mm-dd\" name=\"OrderDate\" [(ngModel)]=\"tempOrderDate\">\n                        <span class=\"input-group-btn\">\n                            <button class=\"btn btn-sm btn-default\" (click)=\"setOrderDateClickedHander()\">Today</button>\n                        </span>\n                    </div>\n                    <small *ngIf=\"invalidDateShow\" class=\"text-danger\">Invalid Date String</small>\n                </div>\n                <div class=\"form-group form-group-sm col-md-6\">\n                    <label for=\"OrderStatus\">Order Status:</label>\n                    <select id=\"OrderStatus\" [(ngModel)]=\"tempOrder.OrderStatusID\" class=\"form-control input-sm\">\n                        <option *ngFor=\"let orderStatus of orderStatuses$ | async\" [value]=\"orderStatus.ID\">{{orderStatus.Name}}</option>\n                    </select>\n                </div>\n                <div class=\"form-group form-group-sm col-md-6\">\n                    <label for=\"SprayDate\">Spray Date:</label>\n                    <div class=\"input-group\">\n                        <input id=\"SprayDate\" class=\"form-control input-sm\" placeholder=\"yyyy-mm-dd\" name=\"SprayDate\" [(ngModel)]=\"tempSprayDate\">\n                        <span class=\"input-group-btn\">\n                            <button class=\"btn btn-sm btn-default\" (click)=\"setSprayDateClickedHander()\">Today</button>\n                        </span>\n                    </div>\n                    <small *ngIf=\"invalidDateShow\" class=\"text-danger\">Invalid Date String</small>\n                </div>\n                <div class=\"form-group form-group-sm col-md-6\">\n                    <label for=\"FinancedBy\">Financed By:</label>\n                    <input id=\"FinancedBy\" type=\"text\" [(ngModel)]=\"tempOrder.FinancedBy\" class=\"form-control input-sm\" />\n                </div>\n                <div class=\"form-group form-group-sm col-md-6\">\n                    <label for=\"Trailer\">Trailer Amount:</label>\n                    <input id=\"Trailer\" type=\"number\" [(ngModel)]=\"tempOrder.Trailer\" class=\"form-control input-sm\" />\n                </div>\n                <div class=\"form-group form-group-sm col-md-6\">\n                    <label for=\"Freight\">Freight Amount:</label>\n                    <input id=\"Freight\" type=\"number\" [(ngModel)]=\"tempOrder.Freight\" class=\"form-control input-sm\" />\n                </div>\n            </div>\n        </div>\n        <div class=\"panel panel-success\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\">Additional Item(s)</h3>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"form-group form-group-sm col-xs-4\">\n                    <label>Description:</label>\n                    <input [(ngModel)]=\"tempOrderItem.Description\" class=\"form-control input-sm\" />\n                </div>\n                <div class=\"form-group form-group-sm col-xs-8\">\n                    <label>Amount:</label>\n                    <div class=\"input-group input-group-sm\">\n                        <span class=\"input-group-addon\"><i class=\"fa fa-dollar\"></i></span>\n                        <input [(ngModel)]=\"tempOrderItem.Amount\" type=\"number\" class=\"form-control input-sm\" />\n                        <div class=\"input-group-btn\">\n                            <button class=\"btn btn-sm btn-success\" (click)=\"addOrderItemClickHander(tempOrderItem)\"><i class=\"fa fa-plus\"></i> Add</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <table class=\"table table-condensed table-striped table-responsive\">\n                <thead>\n                    <tr>\n                        <th class=\"col-md-8\">Item Description</th>\n                        <th class=\"col-md-3 text-right\">Amount</th>\n                        <th class=\"col-md-1\"></th>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngIf=\"tempOrder.OrderItems.length < 1\">\n                        <td colspan=\"3\" class=\"text-center\">No Items</td>\n                    </tr>\n                    <tr *ngFor=\"let orderItem of tempOrder.OrderItems\">\n                        <td>{{orderItem.Description}}</td>\n                        <td class=\"text-right\">{{orderItem.Amount | currency:(isoCurrencyCode$|async):true}}</td>\n                        <td><button class=\"btn btn-xs btn-default\" (click)=\"removeOrderItemClickHander(orderItem)\"><i class=\"fa fa-trash\"></i></button></td>\n                    </tr>\n                </tbody>\n                <tfoot class=\"bg-gray text-white text-bold\">\n                    <tr>\n                        <td class=\"text-right\">Total:</td>\n                        <td class=\"text-right\">{{getOrderItemTotal(tempOrder) | currency:(isoCurrencyCode$|async):true}}</td>\n                        <td></td>\n                    </tr>\n                </tfoot>\n            </table>\n        </div>\n        <div class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title\">Discount(s)</h3>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"form-group form-group-sm col-xs-4\">\n                    <label>Description:</label>\n                    <input [(ngModel)]=\"tempDiscount.Description\" class=\"form-control input-sm\" />\n                </div>\n                <div class=\"form-group form-group-sm col-xs-8\">\n                    <label>Amount:</label>\n                    <div class=\"input-group input-group-sm\">\n                        <span class=\"input-group-addon\"><i class=\"fa fa-dollar\"></i></span>\n                        <input [(ngModel)]=\"tempDiscount.DiscountAmount\" type=\"number\" class=\"form-control input-sm\" />\n                        <div class=\"input-group-btn\">\n                            <button class=\"btn btn-sm btn-primary\" (click)=\"addDiscountClickHander()\"><i class=\"fa fa-plus\"></i> Add</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <table class=\"table table-condensed table-striped table-responsive\">\n                <tbody>\n                    <ng-template [ngIf]=\"getDealerDiscounts().length > 0\">\n                    <tr>\n                        <th colspan=\"4\"><strong>Dealer Discount(s)</strong></th>\n                    </tr>\n                    <tr *ngFor=\"let dealerDiscount of getDealerDiscounts()\">\n                        <td width=\"10px\"></td>\n                        <td class=\"col-md-8\">{{dealerDiscount.Description}}</td>\n                        <td class=\"col-md-3 text-right\">{{dealerDiscount.DiscountAmount | currency:(isoCurrencyCode$|async):true}}</td>\n                        <td class=\"col-md-1\"></td>\n                    </tr>\n                    <tr>\n                        <td width=\"10px\"></td>\n                        <th class=\"text-right\">Total:</th>\n                        <th class=\"text-right\">{{calcService.CurrTotalSummary.DealerDiscount | currency:(isoCurrencyCode$|async):true}}</th>\n                        <td></td>\n                    </tr>\n                    </ng-template>\n                    <ng-template [ngIf]=\"getFactoryIncentives().length > 0\">\n                    <tr>\n                        <th colspan=\"4\"><strong>Factory Incentive(s)</strong></th>\n                    </tr>\n                    <tr *ngFor=\"let discount of getFactoryIncentives()\">\n                        <td width=\"10px\"></td>\n                        <td class=\"col-md-8\">{{discount.Description}}</td>\n                        <td class=\"col-md-3 text-right\">{{discount.DiscountAmount | currency:(isoCurrencyCode$|async):true}}</td>\n                        <td class=\"col-md-1\"><button class=\"btn btn-xs btn-default\" [ngClass]=\"{'hidden': discount.DiscountTypeID > 0}\" (click)=\"removeDiscountClickHander(discount)\"><i class=\"fa fa-trash\"></i></button></td>\n                    </tr>\n                    <tr *ngIf=\"getDealerDiscounts().length > 0 && getFactoryIncentives().length > 0\">\n                        <td width=\"10px\"></td>\n                        <th class=\"text-right\">Total:</th>\n                        <th class=\"text-right\">{{calcService.CurrTotalSummary.FactoryIncentive | currency:(isoCurrencyCode$|async):true}}</th>\n                        <td></td>\n                    </tr>\n                    </ng-template>\n                    <tr *ngIf=\"tempOrder.OrderDiscounts.length < 1\">\n                        <td colspan=\"4\" class=\"text-center\">No Dealer Discounts</td>\n                    </tr>\n                </tbody>\n                <tfoot class=\"bg-gray text-white text-bold\">\n                    <tr>\n                        <td width=\"10px\"></td>\n                        <td class=\"text-right\">Total:</td>\n                        <td class=\"text-right\">{{(calcService.CurrTotalSummary.DealerDiscount + calcService.CurrTotalSummary.FactoryIncentive) | currency:(isoCurrencyCode$|async):true}}</td>\n                        <td></td>\n                    </tr>\n                </tfoot>\n            </table>\n        </div>\n        <div class=\"panel panel-info\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Boat Information</h4>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"form-group form-group-sm col-md-4\">\n                    <label for=\"HullID\">Hull ID:</label>\n                    <input id=\"HullID\" type=\"text\" [(ngModel)]=\"tempOrder.HullID\" class=\"form-control input-sm\" />\n                </div>\n                <div class=\"form-group form-group-sm col-md-4\">\n                    <label for=\"EngineID\">Engine ID:</label>\n                    <input id=\"EngineID\" type=\"text\" [(ngModel)]=\"tempOrder.EngineID\" class=\"form-control input-sm\" />\n                </div>\n                <div class=\"form-group form-group-sm col-md-4\">\n                    <label for=\"TransmissionID\">Transmission ID:</label>\n                    <input id=\"TransmissionID\" type=\"text\" [(ngModel)]=\"tempOrder.TransmissionID\" class=\"form-control input-sm\" />\n                </div>\n            </div>\n        </div>\n        <div class=\"panel panel-info\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Trailer Information</h4>\n            </div>\n            <div class=\"panel-body\">\n                <div class=\"form-group form-group-sm col-md-12\">\n                    <label for=\"TrailerID\">Trailer ID:</label>\n                    <input id=\"TrailerID\" type=\"text\" [(ngModel)]=\"tempOrder.TrailerID\" class=\"form-control input-sm\" />\n                </div>\n            </div>\n        </div>\n        <div class=\"panel panel-info\">\n            <div class=\"panel-heading\">\n                <h4 class=\"panel-title\">Notes</h4>\n            </div>\n            <div class=\"panel-body\">\n                <mb-order-notes [orderID]=\"tempOrder.ID\"></mb-order-notes>\n            </div>\n        </div>\n        <table class=\"table table-condensed table-striped\">\n            <tbody>\n                <tr>\n                    <td class=\"col-sm-8 text-right\">Dealer Base:</td>\n                    <td class=\"text-right col-sm-2\">{{calcService.CurrTotalSummary.BasePrice | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr>\n                    <td class=\"text-right\">Dealer Discount:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.DealerDiscount | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr style=\"border-top:1px double #666\">\n                    <td class=\"text-right\"><strong>Model Total:</strong></td>\n                    <td class=\"text-right\"><strong>{{calcService.CurrTotalSummary.BoatTotal | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                </tr>\n                <tr>\n                    <td class=\"text-right\">Options Total:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.OptionsTotal | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr>\n                    <td class=\"text-right\">Additional Items Total:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.OrderItemsTotal | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr>\n                    <td class=\"text-right\">Trailer:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.Trailer| currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr>\n                    <td class=\"text-right\">Freight:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.Freight | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr style=\"border-top:1px double #666\">\n                    <td class=\"text-right\"><strong>Subtotal:</strong></td>\n                    <td class=\"text-right\"><strong>{{calcService.CurrTotalSummary.SubTotal | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                </tr>\n                <tr *ngIf=\"calcService.CurrTotalSummary.FactoryIncentive>0\">\n                    <td class=\"text-right\">Factory Incentive(s):</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.FactoryIncentive | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n                <tr>\n                    <td class=\"text-right\">Surcharges:</td>\n                    <td class=\"text-right\">{{calcService.CurrTotalSummary.Surcharge | currency:(isoCurrencyCode$|async):true}}</td>\n                </tr>\n            </tbody>\n            <tfoot>\n                <tr style=\"border-top: 2px solid #666\">\n                    <td class=\"text-right\"><strong>Total:</strong></td>\n                    <td class=\"text-right\"><strong>{{calcService.CurrTotalSummary.Total | currency:(isoCurrencyCode$|async):true}}</strong></td>\n                </tr>\n            </tfoot>\n        </table>\n    </div>\n    <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-sm btn-default\" (click)=\"dismissedClicked()\">Cancel</button>\n        <button type=\"button\" class=\"btn btn-sm btn-primary\" (click)=\"saveOrderClicked()\">Save changes</button>\n    </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/order/order-form/order-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dealer__ = __webpack_require__("../../../../../src/app/dealer/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order__ = __webpack_require__("../../../../../src/app/order/order.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__order___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__order__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_order_service__ = __webpack_require__("../../../../../src/app/order/services/order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__surcharge__ = __webpack_require__("../../../../../src/app/surcharge/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__discount__ = __webpack_require__("../../../../../src/app/discount/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pricing__ = __webpack_require__("../../../../../src/app/pricing/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_lodash__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var createEmptyOrderDiscount = function () { return ({
    ID: 0,
    DiscountAmount: 0,
    Description: "",
    DiscountTypeID: null,
    DiscountTypeName: "",
    OrderID: null
}); };
var createEmptyOrderItem = function () { return ({
    ID: 0,
    Amount: 0,
    Description: "",
    OrderID: null
}); };
var OrderFormComponent = (function () {
    function OrderFormComponent(settingService, calcService, orderService, router, dealerService, auth, appState, toastsManager, discountService, pricingService, diag) {
        this.settingService = settingService;
        this.calcService = calcService;
        this.orderService = orderService;
        this.router = router;
        this.dealerService = dealerService;
        this.auth = auth;
        this.appState = appState;
        this.toastsManager = toastsManager;
        this.discountService = discountService;
        this.pricingService = pricingService;
        this.diag = diag;
        this.onOrderSaved = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onOrderDismiss = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.tempDiscount = createEmptyOrderDiscount();
        this.tempOrderItem = createEmptyOrderItem();
        this.dealers = [];
        this.showProgram = false;
    }
    Object.defineProperty(OrderFormComponent.prototype, "factoryIncentives", {
        get: function () {
            return !this.tempOrder || !this.tempOrder.OrderDiscounts ? 0
                : _.sum(this.tempOrder.OrderDiscounts
                    .filter(function (d) { return !d.DiscountTypeID; })
                    .map(function (d) { return d.DiscountAmount; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderFormComponent.prototype, "dealerDiscount", {
        get: function () {
            return !this.tempOrder || !this.tempOrder.OrderDiscounts ? 0
                : _.sum(this.tempOrder.OrderDiscounts
                    .filter(function (d) { return d.DiscountTypeID; })
                    .map(function (d) { return d.DiscountAmount; }));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OrderFormComponent.prototype, "discounts", {
        get: function () {
            return this._discounts;
        },
        set: function (discounts) {
            this._discounts = discounts;
            this.showProgram = (discounts.length > 0);
        },
        enumerable: true,
        configurable: true
    });
    OrderFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.enableDealerSelect = this.appState.CurrentUser.IsAdmin;
        this.dealerService.getDealers().subscribe(function (dealers) { return _this.dealers = dealers; });
        this.orderStatuses$ = this.orderService.getOrderStatuses();
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
        this.discounts = [];
    };
    OrderFormComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.order) {
            this.tempOrderDate = this.order.OrderDate ? new __WEBPACK_IMPORTED_MODULE_1__angular_common__["DatePipe"]('en-US').transform(this.order.OrderDate, 'MM/dd/yyyy') : '';
            this.tempSprayDate = this.order.SprayDate ? new __WEBPACK_IMPORTED_MODULE_1__angular_common__["DatePipe"]('en-US').transform(this.order.SprayDate, 'MM/dd/yyyy') : '';
            this.loadOrder(__assign({}, this.order));
            if (this.order.Dealer) {
                this.discountService
                    .getDiscountForOrder(this.order.ID, this.order.DealerID)
                    .subscribe(function (discounts) { return _this.discounts = discounts; });
            }
        }
    };
    OrderFormComponent.prototype.dealerChangeEventHandler = function (dealerID) {
        var _this = this;
        var dealer = this.dealers.find(function (d) { return d.ID == dealerID; });
        this.tempOrder.Dealer = dealer;
        this.tempOrder.DealerID = dealer.ID;
        // need to filter out program (Cash/Program) discount because the selected dealer may not
        // qualify to get discounts
        this.tempOrder.OrderDiscounts = this.tempOrder.OrderDiscounts.filter(function (orderDiscount) { return !orderDiscount.DiscountTypeID; });
        this.loadDiscounts(dealerID);
        this.orderService.recalculate(this.tempOrder).subscribe(function (order) { return _this.loadOrder(order); });
    };
    OrderFormComponent.prototype.programChangedHandler = function (selectedProgramID) {
        var _this = this;
        var selectedProgram = this.discounts.find(function (d) { return d.DiscountTypeID === (+selectedProgramID); });
        this.tempOrder.WinterRebate = (!!selectedProgram);
        if (!!selectedProgram) {
            var orderDiscounts = this.tempOrder.OrderDiscounts.filter(function (od) { return !_this.discounts.some(function (d) { return d.DiscountTypeID === od.DiscountTypeID; }); });
            orderDiscounts.push({
                ID: 0,
                Description: selectedProgram.DiscountTypeName,
                OrderID: this.tempOrder.ID,
                DiscountAmount: selectedProgram.Amount,
                DiscountTypeID: selectedProgram.DiscountTypeID,
                DiscountTypeName: selectedProgram.DiscountTypeName
            });
            this.tempOrder.OrderDiscounts = orderDiscounts.sort(function (a, b) { return a.DiscountTypeID - b.DiscountTypeID; });
            this.calcService.calculateOrderTotal(this.tempOrder);
        }
    };
    OrderFormComponent.prototype.saveOrderClicked = function () {
        var _this = this;
        this.tempOrder.OrderDate = new Date(this.tempOrderDate);
        this.tempOrder.SprayDate = new Date(this.tempSprayDate);
        this.orderService
            .updateOrder(this.tempOrder)
            .first()
            .subscribe(function (order) {
            _this.toastsManager.success('Order has been saved.', 'Order Saved');
            _this.onOrderSaved.emit(order);
        }, function (err) { return _this.toastsManager.error(err, 'Error'); });
    };
    OrderFormComponent.prototype.dismissedClicked = function () {
        this.onOrderDismiss.emit();
    };
    OrderFormComponent.prototype.addDiscountClickHander = function () {
        this.tempOrder.OrderDiscounts.push(this.tempDiscount);
        this.tempOrder.OrderDiscounts.sort(function (a, b) {
            return a.DiscountTypeID < b.DiscountTypeID ? 1
                : a.DiscountTypeID > b.DiscountTypeID ? -1
                    : 0;
        });
        this.tempDiscount = createEmptyOrderDiscount();
        this.calcService.calculateOrderTotal(this.tempOrder);
    };
    OrderFormComponent.prototype.removeDiscountClickHander = function (discount) {
        var index = this.tempOrder.OrderDiscounts.findIndex(function (d) { return d === discount; });
        if (index > -1) {
            this.tempOrder.OrderDiscounts.splice(index, 1);
            this.tempOrder.DiscountTotal = this.tempOrder.DiscountTotal - this.tempDiscount.DiscountAmount;
        }
        this.calcService.calculateOrderTotal(this.tempOrder);
    };
    OrderFormComponent.prototype.setOrderDateClickedHander = function () {
        this.tempOrderDate = new __WEBPACK_IMPORTED_MODULE_1__angular_common__["DatePipe"]('en-US').transform(new Date(), 'MM/dd/yyyy');
    };
    OrderFormComponent.prototype.setSprayDateClickedHander = function () {
        this.tempSprayDate = new __WEBPACK_IMPORTED_MODULE_1__angular_common__["DatePipe"]('en-US').transform(new Date(), 'MM/dd/yyyy');
    };
    OrderFormComponent.prototype.addOrderItemClickHander = function (orderItem) {
        if (!orderItem.Description) {
            this.toastsManager.error('Description can not be empty.');
            return;
        }
        if (!orderItem.Amount) {
            this.toastsManager.error('Amount can not be empty.');
            return;
        }
        this.tempOrder.OrderItems.push(orderItem);
        this.tempOrderItem = createEmptyOrderItem();
        this.calcService.calculateOrderTotal(this.tempOrder);
    };
    OrderFormComponent.prototype.removeOrderItemClickHander = function (orderItem) {
        var index = this.tempOrder.OrderItems.findIndex(function (oi) { return oi === orderItem; });
        if (index > -1) {
            this.tempOrder.OrderItems.splice(index, 1);
            this.calcService.calculateOrderTotal(this.tempOrder);
        }
    };
    OrderFormComponent.prototype.getOrderItemTotal = function (order) {
        return order.OrderItems.reduce(function (total, curr, i, arr) { return total += curr.Amount; }, 0);
    };
    OrderFormComponent.prototype.getDealerDiscounts = function () {
        return this.tempOrder.OrderDiscounts.filter(function (d) { return d.DiscountTypeID > 0; });
    };
    OrderFormComponent.prototype.getFactoryIncentives = function () {
        return this.tempOrder.OrderDiscounts.filter(function (d) { return !d.DiscountTypeID || d.DiscountTypeID === 0; });
    };
    OrderFormComponent.prototype.loadOrder = function (order) {
        this.tempOrder = order;
        this.tempDiscount.OrderID = order.ID;
        var foundDiscount = order.OrderDiscounts ? order.OrderDiscounts.find(function (d) { return !!d.DiscountTypeID; }) : null;
        this.selectedProgramID = foundDiscount ? foundDiscount.DiscountTypeID : 0;
        this.calcService.calculateOrderTotal(this.tempOrder);
    };
    OrderFormComponent.prototype.loadDiscounts = function (dealerID) {
        var _this = this;
        this.discountService
            .getDiscountForOrder(this.tempOrder.ID, dealerID)
            .subscribe(function (discounts) { return _this.discounts = discounts; });
    };
    return OrderFormComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__order__["IOrder"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__order__["IOrder"]) === "function" && _a || Object)
], OrderFormComponent.prototype, "order", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], OrderFormComponent.prototype, "onOrderSaved", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], OrderFormComponent.prototype, "onOrderDismiss", void 0);
OrderFormComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-order-form',
        template: __webpack_require__("../../../../../src/app/order/order-form/order-form.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_8__shared__["c" /* CalculationService */], __WEBPACK_IMPORTED_MODULE_6__surcharge__["SurchargeService"]],
        styles: ["\n        .bg-gray { background-color: #898989; } .text-white { color: #fff; } .text-bold { font-weight: bold; }\n    "]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_9__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__application_setting__["ApplicationSettingService"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_8__shared__["c" /* CalculationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__shared__["c" /* CalculationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__services_order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_order_service__["a" /* OrderService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__dealer__["DealerClientService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__dealer__["DealerClientService"]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_7__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__auth__["AuthService"]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_8__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__shared__["a" /* ApplicationState */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_10__discount__["DiscountService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__discount__["DiscountService"]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_11__pricing__["PricingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__pricing__["PricingService"]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_8__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__shared__["f" /* DiagnosticService */]) === "function" && _m || Object])
], OrderFormComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
//# sourceMappingURL=order-form.component.js.map

/***/ }),

/***/ "../../../../../src/app/order/order-notes/order-notes-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"modal-header\">\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"onNoteDismiss()\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <h4 class=\"modal-title\">Order Notes: {{ orderID }}</h4>\n</div>\n<div class=\"modal-body\">\n    <mb-order-notes [orderID]=\"orderID\"></mb-order-notes>\n</div>"

/***/ }),

/***/ "../../../../../src/app/order/order-notes/order-notes-modal.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderNotesModalComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderNotesModalComponent = (function () {
    function OrderNotesModalComponent() {
        var _this = this;
        this.onDismiss = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onNoteDismiss = function () {
            return _this.onDismiss.emit();
        };
    }
    return OrderNotesModalComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], OrderNotesModalComponent.prototype, "orderID", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], OrderNotesModalComponent.prototype, "onDismiss", void 0);
OrderNotesModalComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'mb-order-notes-modal',
        template: __webpack_require__("../../../../../src/app/order/order-notes/order-notes-modal.component.html")
    }),
    __metadata("design:paramtypes", [])
], OrderNotesModalComponent);

//# sourceMappingURL=order-notes-modal.component.js.map

/***/ }),

/***/ "../../../../../src/app/order/order-notes/order-notes.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template ngFor let-note [ngForOf]=\"notes$ | async\">\n    <div *ngIf=\"note.Internal\" class=\"well\">{{ note.Note }}</div>\n    <blockquote\n        *ngIf=\"!note.Internal\"\n        [ngClass]=\"{ 'blockquote-reverse': note.CreatedBy === currentUser }\">\n        <p>{{note.Note}}</p>\n        <footer>{{note.CreatedBy}} <cite title=\"{{toMoment(note.CreatedDate)}}\">{{toMoment(note.CreatedDate)}}</cite></footer>\n    </blockquote>\n</ng-template>\n<div class=\"row\">\n    <hr>\n    <div class=\"col-md-11\">\n        <textarea\n            id=\"Note\"\n            [(ngModel)]=\"newNoteText\"\n            rows=\"3\"\n            type=\"text\"\n            class=\"form-control input-sm\"\n        ></textarea>\n        <label *ngIf=\"isAdmin\">\n            <input\n                [(ngModel)]=\"newNoteInternal\"\n                type=\"checkbox\"> Internal?\n        </label>\n    </div>\n    <button\n        (click)=\"onAddNote()\"\n        class=\"btn btn-sm btn-primary\"\n    ><i class=\"fa fa-plus\"></i> Add</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/order/order-notes/order-notes.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderNotesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_order_service__ = __webpack_require__("../../../../../src/app/order/services/order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__node_modules_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__node_modules_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrderNotesComponent = (function () {
    function OrderNotesComponent(orderService, appState, toastr) {
        var _this = this;
        this.orderService = orderService;
        this.appState = appState;
        this.toastr = toastr;
        this.newNoteText = '';
        this.newNoteInternal = false;
        this.currentUser = this.appState.CurrentUser.Email;
        this.isAdmin = this.appState.CurrentUser.IsAdmin;
        this.onAddNote = function () {
            return _this.orderService
                .addNote(_this.orderID, _this.newNoteText, _this.newNoteInternal)
                .first()
                .subscribe(function () {
                _this.notes$ = _this.orderService.getNotes(_this.orderID);
                _this.newNoteText = '';
                _this.newNoteInternal = false;
            }, function (_) { return _this.toastr.error('An error occurred when submitting your note.'); });
        };
        this.toMoment = function (date) {
            return __WEBPACK_IMPORTED_MODULE_4_moment__(date).fromNow();
        };
    }
    Object.defineProperty(OrderNotesComponent.prototype, "orderID", {
        get: function () {
            return this._orderID;
        },
        set: function (orderID) {
            this._orderID = orderID;
            this.notes$ = this.orderService.getNotes(this.orderID);
        },
        enumerable: true,
        configurable: true
    });
    return OrderNotesComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], OrderNotesComponent.prototype, "orderID", null);
OrderNotesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'mb-order-notes',
        template: __webpack_require__("../../../../../src/app/order/order-notes/order-notes.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_order_service__["a" /* OrderService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* ApplicationState */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__node_modules_ng2_toastr__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__node_modules_ng2_toastr__["ToastsManager"]) === "function" && _c || Object])
], OrderNotesComponent);

var _a, _b, _c;
//# sourceMappingURL=order-notes.component.js.map

/***/ }),

/***/ "../../../../../src/app/order/order-paging-factory.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return orderUnscheduledPagingServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return orderPagingServiceFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shared_services_paging_service__ = __webpack_require__("../../../../../src/app/_shared/services/paging.service.ts");

var orderUnscheduledPagingServiceFactory = function (orderService) {
    var pInfo = {
        hasNext: false,
        page: 1
    };
    return new __WEBPACK_IMPORTED_MODULE_0__shared_services_paging_service__["a" /* PagingService */](function (pageInfo) { return pageInfo.hasNext; }, function (pageInfo) { return orderService.getOrders(pageInfo.page, "ID", false, 0).share().first(); }, function (o) { return o; }, function (t) {
        pInfo = { hasNext: ((t || []).length > 0), page: (pInfo.page + 1) };
        return pInfo;
    }, function () { return orderService.getOrders(pInfo.page, "ID", false, 0).share().first(); });
};
var orderPagingServiceFactory = function (orderService) {
    var pInfo = {
        hasNext: false,
        page: 1
    };
    return new __WEBPACK_IMPORTED_MODULE_0__shared_services_paging_service__["a" /* PagingService */](function (pageInfo) { return pageInfo.hasNext; }, function (pageInfo) { return orderService.getOrders(pageInfo.page, "ID", false).share().first(); }, function (o) { return o; }, function (t) {
        pInfo = { hasNext: ((t || []).length > 0), page: (pInfo.page + 1) };
        return pInfo;
    }, function () { return orderService.getOrders(pInfo.page, "ID", false).share().first(); });
};
//# sourceMappingURL=order-paging-factory.js.map

/***/ }),

/***/ "../../../../../src/app/order/order-status.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=order-status.js.map

/***/ }),

/***/ "../../../../../src/app/order/order.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=order.js.map

/***/ }),

/***/ "../../../../../src/app/order/orders.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".striped {\n    background-color: #f8f8f8\n}\n\n.order-list .row {\n    padding-top: 5px;\n    padding-bottom: 5px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/order/orders.component.html":
/***/ (function(module, exports) {

module.exports = "<section class=\"padded\">\n    <div class=\"container\">\n        <div class=\"panel panel-default\">\n            <div class=\"panel-heading\">Orders</div>\n            <div class=\"panel-body\">\n                <div class=\"pull-right\">\n                    Sort By:\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                {{ orderField.displayName }} <span class=\"caret\"></span>\n                                <span class=\"sr-only\">Toggle Dropdown</span>\n                        </button>\n                        <ul class=\"dropdown-menu dropdown-menu-right\">\n                            <li><button class=\"btn btn-link\" *ngFor=\"let field of fields\" (click)=\"setSorting(field, orderDirection)\">{{ field.displayName }}</button></li>\n                        </ul>\n                    </div>\n                    <div class=\"btn-group\">\n                        <button type=\"button\" class=\"btn dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                {{ orderDirection.displayName }} <span class=\"caret\"></span>\n                                <span class=\"sr-only\">Toggle Dropdown</span>\n                        </button>\n                        <ul class=\"dropdown-menu dropdown-menu-right\">\n                            <li><button class=\"btn btn-link\" *ngFor=\"let direction of orderDirections\" (click)=\"setSorting(orderField, direction)\">{{ direction.displayName }}</button></li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n            <div class=\"panel panel-body order-list\" scroller [scrollCallback]=\"onScroll\" [useDocument]=\"true\">\n                <div *ngFor=\"let order of orders$ | async; let i = index\" class=\"row\" [ngClass]=\"{ 'striped': i % 2 === 0 }\" >\n                    <div class=\"col-sm-2\">\n                        <ng-template #modelHover><img src=\"{{ imageLookup[order.ConfigurationID] | async }}\" alt=\"Preview image order {{ order.ID }}.\" /></ng-template>\n                        <div *ngIf=\"appState.CurrentUser.IsAdmin || !lockLookup[order.ConfigurationID]\"><button class=\"btn btn-xs btn-link\" style=\"padding-left: 0\" (click)=\"editModelClicked(order)\" [popover]=\"modelHover\" triggers=\"mouseenter:mouseleave\">{{order.ModelName}}</button></div>\n                        <div *ngIf=\"!appState.CurrentUser.IsAdmin && lockLookup[order.ConfigurationID]\">{{order.ModelName}}</div>\n                        <div *ngIf=\"order.HullID\">{{order.HullID}}</div>\n                        <div *ngIf=\"order.EngineID\"><small><strong>Engine</strong> {{order.EngineID}}</small></div>\n                        <div *ngIf=\"order.TransmissionID\"><small><strong>Trans</strong> {{order.TransmissionID}}</small></div>\n                        <div *ngIf=\"TrailerID\"><small><strong>Trailer</strong> {{order.TrailerID}}</small></div>\n                        <h1></h1>\n                    </div>\n                    <div class=\"col-sm-2\">\n                        <strong>{{order.ID}} <i class=\"fa\" [ngClass]=\"{ 'fa-lock': lockLookup[order.ConfigurationID], 'fa-unlock': !lockLookup[order.ConfigurationID] }\"></i></strong><br />\n                        <div><small><strong>Spray</strong> {{(order.SprayDate) ? (order.SprayDate | date: 'M/d/yyyy') : 'tdb.'}} {{(order.SprayDateScheduleType === 2) ? ' (tenative)' : '' }}</small></div>\n                        <div><small><strong>Ordered</strong> {{order.OrderDate|date:'M/d/yyyy'}}</small></div>\n                    </div>\n                    <div *ngIf=\"appState.CurrentUser.IsAdmin\" class=\"col-sm-3\">\n                        {{!!order.Dealer ? order.Dealer.Name : ''}}\n                        <div *ngIf=\"order.FinancedBy\"><small>{{order.FinancedBy}}</small></div>\n                        <div *ngIf=\"order.DealerPO\"><small><strong>PO</strong> {{order.DealerPO}}</small></div>\n                    </div>\n                    <div class=\"col-sm-1\">{{order.Total | currency:(isoCurrencyCode$|async):true}}</div>\n                    <div class=\"col-sm-2\">\n                        <div placement=\"top\" tooltip=\"{{order.ModifiedBy}}\"><small><strong>Modified</strong> {{order.ModifiedDate|date:'M/d/yyyy'}}</small></div>\n                        <div placement=\"top\" tooltip=\"{{order.CreatedBy}}\"><small><strong>Created</strong> {{order.CreatedDate|date:'M/d/yyyy'}}</small></div>\n                    </div>\n                    <div class=\"col-sm-2\">\n                        <div *ngIf=\"appState.CurrentUser.IsAdmin\" class=\"btn-group\">\n                            <button type=\"button\" class=\"btn btn-primary btn-xs\" (click)=\"editOrderClicked(order)\">\n                                Edit\n                            </button>\n                            <button type=\"button\" class=\"btn btn-primary btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                <span class=\"caret\"></span>\n                                <span class=\"sr-only\">Toggle Dropdown</span>\n                            </button>\n                            <ul class=\"dropdown-menu dropdown-menu-right\">\n                                <li *ngIf=\"lockLookup[order.ConfigurationID]\" ><button class=\"btn btn-link\" (click)=\"configurationLock(order.ID, false)\"><i class=\"fa fa-unlock\"></i> Unlock</button></li>\n                                <li *ngIf=\"!lockLookup[order.ConfigurationID]\"><button class=\"btn btn-link\" (click)=\"configurationLock(order.ID, true)\"><i class=\"fa fa-lock\"></i> Lock</button></li>\n                                <li role=\"separator\" class=\"divider\"></li>\n                                <li><button class=\"btn btn-link\" (click)=\"actionClick('print/all', order.ID)\"><i class=\"fa fa-print\"></i> Print All</button></li>\n                                <li><button class=\"btn btn-link\" (click)=\"actionClick('print/modelpricing', order.ID)\"><i class=\"fa fa-print\"></i> Print Model Price</button></li>\n                                <li><button class=\"btn btn-link\" (click)=\"actionClick('print/model', order.ID)\"><i class=\"fa fa-print\"></i> Print Model Info</button></li>\n                                <li role=\"separator\" class=\"divider\"></li>\n                                <li><button class=\"btn btn-link\" (click)=\"actionClick('print/upholstery', order.ID)\"><i class=\"fa fa-print\"></i> Print Upholstery</button></li>\n                                <li><button class=\"btn btn-link\" (click)=\"actionClick('print/gelcoat', order.ID)\"><i class=\"fa fa-print\"></i> Print Gelcoat</button></li>\n                            </ul>\n                            <button type=\"button\" class=\"btn btn-success btn-xs\" (click)=\"showNotes(order)\">\n                                <i class=\"fa fa-comment-o\"></i>\n                            </button>\n                        </div>\n                        <div *ngIf=\"!appState.CurrentUser.IsAdmin\" class=\"btn-group\">\n                            <div class=\"btn-group\">\n                                <button type=\"button\" class=\"btn btn-primary btn-xs dropdown-toggle\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                                    <i class=\"fa fa-print\"></i> Print <span class=\"caret\"></span>\n                                </button>\n                                <ul class=\"dropdown-menu dropdown-menu-right\">\n                                    <li><button class=\"btn btn-link\" (click)=\"actionClick('print/modelpricing', order.ID)\"><i class=\"fa fa-print\"></i> Print Order (Cost)</button></li>\n                                    <li><button class=\"btn btn-link\" (click)=\"actionClick('print/model', order.ID)\"><i class=\"fa fa-print\"></i> Print Model Info (No Pricing)</button></li>\n                                    <li><button class=\"btn btn-link\" (click)=\"retailPrintClick('print/retail', order.ConfigurationID)\"><i class=\"fa fa-print\"></i> Print Model Info (Retail)</button></li>\n                                </ul>\n                            </div>\n                            <button type=\"button\" class=\"btn btn-success btn-xs\" (click)=\"showNotes(order)\">\n                                <i class=\"fa fa-comment-o\"></i>\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div bsModal #orderEditModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n        <div class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n                <cwd-order-form [(order)]=\"selectedOrder\" (onOrderDismiss)=\"orderChangesDismissed()\" (onOrderSaved)=\"orderSaved($event)\" >\n                </cwd-order-form>\n            </div>\n        </div>\n    </div>\n    <div bsModal #notesModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n        <div *ngIf=\"notesOrder\" class=\"modal-dialog modal-lg\">\n            <div class=\"modal-content\">\n                <mb-order-notes-modal [orderID]=\"notesOrder.ID\" (onDismiss)=\"dismissNotes()\"></mb-order-notes-modal>\n            </div>\n        </div>\n    </div>\n</section>"

/***/ }),

/***/ "../../../../../src/app/order/orders.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_order_service__ = __webpack_require__("../../../../../src/app/order/services/order.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__discount__ = __webpack_require__("../../../../../src/app/discount/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__order_paging_factory__ = __webpack_require__("../../../../../src/app/order/order-paging-factory.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_filter__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_mergeMap__ = __webpack_require__("../../../../rxjs/add/operator/mergeMap.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_mergeMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_add_operator_mergeMap__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var OrderComponent = (function () {
    function OrderComponent(settingService, configService, diag, orderService, appState, router, toastr, pagingService) {
        var _this = this;
        this.settingService = settingService;
        this.configService = configService;
        this.diag = diag;
        this.orderService = orderService;
        this.appState = appState;
        this.router = router;
        this.toastr = toastr;
        this.pagingService = pagingService;
        this.lockLookup = {};
        this.imageLookup = {};
        this.fields = [
            { value: 'ID', displayName: 'Order ID' },
            { value: 'HullID', displayName: 'Hull ID' },
            { value: 'EngineID', displayName: 'Engine ID' },
            { value: 'TransmissionID', displayName: 'Transmission ID' },
            { value: 'TrailerID', displayName: 'Trailer ID' },
        ];
        this.orderField = this.fields[0];
        this.orderDirections = [
            { value: '0', displayName: 'Ascending' },
            { value: '1', displayName: 'Descending' }
        ];
        this.orderDirection = this.orderDirections[1];
        this.toLookup = function (states) { return states.reduce(function (prev, curr) {
            prev[curr.id] = curr.locked;
            return prev;
        }, {}); };
        this.dismissNotes = function () {
            _this.notesOrder = undefined;
            _this.notesModal.hide();
        };
        this.onScroll = function () {
            return _this.pagingService.getNext();
        };
        this.orderChangesDismissed = function () {
            return _this.orderEditModal.hide();
        };
        this.orderSaved = function (order) {
            // copy order back to item
            _this.selectedOrder.DealerID = order.DealerID;
            _this.selectedOrder.Dealer = order.Dealer;
            _this.selectedOrder.OrderStatusID = order.OrderStatusID;
            _this.selectedOrder.ModelName = order.ModelName;
            _this.selectedOrder.DealerPO = order.DealerPO;
            _this.selectedOrder.HullID = order.HullID;
            _this.selectedOrder.OrderDate = order.OrderDate;
            _this.selectedOrder.EngineID = order.EngineID;
            _this.selectedOrder.TransmissionID = order.TransmissionID;
            _this.selectedOrder.ConfigurationID = order.ConfigurationID;
            _this.selectedOrder.TrailerID = order.TrailerID;
            _this.selectedOrder.FinancedBy = order.FinancedBy;
            _this.selectedOrder.Freight = order.Freight;
            _this.selectedOrder.Trailer = order.Trailer;
            _this.selectedOrder.OptionsTotal = order.OptionsTotal;
            _this.selectedOrder.DealerBoatPrice = order.DealerBoatPrice;
            _this.selectedOrder.Surcharge = order.Surcharge;
            _this.selectedOrder.SubTotal = order.SubTotal;
            _this.selectedOrder.Total = order.Total;
            _this.selectedOrder.CreatedBy = order.CreatedBy;
            _this.selectedOrder.CreatedDate = order.CreatedDate;
            _this.selectedOrder.ModifiedBy = order.ModifiedBy;
            _this.selectedOrder.ModifiedDate = order.ModifiedDate;
            _this.selectedOrder.WinterRebate = order.WinterRebate;
            _this.selectedOrder.OrderSurcharges = order.OrderSurcharges;
            _this.selectedOrder.OrderDiscounts = order.OrderDiscounts;
            _this.selectedOrder.DiscountTotal = order.DiscountTotal;
            _this.selectedOrder.OrderItems = order.OrderItems;
            _this.selectedOrder.SprayDate = order.SprayDate;
            _this.selectedOrder.SprayDateScheduleType = order.SprayDateScheduleType;
            _this.orderEditModal.hide();
            // dereference
            _this.selectedOrder = undefined;
        };
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orders$ = this
            .pagingService
            .items$
            .do(function (orders) {
            return _this.imageLookup =
                orders.reduce(function (prev, curr) {
                    prev[curr.ConfigurationID] = _this.getConfigurationImage$(curr.ConfigurationID);
                    return prev;
                }, {});
        })
            .do(function (orders) { return _this
            .configService
            .getConfigurationsLockState(orders.map(function (o) { return o.ConfigurationID; }))
            .map(_this.toLookup)
            .subscribe(function (data) { return _this.lockLookup = data; }); });
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
        this.appState.resetImpersonation();
    };
    OrderComponent.prototype.getConfigurationImage$ = function (configurationID) {
        var _this = this;
        return this
            .settingService
            .applicationSetting$
            .filter(function (setting) { return !!setting; })
            .map(function (setting) { return setting['StoragePublicBaseUrl']; })
            .switchMap(function (baseUrl) { return _this
            .configService
            .getConfigurationImage(configurationID, 'Exterior', 'sm')
            .map(function (imgUrl) { return imgUrl || 'no-image.png'; })
            .map(function (imgUrl) { return "" + baseUrl + imgUrl; }); });
    };
    OrderComponent.prototype.actionClick = function (route, orderID) {
        window.open(route + "/" + orderID, "_newTab" + route.replace('/', '') + "_" + orderID, null, false);
    };
    OrderComponent.prototype.retailPrintClick = function (route, configID) {
        window.open(route + "/" + configID, "_newTab" + route.replace('/', '') + "_" + configID, null, false);
    };
    OrderComponent.prototype.showNotes = function (order) {
        this.notesOrder = order;
        this.notesModal.show();
    };
    OrderComponent.prototype.editOrderClicked = function (order) {
        this.selectedOrder = order;
        this.orderEditModal.show();
        //this.orderEditModal.onHidden.subscribe(() => this.selectedOrder = null)
    };
    OrderComponent.prototype.editModelClicked = function (order) {
        if (this.appState.CurrentUser.IsAdmin && order.Dealer) {
            this.appState.setImpersonation(order.Dealer.PricingLevel, order.DealerID, order.Dealer.Name);
        }
        var discount = order.OrderDiscounts.find(function (orderDiscount) { return !!orderDiscount.DiscountTypeID; });
        this.appState.selectedProgram = null;
        if (discount) {
            this.appState.selectedProgram = {
                DiscountTypeID: discount.DiscountTypeID,
                Amount: discount.DiscountAmount,
                DiscountKey: '',
                DiscountTypeName: discount.DiscountTypeName,
                PriceLevel: order.Dealer.PricingLevel
            };
        }
        this.appState.editOrder = order;
        this.router.navigate(['/config/', order.ConfigurationID]);
    };
    OrderComponent.prototype.setSorting = function (field, direction) {
        this.orderField = field;
        this.orderDirection = direction;
    };
    OrderComponent.prototype.configurationLock = function (orderId, lockState) {
        var _this = this;
        this.orderService
            .lockOrder(orderId, lockState)
            .first()
            .subscribe(function () { return _this.toastr.success("Order '" + orderId + "' has been " + (lockState ? 'locked' : 'unlocked') + "."); }, function (msg) { return _this.toastr.error("An error occured while updating lock for order '" + orderId + "'. Message: " + msg); });
    };
    return OrderComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('orderEditModal'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _a || Object)
], OrderComponent.prototype, "orderEditModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('notesModal'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _b || Object)
], OrderComponent.prototype, "notesModal", void 0);
OrderComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/order/orders.component.html"),
        styles: [__webpack_require__("../../../../../src/app/order/orders.component.css")],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__services_order_service__["a" /* OrderService */],
            __WEBPACK_IMPORTED_MODULE_4__discount__["DiscountService"],
            {
                provide: __WEBPACK_IMPORTED_MODULE_2__shared__["h" /* PagingService */],
                useFactory: __WEBPACK_IMPORTED_MODULE_9__order_paging_factory__["a" /* orderPagingServiceFactory */],
                deps: [__WEBPACK_IMPORTED_MODULE_3__services_order_service__["a" /* OrderService */]]
            }
        ]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__application_setting__["ApplicationSettingService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__configuration__["ConfigurationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__configuration__["ConfigurationService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["f" /* DiagnosticService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__services_order_service__["a" /* OrderService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_order_service__["a" /* OrderService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["a" /* ApplicationState */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_2__shared__["h" /* PagingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared__["h" /* PagingService */]) === "function" && _k || Object])
], OrderComponent);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
//# sourceMappingURL=orders.component.js.map

/***/ }),

/***/ "../../../../../src/app/order/schedule-spray-dates/schedule-spray-dates.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-flowscheduler [scrollCallback]=\"scrollCallback\">\n    <ng-template let-order itemTemplate=\"unscheduled\">\n        <div class=\"ui-g-12 ui-md-3\">\n            {{ order.ID }}: {{ order.ModelName }}\n        </div>\n    </ng-template>\n    <ng-template let-order itemTemplate=\"month\">\n        <div class=\"ui-g-12 ui-md-3\">\n            {{ order.ID }}: {{ order.ModelName }}\n        </div>\n    </ng-template>\n    <ng-template let-order itemTemplate=\"week\">\n        <div class=\"ui-g-12 ui-md-3\">\n            {{ order.ID }}: {{ order.ModelName }}\n        </div>\n    </ng-template>\n</ng-flowscheduler>"

/***/ }),

/***/ "../../../../../src/app/order/schedule-spray-dates/schedule-spray-dates.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export scheduleServiceFactory */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleSprayDatesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ng_flowscheduler_services_scheduled_service__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/services/scheduled.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__ = __webpack_require__("../../../../../src/app/ng-flowscheduler/schedule-type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__index__ = __webpack_require__("../../../../../src/app/order/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__order_paging_factory__ = __webpack_require__("../../../../../src/app/order/order-paging-factory.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









function scheduleServiceFactory(orderService, pagingService) {
    return new __WEBPACK_IMPORTED_MODULE_1__ng_flowscheduler_services_scheduled_service__["a" /* ScheduledService */](pagingService.items$, function (y, m) { return orderService.getScheduledOrders(y, m); }, function (y, w) { return orderService.getScheduledOrdersByWeek(y, w); }, "SprayDate", "SprayDateScheduleType");
}
var ScheduleSprayDatesComponent = (function () {
    function ScheduleSprayDatesComponent(pagingService, scheduler, appSettings, configService, orderService, toastr) {
        var _this = this;
        this.pagingService = pagingService;
        this.scheduler = scheduler;
        this.appSettings = appSettings;
        this.configService = configService;
        this.orderService = orderService;
        this.toastr = toastr;
        this.imageLookup = {};
        this.hasNext = false;
        this.imgLookupSub = this
            .scheduler
            .items$
            .subscribe(function (orders) {
            _this.imageLookup =
                orders.reduce(function (prev, curr) {
                    prev[curr.ConfigurationID] = _this.getConfigurationImage$(curr.ConfigurationID);
                    return prev;
                }, {});
        });
        this.selectSub = this
            .scheduler
            .itemSelected$
            .subscribe(function (i) { return console.log('thing', i); });
        this.scheduleSub = this
            .scheduler
            .itemScheduled$
            .do(function (_a) {
            var o = _a[0], d = _a[1];
            return o.SprayDate = d;
        })
            .do(function (_a) {
            var o = _a[0], d = _a[1];
            return o.SprayDateScheduleType = __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__["a" /* Scheduled */].Scheduled;
        })
            .switchMap(function (_a) {
            var o = _a[0], d = _a[1];
            return _this.orderService.scheduleOrder(o, 'SprayDate', d, __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__["a" /* Scheduled */].Scheduled);
        })
            .subscribe(function (_) { return _this.toastr.success('Successfully scheduled order.'); }, function (_) { return _this.toastr.error('Error while scheduling order.'); });
        this.softScheduleSub = this
            .scheduler
            .itemScheduledMonth$
            .do(function (_a) {
            var o = _a[0], d = _a[1];
            return o.SprayDate = d;
        })
            .do(function (_a) {
            var o = _a[0], d = _a[1];
            return o.SprayDateScheduleType = __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__["a" /* Scheduled */].SoftMonthYear;
        })
            .switchMap(function (_a) {
            var o = _a[0], d = _a[1];
            return _this.orderService.scheduleOrder(o, 'SprayDate', d, __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__["a" /* Scheduled */].SoftMonthYear);
        })
            .subscribe(function (_) { return _this.toastr.success('Successfully scheduled order.'); }, function (_) { return _this.toastr.error('Error while scheduling order.'); });
        this.unscheduleSub = this
            .scheduler
            .itemUnscheduled$
            .do(function (o) { return o.SprayDate = null; })
            .do(function (o) { return o.SprayDateScheduleType = __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__["a" /* Scheduled */].Unscheduled; })
            .switchMap(function (o) { return _this.orderService.scheduleOrder(o, 'SprayDate', null, __WEBPACK_IMPORTED_MODULE_2__ng_flowscheduler_schedule_type__["a" /* Scheduled */].Unscheduled); })
            .subscribe(function (_) { return _this.toastr.success('Successfully unscheduled order.'); }, function (_) { return _this.toastr.error('Error while unscheduling order.'); });
        this.hasNextSub = this
            .pagingService
            .hasNext$
            .subscribe(function (next) { return _this.hasNext = next; });
    }
    ScheduleSprayDatesComponent.prototype.getConfigurationImage$ = function (configurationID) {
        var _this = this;
        return this
            .appSettings
            .applicationSetting$
            .filter(function (setting) { return !!setting; })
            .map(function (setting) { return setting['StoragePublicBaseUrl']; })
            .switchMap(function (baseUrl) { return _this
            .configService
            .getConfigurationImage(configurationID, 'Exterior', 'sm')
            .map(function (imgUrl) { return imgUrl || 'no-image.png'; })
            .map(function (imgUrl) { return "" + baseUrl + imgUrl; }); });
    };
    ScheduleSprayDatesComponent.prototype.scrollCallback = function () {
        this.pagingService.getNext();
    };
    ScheduleSprayDatesComponent.prototype.ngOnDestroy = function () {
        this.selectSub.unsubscribe();
        this.imgLookupSub.unsubscribe();
        this.scheduleSub.unsubscribe();
        this.softScheduleSub.unsubscribe();
        this.unscheduleSub.unsubscribe();
    };
    return ScheduleSprayDatesComponent;
}());
ScheduleSprayDatesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/order/schedule-spray-dates/schedule-spray-dates.component.html"),
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__index__["OrderService"],
            {
                provide: __WEBPACK_IMPORTED_MODULE_7__shared__["h" /* PagingService */],
                useFactory: __WEBPACK_IMPORTED_MODULE_8__order_paging_factory__["b" /* orderUnscheduledPagingServiceFactory */],
                deps: [__WEBPACK_IMPORTED_MODULE_3__index__["OrderService"]]
            }, {
                provide: __WEBPACK_IMPORTED_MODULE_1__ng_flowscheduler_services_scheduled_service__["a" /* ScheduledService */],
                useFactory: scheduleServiceFactory,
                deps: [__WEBPACK_IMPORTED_MODULE_3__index__["OrderService"], __WEBPACK_IMPORTED_MODULE_7__shared__["h" /* PagingService */]]
            }
        ]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_7__shared__["h" /* PagingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__shared__["h" /* PagingService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__ng_flowscheduler_services_scheduled_service__["a" /* ScheduledService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ng_flowscheduler_services_scheduled_service__["a" /* ScheduledService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__application_setting__["ApplicationSettingService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__configuration__["ConfigurationService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__configuration__["ConfigurationService"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__index__["OrderService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__index__["OrderService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__["ToastsManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__["ToastsManager"]) === "function" && _f || Object])
], ScheduleSprayDatesComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=schedule-spray-dates.component.js.map

/***/ }),

/***/ "../../../../../src/app/order/services/ipolicy-result.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=ipolicy-result.js.map

/***/ }),

/***/ "../../../../../src/app/order/services/order.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrderService = (function (_super) {
    __extends(OrderService, _super);
    function OrderService(diag, http, auth, appState) {
        var _this = _super.call(this, http, diag, '/', 'api') || this;
        _this.http = http;
        _this.auth = auth;
        _this.appState = appState;
        _this.getNotes = function (orderID) {
            return _this.httpGet("/" + orderID + "/notes", function (res) { return res.json(); });
        };
        _this.addNote = function (orderID, note, internal) {
            if (internal === void 0) { internal = false; }
            return _this.httpPost("/" + orderID + "/notes", { note: note, internal: internal }, function (res) { return ({ success: true }); });
        };
        return _this;
    }
    OrderService.prototype.getOrders = function (page, orderBy, ascending, spraySchedule) {
        if (page === void 0) { page = 1; }
        if (orderBy === void 0) { orderBy = 'ID'; }
        if (ascending === void 0) { ascending = false; }
        if (spraySchedule === void 0) { spraySchedule = null; }
        return this.httpGet("orders?page=" + page + "&orderBy=" + orderBy + "&ascending=" + ascending + "&spraySchedule=" + spraySchedule, function (res) { return res.json() || []; });
    };
    OrderService.prototype.getScheduledOrders = function (year, month, day) {
        if (day === void 0) { day = undefined; }
        return this.httpGet("orders/schedule/" + year + "/" + month + "/" + (day || ''), function (res) { return res.json(); });
    };
    OrderService.prototype.getScheduledOrdersByWeek = function (year, week, scheduleType) {
        if (scheduleType === void 0) { scheduleType = undefined; }
        return this.httpGet("orders/schedule/week/" + year + "/" + week + ((scheduleType) ? "?scheduleType=" + scheduleType : ''), function (res) { return res.json(); });
    };
    OrderService.prototype.getOrderPages = function () {
        return this.httpGet('orders/pages', function (res) { return res.json(); });
    };
    OrderService.prototype.addOrder = function (configurationID, discount) {
        var order = this.createEmptyOder();
        order.ConfigurationID = configurationID;
        order.DealerID = this.appState.CurrentUser.DealerID;
        if (discount) {
            order.OrderDiscounts.push({
                ID: 0,
                Description: discount.DiscountTypeName,
                OrderID: 0,
                DiscountAmount: discount.Amount,
                DiscountTypeID: discount.DiscountTypeID,
                DiscountTypeName: discount.DiscountTypeName
            });
        }
        return this.httpPost('/orders/', order, function (res) { return res.json(); });
    };
    OrderService.prototype.updateOrder = function (order) {
        return this.httpPut('/orders/', order, function (res) { return res.json(); });
    };
    OrderService.prototype.getDealerOrder = function (orderID, dealerID) {
        return this.httpGet("/" + orderID + "/dealerID/" + dealerID, function (res) { return res.json(); });
    };
    OrderService.prototype.getOrderStatuses = function () {
        return this.httpGet('/orderstatuses/', function (res) { return res.json(); });
    };
    OrderService.prototype.getPreOrder = function (configuration, programName, dealerID) {
        return this.httpPost("/orders/getPreOrder?programName=" + programName + "&dealerID=" + dealerID, configuration, function (res) { return res.json() || null; });
    };
    OrderService.prototype.recalculate = function (order) {
        return this.httpPost('orders/recalculate', order, function (res) { return res.json(); });
    };
    OrderService.prototype.scheduleOrder = function (order, field, date, type) {
        return this.httpPost("/schedule/" + order.ID, { Field: field, ScheduleDate: date, ScheduleType: type }, function (res) { });
    };
    OrderService.prototype.lockOrder = function (orderID, lockState) {
        return this.httpPut("/lock/" + orderID + "?lockState=" + lockState, {}, function (res) { return res; });
    };
    OrderService.prototype.createEmptyOder = function () {
        return {
            ID: 0,
            DealerID: 0,
            Dealer: null,
            OrderStatusID: 0,
            ModelName: '',
            DealerPO: '',
            HullID: '',
            OrderDate: null,
            EngineID: '',
            TransmissionID: '',
            ConfigurationID: 0,
            TrailerID: '',
            FinancedBy: '',
            Freight: 0,
            Trailer: 0,
            OptionsTotal: 0,
            DealerBoatPrice: 0,
            Surcharge: 0,
            SubTotal: 0,
            Total: 0,
            CreatedBy: '',
            CreatedDate: null,
            ModifiedBy: '',
            ModifiedDate: null,
            WinterRebate: null,
            OrderSurcharges: [],
            OrderDiscounts: [],
            DiscountTotal: 0
        };
    };
    return OrderService;
}(__WEBPACK_IMPORTED_MODULE_3__shared__["b" /* BaseProxy */]));
OrderService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _d || Object])
], OrderService);

var _a, _b, _c, _d;
//# sourceMappingURL=order.service.js.map

/***/ }),

/***/ "../../../../../src/app/order/services/policy-client.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolicyClientService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_services_base_proxy_service__ = __webpack_require__("../../../../../src/app/_shared/services/base-proxy.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PolicyClientService = (function (_super) {
    __extends(PolicyClientService, _super);
    function PolicyClientService(http, diag, auth) {
        var _this = _super.call(this, http, diag, '/', 'http://localhost:44337/api/policy') || this;
        _this.createOrder = function (rootSpecificationID) {
            return _this.httpGet("/order/create/" + rootSpecificationID, function (res) { return res.json(); });
        };
        _this.dealer = function () {
            return _this.httpGet("/dealer", function (res) { return res.json(); });
        };
        return _this;
    }
    return PolicyClientService;
}(__WEBPACK_IMPORTED_MODULE_3__shared_services_base_proxy_service__["a" /* BaseProxy */]));
PolicyClientService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_diagnostic_service__["a" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_services_diagnostic_service__["a" /* DiagnosticService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _c || Object])
], PolicyClientService);

var _a, _b, _c;
//# sourceMappingURL=policy-client.service.js.map

/***/ }),

/***/ "../../../../../src/app/order/services/policy-status.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolicyStatus; });
var PolicyStatus;
(function (PolicyStatus) {
    PolicyStatus[PolicyStatus["None"] = 0] = "None";
    PolicyStatus[PolicyStatus["Failure"] = 1] = "Failure";
    PolicyStatus[PolicyStatus["Success"] = 2] = "Success";
})(PolicyStatus || (PolicyStatus = {}));
//# sourceMappingURL=policy-status.js.map

/***/ }),

/***/ "../../../../../src/app/policy/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__policy_summary_policy_summary_component__ = __webpack_require__("../../../../../src/app/policy/policy-summary/policy-summary.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__policy_summary_policy_summary_component__["a"]; });

//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/policy/policy-summary/policy-summary.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"(policyResult?.Status===2) else failure\">\n    <p class=\"text-center\">\n        {{ successMessage }}\n    </p>\n    <p class=\"text-center\">\n        <a class=\"btn btn-primary\" [routerLink]=\"[ successRoute ]\" >{{ successRouteName }}</a>\n    </p>\n</div>\n<ng-template #failure>\n    <p class=\"text-center\">\n        {{ policyResult?.FailureMessage }}\n    </p>\n    <p class=\"text-center\" *ngIf=\"policyResult?.Correctable\">\n        <button [routerLink]=\"[ policyResult?.CorrectableAction ]\">Go To</button>\n    </p>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/policy/policy-summary/policy-summary.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PolicySummaryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_services_ipolicy_result__ = __webpack_require__("../../../../../src/app/order/services/ipolicy-result.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__order_services_ipolicy_result___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__order_services_ipolicy_result__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PolicySummaryComponent = (function () {
    function PolicySummaryComponent() {
        this.successRouteName = 'Go';
    }
    return PolicySummaryComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__order_services_ipolicy_result__["IPolicyResult"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__order_services_ipolicy_result__["IPolicyResult"]) === "function" && _a || Object)
], PolicySummaryComponent.prototype, "policyResult", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PolicySummaryComponent.prototype, "successMessage", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], PolicySummaryComponent.prototype, "successRoute", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PolicySummaryComponent.prototype, "successRouteName", void 0);
PolicySummaryComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'policy-summary',
        template: __webpack_require__("../../../../../src/app/policy/policy-summary/policy-summary.component.html")
    })
], PolicySummaryComponent);

var _a;
//# sourceMappingURL=policy-summary.component.js.map

/***/ }),

/***/ "../../../../../src/app/pricing/dealer-pricing-level.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=dealer-pricing-level.js.map

/***/ }),

/***/ "../../../../../src/app/pricing/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_pricing_service__ = __webpack_require__("../../../../../src/app/pricing/services/pricing.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "PricingService", function() { return __WEBPACK_IMPORTED_MODULE_0__services_pricing_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification_pricing__ = __webpack_require__("../../../../../src/app/pricing/specification-pricing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification_pricing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification_pricing__);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dealer_pricing_level__ = __webpack_require__("../../../../../src/app/pricing/dealer-pricing-level.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dealer_pricing_level___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dealer_pricing_level__);
/* unused harmony namespace reexport */



//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/pricing/services/pricing.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth__ = __webpack_require__("../../../../../src/app/auth/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PricingService = (function (_super) {
    __extends(PricingService, _super);
    function PricingService(auth, http, diag) {
        var _this = _super.call(this, http, diag, '/', '/api') || this;
        _this.auth = auth;
        _this.http = http;
        _this.diag = diag;
        return _this;
    }
    PricingService.prototype.getDealerPricingLevels = function () {
        return this
            .httpGet('/admin/dealerpricelevels', function (res) { return res.json() || []; });
    };
    PricingService.prototype.getDealerPricing = function (dealerID) {
        return this
            .httpGet('/specificationpricing', function (res) { return res.json() || []; });
    };
    PricingService.prototype.getBasePrice = function (orderID) {
        return this
            .httpGet("/admin/baseprice/" + orderID, function (res) { return res.json() || []; });
    };
    return PricingService;
}(__WEBPACK_IMPORTED_MODULE_3__shared__["b" /* BaseProxy */]));
PricingService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth__["AuthService"]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], PricingService);

var _a, _b, _c;
//# sourceMappingURL=pricing.service.js.map

/***/ }),

/***/ "../../../../../src/app/pricing/specification-pricing.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=specification-pricing.js.map

/***/ }),

/***/ "../../../../../src/app/specification/event-args.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChoiceArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return MultiSelectArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SelectionArgs; });
var ChoiceArgs = (function () {
    function ChoiceArgs(choice, selection) {
        this.kind = 'ChoiceArgs';
        this.choiceSpecification = choice;
        this.selectionSpecification = selection;
    }
    return ChoiceArgs;
}());

var MultiSelectArgs = (function () {
    function MultiSelectArgs(choice, selections, systemTypeName, attrData) {
        if (systemTypeName === void 0) { systemTypeName = ""; }
        if (attrData === void 0) { attrData = undefined; }
        this.kind = 'MultiSelectArgs';
        this.choiceSpecification = choice;
        this.selectionSpecification = selections;
        this.systemTypeName = systemTypeName;
        this.attributeData = attrData;
    }
    return MultiSelectArgs;
}());

var SelectionArgs = (function () {
    function SelectionArgs(selection, selectionAttributeData) {
        if (selectionAttributeData === void 0) { selectionAttributeData = undefined; }
        this.kind = 'SelectionArgs';
        this.specification = selection;
        this.attributeData = selectionAttributeData;
    }
    return SelectionArgs;
}());

//# sourceMappingURL=event-args.js.map

/***/ }),

/***/ "../../../../../src/app/specification/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__specification_display_specification_display_component__ = __webpack_require__("../../../../../src/app/specification/specification-display/specification-display.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationDisplayComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__specification_display_specification_display_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification_group_specification_group_component__ = __webpack_require__("../../../../../src/app/specification/specification-group/specification-group.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationGroupComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__specification_group_specification_group_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification_item_specification_item_choice_component__ = __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-choice.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationItemChoiceComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__specification_item_specification_item_choice_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__specification_item_specification_item_component__ = __webpack_require__("../../../../../src/app/specification/specification-item/specification-item.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationItemComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__specification_item_specification_item_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__specification_item_specification_item_navigation_component__ = __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-navigation.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationItemNavigationComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__specification_item_specification_item_navigation_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__specification_item_specification_item_multi_choice_component__ = __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-multi-choice.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationItemMultiChoiceComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__specification_item_specification_item_multi_choice_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__specification_item_specification_item_attribute_feature_component__ = __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-attribute-feature.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationItemAttributeFeatureComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__specification_item_specification_item_attribute_feature_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__specification_choice_group_specification_choice_group_component__ = __webpack_require__("../../../../../src/app/specification/specification-choice-group/specification-choice-group.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationChoiceGroupComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__specification_choice_group_specification_choice_group_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__specification_stack_panel_specification_stack_panel_component__ = __webpack_require__("../../../../../src/app/specification/specification-stack-panel/specification-stack-panel.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationStackPanelComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__specification_stack_panel_specification_stack_panel_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__specification_options_specification_options_component__ = __webpack_require__("../../../../../src/app/specification/specification-options/specification-options.component.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationOptionsComponent", function() { return __WEBPACK_IMPORTED_MODULE_9__specification_options_specification_options_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_specification_service__ = __webpack_require__("../../../../../src/app/specification/services/specification.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationService", function() { return __WEBPACK_IMPORTED_MODULE_10__services_specification_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__specification__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11__specification__, "ChoiceArgs")) __webpack_require__.d(__webpack_exports__, "ChoiceArgs", function() { return __WEBPACK_IMPORTED_MODULE_11__specification__["ChoiceArgs"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11__specification__, "ISpecification")) __webpack_require__.d(__webpack_exports__, "ISpecification", function() { return __WEBPACK_IMPORTED_MODULE_11__specification__["ISpecification"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11__specification__, "MultiSelectArgs")) __webpack_require__.d(__webpack_exports__, "MultiSelectArgs", function() { return __WEBPACK_IMPORTED_MODULE_11__specification__["MultiSelectArgs"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11__specification__, "SelectionArgs")) __webpack_require__.d(__webpack_exports__, "SelectionArgs", function() { return __WEBPACK_IMPORTED_MODULE_11__specification__["SelectionArgs"]; });
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_11__specification__, "SpecificationMetadataFilter")) __webpack_require__.d(__webpack_exports__, "SpecificationMetadataFilter", function() { return __WEBPACK_IMPORTED_MODULE_11__specification__["SpecificationMetadataFilter"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "ChoiceArgs", function() { return __WEBPACK_IMPORTED_MODULE_12__event_args__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "MultiSelectArgs", function() { return __WEBPACK_IMPORTED_MODULE_12__event_args__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SelectionArgs", function() { return __WEBPACK_IMPORTED_MODULE_12__event_args__["c"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pipes_specification_metadata_pipe__ = __webpack_require__("../../../../../src/app/specification/pipes/specification-metadata.pipe.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SpecificationMetadataFilter", function() { return __WEBPACK_IMPORTED_MODULE_13__pipes_specification_metadata_pipe__["a"]; });














//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/specification/pipes/specification-metadata.pipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationMetadataFilter; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SpecificationMetadataFilter = (function () {
    function SpecificationMetadataFilter() {
    }
    SpecificationMetadataFilter.prototype.transform = function (specifications, metaKey, metaVal) {
        if (metaKey && metaVal) {
            return specifications.filter(function (specification) { return specification.Metadata[metaKey] === metaVal; });
        }
        return specifications;
    };
    return SpecificationMetadataFilter;
}());
SpecificationMetadataFilter = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'specificationMetadataFilter' })
], SpecificationMetadataFilter);

//# sourceMappingURL=specification-metadata.pipe.js.map

/***/ }),

/***/ "../../../../../src/app/specification/services/specification.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { DiagnosticService } from '../../_shared';


var SpecificationService = (function () {
    function SpecificationService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:44337/api/customwise/specification';
    }
    SpecificationService.prototype.getBySpecificationTypeNameAndDepth = function (specType, depth) {
        if (depth === void 0) { depth = 0; }
        var url = this.baseUrl + "/" + specType + "/" + depth;
        //this.diag.logVerbose(`Getting data from: '${url}'.`, SpecificationService.name + ".getSpecificationsBySpecificationType()")
        return this.http
            .get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Specifications.`, SpecificationService.name + ".getSpecificationsBySpecificationType()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Specifications.");
            }
            var body = res.json();
            return body || [];
        })
            .catch(this.handleError);
    };
    SpecificationService.prototype.getBySpecificationTypeFromBranch = function (specificationID, specType) {
        var url = this.baseUrl + "/specification/" + specificationID + "/filter/" + specType;
        //this.diag.logVerbose(`Getting data from: '${url}'.`, SpecificationService.name + ".getSpecificationsBySpecificationTypeFromBranch()")
        return this.http
            .get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Specifications.`, SpecificationService.name + ".getSpecificationsBySpecificationTypeFromBranch()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Specifications.");
            }
            var body = res.json();
            return body || [];
        })
            .catch(this.handleError);
    };
    SpecificationService.prototype.getBySpecificationSystemType = function (specSystemType, depth) {
        if (depth === void 0) { depth = 0; }
        var url = this.baseUrl + "/specificationSystemTypeName/" + specSystemType + "/" + depth;
        //this.diag.logVerbose(`Getting data from: '${url}'.`, SpecificationService.name + ".getSpecificationsBySpecificationSystemType()")
        return this.http
            .get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Specifications.`, SpecificationService.name + ".getSpecificationsBySpecificationSystemType()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Specifications.");
            }
            var body = res.json();
            return body || [];
        })
            .catch(this.handleError);
    };
    SpecificationService.prototype.getByID = function (id) {
        var url = this.baseUrl + "/" + id;
        //this.diag.logVerbose(`Getting data from: '${url}'.`, SpecificationService.name + ".getSpecificationByID()")
        return this.http.get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Specification.`, SpecificationService.name + ".getSpecificationByID()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Specification.");
            }
            var body = res.json();
            return body || null;
        })
            .catch(this.handleError);
    };
    SpecificationService.prototype.getByConfigurationID = function (id) {
        var url = this.baseUrl + "/configuration/" + id;
        //this.diag.logVerbose(`Getting data from: '${url}'.`, SpecificationService.name + ".getByConfigurationID()")
        return this.http.get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Specification.`, SpecificationService.name + ".getByConfigurationID()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Specification.");
            }
            var body = res.json();
            return body || null;
        })
            .catch(this.handleError);
    };
    SpecificationService.prototype.getBySystemName = function (systemName) {
        var url = this.baseUrl + "/SystemName/" + systemName;
        //this.diag.logVerbose(`Getting data from: '${url}'.`, SpecificationService.name + ".getSpecificationBySystemName()")
        return this.http.get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                //this.diag.logError(`Error Response Status (${res.status}) while requesting Specification.`, SpecificationService.name + ".getSpecificationBySystemName()")
                throw new Error("Error Response Status (" + res.status + ") while requesting Specification.");
            }
            var body = res.json();
            return body || null;
        })
            .catch(this.handleError);
    };
    SpecificationService.prototype.extractData = function (res) {
        if (res.status < 200 || res.status >= 300) {
            //this.diag.logError(`Error Response Status (${res.status}) while requesting Specification.`, SpecificationService.name + ".extractData()")
            throw new Error("Error Response Status (" + res.status + ") while requesting Specification.");
        }
        var body = res.json();
        return body || {};
    };
    SpecificationService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg = error.message || 'Server error';
        //this.diag.logError(errMsg, SpecificationService.name + ".handleError()")
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return SpecificationService;
}());
SpecificationService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object])
], SpecificationService);

var _a;
//# sourceMappingURL=specification.service.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-choice-group/specification-choice-group.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template *ngIf=\"specification.SpecificationTypeSystemName === 'ColorArea'\">\n    <!--<div class=\"col-xs-3\">\n        <ul class=\"nav nav-tabs tabs-left\">\n            <li><a href=\"#tab_{{specification.ID}}\" data-toggle=\"tab\">{{specification.DisplayName}}</a></li>\n        </ul>\n    </div>\n\n    <div class=\"col-xs-9\">\n        <div class=\"tab-content\">\n            <div class=\"tab-pane\" id=\"tab_{{specification.ID}}\">\n                <div *ngFor=\"let group of specification.Children\">\n                    <button class=\"btn btn-lg col-md-2\" *ngFor=\"let child of group.Children\">{{child.DisplayName}}</button>\n                </div>\n            </div>\n        </div>\n    </div>-->\n\n\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-choice-group/specification-choice-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationChoiceGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SpecificationChoiceGroupComponent = SpecificationChoiceGroupComponent_1 = (function () {
    function SpecificationChoiceGroupComponent(diag) {
        this.diag = diag;
        this.componentName = "" + SpecificationChoiceGroupComponent_1.name;
        this.diag.logVerbose("Instantiating " + this.componentName + " component", this.componentName + ".constructor()");
    }
    return SpecificationChoiceGroupComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__configuration__["IConfiguration"]) === "function" && _a || Object)
], SpecificationChoiceGroupComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _b || Object)
], SpecificationChoiceGroupComponent.prototype, "specification", void 0);
SpecificationChoiceGroupComponent = SpecificationChoiceGroupComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-choice-group',
        template: __webpack_require__("../../../../../src/app/specification/specification-choice-group/specification-choice-group.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], SpecificationChoiceGroupComponent);

var SpecificationChoiceGroupComponent_1, _a, _b, _c;
//# sourceMappingURL=specification-choice-group.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-display/specification-display.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"specification\">\n    <!-- Root, Item, Reference Item -->\n    <div *ngIf=\"specification.SpecificationSystemTypeSystemName === 'Root' || specification.SpecificationSystemTypeSystemName === 'Item' || specification.SpecificationSystemTypeSystemName === 'ReferenceItem'\">\n        <cwd-specification-item [specification]=\"specification\" [configuration]=\"configuration\" (specificationSelectedEvent)=\"specificationSelectedEventHandler($event)\"></cwd-specification-item>\n    </div>\n    <!-- Group, Reference Group -->\n    <div *ngIf=\"specification.SpecificationSystemTypeSystemName === 'Group' || specification.SpecificationSystemTypeSystemName === 'ReferenceGroup'\">\n        <cwd-specification-group [specification]=\"specification\" [siblingCount]=\"siblingCount\" [configuration]=\"configuration\" (specificationSelectedEvent)=\"specificationSelectedEventHandler($event)\" (subSpecificationSelected)=\"groupSelectedEventHandler($event)\"></cwd-specification-group>\n    </div>\n    <!-- Choice Group, Reference Choice Group -->\n    <div *ngIf=\"specification.SpecificationSystemTypeSystemName === 'ChoiceGroup' || specification.SpecificationSystemTypeSystemName === 'ReferenceChoiceGroup'\">\n        <cwd-specification-item-choice [specification]=\"specification\" [configuration]=\"configuration\" (choiceSpecificationSelected)=\"specificationSelectedEventHandler($event)\"></cwd-specification-item-choice>\n    </div>\n    <!-- Multiple Choice Group, Reference Multiple Choice Group  -->\n    <div *ngIf=\"specification.SpecificationSystemTypeSystemName === 'MultipleChoiceGroup' || specification.SpecificationSystemTypeSystemName === 'ReferenceMultipleChoiceGroup'\">\n        <cwd-specification-item-multi-choice [specification]=\"specification\" [configuration]=\"configuration\" (subSpecificationSelected)=\"multiSelectedEventHandler($event)\"></cwd-specification-item-multi-choice>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-display/specification-display.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationDisplayComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SpecificationDisplayComponent = (function () {
    function SpecificationDisplayComponent(diag) {
        this.diag = diag;
        this.specificationSelectedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SpecificationDisplayComponent.prototype.specificationSelectedEventHandler = function (arg) {
        this.specificationSelectedEvent.emit(arg);
    };
    SpecificationDisplayComponent.prototype.groupSelectedEventHandler = function (arg) {
        this.specificationSelectedEvent.emit(arg);
    };
    SpecificationDisplayComponent.prototype.multiSelectedEventHandler = function (arg) {
        this.specificationSelectedEvent.emit(arg);
    };
    return SpecificationDisplayComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _a || Object)
], SpecificationDisplayComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__configuration__["IConfiguration"]) === "function" && _b || Object)
], SpecificationDisplayComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SpecificationDisplayComponent.prototype, "siblingCount", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationDisplayComponent.prototype, "specificationSelectedEvent", void 0);
SpecificationDisplayComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-display',
        template: __webpack_require__("../../../../../src/app/specification/specification-display/specification-display.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], SpecificationDisplayComponent);

var _a, _b, _c;
//# sourceMappingURL=specification-display.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-group/specification-group.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".container-border {\n\tborder: solid 1px #ccc;\n\toverflow: hidden;\n\tborder-radius: 4px;\n\tpadding: 10px 0;\n}\n\n.btn-no-border {\n\tpadding: 0;\n\tmargin: 0;\n\tborder: 0;\n}\n\n.large {\n\twidth: 175px; height: 175px;\n\tposition: absolute;\n\tborder-radius: 100%;\n\t\n\t/*Multiple box shadows to achieve the glass effect*/\n\tbox-shadow: 0 0 0 7px rgba(255, 255, 255, 0.85), \n\t0 0 7px 7px rgba(0, 0, 0, 0.25), \n\tinset 0 0 40px 2px rgba(0, 0, 0, 0.25);\n\t\n\t/*Lets load up the large image first*/\n\tbackground: url('http://thecodeplayer.com/uploads/media/iphone.jpg') no-repeat;\n\t\n\t/*hide the glass by default*/\n\tdisplay: none;\n}\n\n/*To solve overlap bug at the edges during magnification*/\n.small { display: block; }\n\n.color-pallet-outer {\n\tpadding-right: 10px;\n\tposition: relative;\n}\n\n@media (min-width: 768px) {\n\t.vertical-label {\n\t\tposition: absolute;\n\t\ttransform: rotate(-90deg);\n\t\ttop: 92px;\n\t\tleft: -90px;\n\t\twidth: 200px;\n\t\ttext-align: right;\n\t}\n\n\t.color-pallet-inner {\n\t\tpadding-left: 30px;\n\t\tmargin-left: 10px;\n\t}\n}\n\n@media (max-width: 768px) {\n\t.vertical-label {\n\t\tposition: absolute;\n\t\ttransform: rotate(-90deg);\n\t\ttop: 90px;\n\t\tleft: -90px;\n\t\twidth: 200px;\n\t\ttext-align: right;\n\t}\n\n\t.color-pallet-inner {\n\t\tpadding-left: 15px;\n\t\tmargin: 0;\n\t\tpadding-right:0;\n\t}\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-group/specification-group.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"specification\">\n    <!-- Models -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'Model'\">\n        <div class=\"col-xs-12 col-sm-4 col-md-3\">\n            <a class=\"thumbnail model\" [ngClass]=\"{'selected':isSelected$ | async}\" (click)=\"specificationItemClickedHandler(specification)\">\n                <div class=\"img model-img\" [ngStyle]=\"{'background-image': 'url(' + specification.Metadata['ui.designer.image.source']  + ')'}\"></div>\n                <div class=\"caption\">\n                    <p>{{specification.DisplayName}}</p>\n                </div>\n            </a>\n        </div>\n    </div>\n    <!-- Sections -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'Gelcoat' || specification.SpecificationTypeSystemName === 'Upholstery'\">\n        <cwd-specification-item-choice [specification]=\"specification\" [configuration]=\"configuration\" (choiceSpecificationSelected)=\"on_specificationSelected($event)\"></cwd-specification-item-choice>\n    </div>\n    <!-- Color Pallet -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'ColorPallet'\" class=\"color-pallet-outer\">\n        <div *ngIf=\"groups.length > 0\">\n            <div class=\"col-md-12\">\n                <label>Texture Patterns {{metaKey}}</label>\n                <div class=\"color-swatch-container\">\n                    <button *ngFor=\"let group of groups\"\n                            placement=\"top\" [tooltip]=\"group.Name\"\n                            [ngClass]=\"{selected: (group.Name === metaKey)}\"\n                            class=\"small color-swatch thumbnail pull-left {{group.CssClass}}\"\n                            (click)=\"groupClickHandler(group)\"></button>\n                </div>\n            </div>\n            <div class=\"col-md-12 color-pallet-inner\">\n                <label>{{specification.DisplayName}}</label>\n                <div class=\"color-swatch-container\">\n                    <cwd-specification-display *ngFor=\"let childSpecification of (specification.Children | specificationMetadataFilter: 'ui.designer.color.group.name':metaKey)\" [specification]=\"childSpecification\" [configuration]=\"configuration\" (specificationSelectedEvent)=\"on_specificationSelected($event)\"></cwd-specification-display>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"groups.length <= 0\" class=\"col-md-12 color-pallet-inner\">\n            <div *ngIf=\"groups.length <= 0\" class=\"hidden-lg hidden-md hidden-sm\">{{specification.DisplayName}}</div>\n            <div class=\"color-swatch-container\">\n                <cwd-specification-display *ngFor=\"let childSpecification of (specification.Children | specificationMetadataFilter: 'ui.designer.color.group.name':metaKey)\" [specification]=\"childSpecification\" [configuration]=\"configuration\" (specificationSelectedEvent)=\"on_specificationSelected($event)\"></cwd-specification-display>\n            </div>\n        </div>\n        <div *ngIf=\"groups.length <= 0\" class=\"hidden-xs vertical-label\">{{specification.DisplayName}}</div>\n    </div>\n    <!-- Color Area -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'ColorArea'\">\n        <h4>{{specification.DisplayName}}</h4>\n        <cwd-specification-display *ngFor=\"let childSpecification of specification.Children\"\n                                   [specification]=\"childSpecification\"\n                                   [configuration]=\"configuration\"\n                                   (specificationSelectedEvent)=\"on_specificationSelected($event)\">\n        </cwd-specification-display>\n    </div>\n    <!-- Options -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'Options' || specification.SpecificationTypeSystemName === 'UIPanel'\">\n        <h4 class=\"text-center hidden-lg hidden-md\">{{specification.DisplayName}}</h4>\n        <!-- need to wire up multi and choice events -->\n        <cwd-specification-options [specification]=\"specification\"\n                                   [configuration]=\"configuration\"\n                                   (childSpecificationSelectedEvent)=\"on_specificationSelected($event)\">\n        </cwd-specification-options>\n    </div>\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'UINavItem'\">\n        <cwd-specification-item-navigation [specification]=\"specification\"></cwd-specification-item-navigation>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-group/specification-group.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationGroupComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var SpecificationGroupComponent = (function () {
    function SpecificationGroupComponent(appState) {
        this.appState = appState;
        this.subSpecificationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.specificationSelectedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.groups = [];
    }
    SpecificationGroupComponent.prototype.ngOnInit = function () {
        //if (this.specification.SpecificationTypeSystemName === 'ColorPallet' && this.specification.Children) {
        //    if (this.configuration) {
        //        let tempConfig = this.configuration.Items.find(c => c.KeySpecificationID === this.specification.ParentID)
        //        this.metaKey = (!tempConfig || !tempConfig.KeySpecification) ? null : tempConfig.KeySpecification.Metadata['ui.designer.color.group.name']
        //    }
        //    this.specification.Children
        //        .forEach(spec => {
        //            let groupName = spec.Metadata['ui.designer.color.group.name']
        //            let groupCssClass = spec.Metadata['ui.designer.color.group.css-class']
        var _this = this;
        //            if (groupName && groupCssClass && !this.groups.some(g => g.Name === groupName)) {
        //                this.groups.push({ Name: groupName, CssClass: groupCssClass })
        //                this.metaKey = this.metaKey || groupName
        //            }
        //        })
        //}
        if (this.specification.SpecificationTypeSystemName === 'ColorPallet' && this.specification.Children) {
            this.specification
                .Children
                .forEach(function (spec) {
                var groupName = spec.Metadata['ui.designer.color.group.name'];
                var groupCssClass = spec.Metadata['ui.designer.color.group.css-class'];
                if (groupName && groupCssClass && !_this.groups.some(function (g) { return g.Name === groupName; })) {
                    _this.groups.push({ Name: groupName, CssClass: groupCssClass });
                }
            });
            this.metaKey = !!this.metaKey ? this.metaKey
                : !!this.groups && this.groups.length > 0 ? this.groups[0].Name
                    : null;
            this._configurationSub = this
                .appState
                .configuration$
                .filter(function (c) { return !!c; })
                .flatMap(function (c) { return c.Items; })
                .map(function (item) { return _this.specification.Children.find(function (spec) { return spec.ID === item.ValueSpecificationID; }); })
                .filter(function (item) { return !!item; })
                .map(function (item) { return item.Metadata['ui.designer.color.group.name']; })
                .filter(function (metaValue) { return !!metaValue; })
                .subscribe(function (metaValue) { return _this.metaKey = metaValue; });
        }
    };
    SpecificationGroupComponent.prototype.ngOnDestroy = function () {
        if (this._configurationSub)
            this._configurationSub.unsubscribe();
    };
    SpecificationGroupComponent.prototype.on_specificationSelected = function (arg) {
        this.subSpecificationSelected.emit(arg);
    };
    SpecificationGroupComponent.prototype.groupClickHandler = function (group) {
        this.metaKey = group.Name;
    };
    SpecificationGroupComponent.prototype.specificationItemClickedHandler = function (specification) {
        this.specificationSelectedEvent.emit(new __WEBPACK_IMPORTED_MODULE_1__event_args__["c" /* SelectionArgs */](specification));
    };
    return SpecificationGroupComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__specification__["ISpecification"]) === "function" && _a || Object)
], SpecificationGroupComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"]) === "function" && _b || Object)
], SpecificationGroupComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SpecificationGroupComponent.prototype, "siblingCount", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationGroupComponent.prototype, "subSpecificationSelected", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationGroupComponent.prototype, "specificationSelectedEvent", void 0);
SpecificationGroupComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-group',
        template: __webpack_require__("../../../../../src/app/specification/specification-group/specification-group.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-group/specification-group.component.css")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]) === "function" && _c || Object])
], SpecificationGroupComponent);

var _a, _b, _c;
//# sourceMappingURL=specification-group.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-attribute-feature.component.html":
/***/ (function(module, exports) {

module.exports = "<a\n    (click)=\"showAttributes(specification)\"\n    [ngClass]=\"{ selected: specification.Selected }\"\n    class=\"info-box feature\"\n    tooltip=\"{{specification.Metadata['ui.designer.tooltip']}}\"\n    tooltipPlacement=\"top\"\n>\n    <span [ngStyle]=\"{'background-image': 'url(' + specification.Metadata['ui.designer.feature.image.source'] + ')'}\" class=\"info-box-img\"></span>\n    <div class=\"info-box-content\">\n        <div class=\"info-box-text\">{{specification.DisplayName}} - {{ attributeSummary() }}</div>\n        <span class=\"info-box-number\">{{(specification.Pricing[appState.CurrentUser.PriceLevel] ? (specification.Pricing[appState.CurrentUser.PriceLevel] | currency:(isoCurrencyCode$ | async):true) : 'STD') }}</span>\n    </div>\n    <div class=\"info-box-footer\">\n        <span *ngIf=\"specification.Selected\" class=\"fa fa-check fa-2x fa-pull-right\"></span>\n    </div>\n</a>\n<div bsModal #attributeFeatureModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"attributeFeatureModal\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" (click)=\"attributeFeatureModal.hide()\" aria-label=\"Close\">\n                    <span aria-hidden=\"true\">&times;</span>\n                </button>\n                <h4 class=\"modal-title\">{{specification.SpecificationTypeSystemName}}</h4>\n            </div>\n            <div class=\"modal-body\">\n                <div *ngFor=\"let attribute of attributes\">\n                    <ul\n                        class=\"list-group\"\n                        *ngIf=\"attribute.artifact$ | async as artifact\"\n                    >\n                        <button\n                            class=\"list-group-item\"\n                            *ngFor=\"let child of artifact.Children\"\n                            [ngClass]=\"{active: attribute.selectedArtifact === child}\"\n                            (click)=\"selectAttribute(attribute, child)\"\n                        >{{ child.DisplayName }}</button>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button class=\"btn btn-primary\" [disabled]=\"!canSubmit()\" (click)=\"selectSpecification(specification)\">Add</button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-attribute-feature.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationItemAttributeFeatureComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__artifact__ = __webpack_require__("../../../../../src/app/artifact/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configuration_iconfiguration__ = __webpack_require__("../../../../../src/app/configuration/iconfiguration.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__configuration_iconfiguration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__configuration_iconfiguration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__application_setting_services_application_setting_service__ = __webpack_require__("../../../../../src/app/application-setting/services/application-setting.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var SpecificationItemAttributeFeatureComponent = (function () {
    function SpecificationItemAttributeFeatureComponent(settingService, artifactService, appState) {
        var _this = this;
        this.settingService = settingService;
        this.artifactService = artifactService;
        this.appState = appState;
        this.specificationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.attributes = [];
        this.attributeSummary = function () { return _this.attributes.filter(function (attr) { return attr.selectedArtifact; }).map(function (attr) { return "(" + attr.selectedArtifact.DisplayName + ")"; }).join(' '); };
        this.canSubmit = function () { return _this.attributes.every(function (attr) { return !!attr.selectedArtifact; }); };
    }
    SpecificationItemAttributeFeatureComponent.prototype.showAttributes = function (specification) {
        var _this = this;
        if (specification.Selected) {
            this.specificationSelected.emit(new __WEBPACK_IMPORTED_MODULE_6__event_args__["c" /* SelectionArgs */](specification));
            return;
        }
        var artifactId1 = +this.specification.Metadata['ui.designer.feature.attribute.1.attribute.id'];
        var artifactId2 = +this.specification.Metadata['ui.designer.feature.attribute.2.attribute.id'];
        var artifactIds = [];
        if (artifactId1) {
            artifactIds.push(artifactId1);
        }
        if (artifactId2) {
            artifactIds.push(artifactId2);
        }
        this.attributes = artifactIds
            .map(function (id) { return ({
            attributeNumber: id,
            artifact$: _this.artifactService.getArtifact(id)
        }); });
        this.attributeFeatureModal.show();
    };
    SpecificationItemAttributeFeatureComponent.prototype.selectAttribute = function (attribute, artifact) {
        attribute.selectedArtifact = artifact;
    };
    SpecificationItemAttributeFeatureComponent.prototype.ngOnInit = function () {
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
    };
    SpecificationItemAttributeFeatureComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['configuration'] && changes['configuration'].currentValue) {
            this.specification.Selected =
                this.configuration.Items.some(function (c) { return c.ValueSpecificationID === _this.specification.ID; });
        }
    };
    SpecificationItemAttributeFeatureComponent.prototype.selectSpecification = function (specification) {
        var data = this
            .attributes
            .map(function (attr) { return ({
            attributeNumber: attr.attributeNumber,
            valueArtifactId: attr.selectedArtifact.ID,
            displayName: attr.selectedArtifact.DisplayName
        }); });
        this.specificationSelected.emit(new __WEBPACK_IMPORTED_MODULE_6__event_args__["c" /* SelectionArgs */](specification, data));
        this.attributeFeatureModal.hide();
    };
    return SpecificationItemAttributeFeatureComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _a || Object)
], SpecificationItemAttributeFeatureComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__configuration_iconfiguration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__configuration_iconfiguration__["IConfiguration"]) === "function" && _b || Object)
], SpecificationItemAttributeFeatureComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationItemAttributeFeatureComponent.prototype, "specificationSelected", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('attributeFeatureModal'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _c || Object)
], SpecificationItemAttributeFeatureComponent.prototype, "attributeFeatureModal", void 0);
SpecificationItemAttributeFeatureComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-item-attribute-feature',
        template: __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-attribute-feature.component.html"),
        providers: [__WEBPACK_IMPORTED_MODULE_3__artifact__["ArtifactClientService"]]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_7__application_setting_services_application_setting_service__["a" /* ApplicationSettingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__application_setting_services_application_setting_service__["a" /* ApplicationSettingService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__artifact__["ArtifactClientService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__artifact__["ArtifactClientService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared__["a" /* ApplicationState */]) === "function" && _f || Object])
], SpecificationItemAttributeFeatureComponent);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=specification-item-attribute-feature.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-choice.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".selected-color-indicator {\n    border-radius: 0;\n    border-left: 1px solid rgba(0, 0, 0, 0.2);\n    display: block;\n    float: right;\n    height: 35px;\n    width: 15px;\n    text-align: center;\n    font-size: 45px;\n    line-height: 90px;\n}\n\ndiv.list-group {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n}\n\n.panel-group .panel + .panel {\n    margin-top: 0;\n}\n\n.panel, .panel-group .panel {\n    border-radius: 0;\n}\n\n.btn-flat {\n    border-radius: 2px;\n}\n\n.color-area {\n    display: block;\n    min-height: 25px;\n    background: #fff;\n    /*-moz-box-shadow: 3px 3px 15px rgba(0,0,0,0.1);\n    -webkit-box-shadow: 3px 3px 15px rgba(0,0,0,0.1);\n    box-shadow: 3px 3px 15px rgba(0,0,0,0.1);*/\n    border: 1px solid rgba(0,0,0,0.1);\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n    padding:0;\n}\n\n.btn-reset {\n    display: block;\n    min-height: 25px;\n    box-shadow: 3px 3px 15px rgba(0,0,0,0.3);\n    padding: 5px 10px;\n}\n\n.btn-flat.color-area:hover, .btn-flat.color-area.active {\n    box-shadow: 3px 3px 15px rgba(0,0,0,0.3);\n    color: #898989;\n    border: 1px solid rgba(0,0,0,0.1);\n}\n\n.btn-flat.color-area.active {\n    background-color: rgba(0,0,0,0.5);\n    color: #FFF;\n    border: 1px solid rgba(255,0,0,0.9);\n}\n\n.btn-flat-content {\n    padding: 5px 10px;\n    margin-left: 10px;\n    text-align: left;\n}\n\n.color-pallet {\n    -ms-flex:1;\n        flex:1;\n    margin-left: 10px;\n}\n\n.color-area-stage {\n    display:-ms-flexbox;\n    display:flex;\n}\n\n@media (max-width: 768px) {\n    .color-pallet {\n        -ms-flex:1;\n            flex:1;\n        margin-left: 0;\n        padding: 10px 0;\n    }\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-choice.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"specification\">\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'Gelcoat' || specification.SpecificationTypeSystemName === 'Upholstery'\">\n        <div *ngIf=\"size === 'xl' || size === 'lg' || size === 'md' || size === 'sm'\">\n            <div class=\"col-md-2 col-sm-3\">\n                <button class=\"btn color-area btn-block btn-flat\" *ngFor=\"let item of specification.Children\" [ngClass]=\"{active: (choiceSpecification && item.ID === choiceSpecification.ID)}\" (click)=\"on_choiceSpecificationSelected(item, false)\">\n                    <span class=\"selected-color-indicator {{specificationMetadata[item.ID] && specificationMetadata[item.ID]['ui.designer.color.css-class'] ? specificationMetadata[item.ID]['ui.designer.color.css-class'] : ''}}\"\n                          [ngStyle]=\"{'background-color': (specificationMetadata[item.ID] && specificationMetadata[item.ID]['ui.designer.color.rgb'] ? specificationMetadata[item.ID]['ui.designer.color.rgb'] : '')}\"></span>\n                    <div class=\"btn-flat-content\">{{item.DisplayName}}</div>\n                </button>\n                <button class=\"btn btn-reset btn-primary btn-block btn-flat\" (click)=\"resetClickHander()\">Reset <i class=\"fa fa-recycle\"></i></button>\n            </div>\n            <div *ngIf=\"choiceSpecification\" class=\"col-md-10 col-sm-9 color-area-stage\">\n                <cwd-specification-display *ngFor=\"let childSpecification of choiceSpecification.Children\" \n                                           class=\"color-pallet well well-sm\" \n                                           [siblingCount]=\"choiceSpecification.Children.length\" \n                                           [configuration]=\"configuration\" [specification]=\"childSpecification\" (specificationSelectedEvent)=\"on_specificationSelected($event)\"></cwd-specification-display>\n            </div>\n        </div>\n        <div *ngIf=\"size === 'xs'\">\n            <div class=\"col-md-2\">\n                <button class=\"btn color-area btn-block btn-flat\" *ngFor=\"let item of specification.Children\" [ngClass]=\"{active: (choiceSpecification && item.ID === choiceSpecification.ID)}\" (click)=\"on_choiceSpecificationSelected(item, colorPalletModal)\">\n                    <span class=\"selected-color-indicator {{specificationMetadata[item.ID] && specificationMetadata[item.ID]['ui.designer.color.css-class'] ? specificationMetadata[item.ID]['ui.designer.color.css-class'] : ''}}\"\n                          [ngStyle]=\"{'background-color': (specificationMetadata[item.ID] && specificationMetadata[item.ID]['ui.designer.color.rgb'] ? specificationMetadata[item.ID]['ui.designer.color.rgb'] : '')}\"></span>\n                    <div class=\"btn-flat-content\">{{item.DisplayName}}</div>\n                </button>\n                <button class=\"btn btn-reset btn-primary btn-block btn-flat\" (click)=\"resetClickHander()\">Reset <i class=\"fa fa-recycle\"></i></button>\n            </div>\n            <div bsModal #colorPalletModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n                <div class=\"modal-dialog modal-lg\">\n                    <div class=\"modal-content\">\n                        <div class=\"modal-body row\" *ngIf=\"choiceSpecification\">\n                            <cwd-specification-display *ngFor=\"let childSpecification of choiceSpecification.Children\" [configuration]=\"configuration\" [specification]=\"childSpecification\" (specificationSelectedEvent)=\"on_specificationSelected($event)\"></cwd-specification-display>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"featureGroupTypes.indexOf(specification.SpecificationTypeSystemName) > 0\">\n        <a class=\"info-box feature\" \n           [ngClass]=\"{'selected':specification.Selected}\" \n           [attr.data-defaultitem]=\"specification.Metadata['ui.designer.default']\"\n           tooltip=\"{{tooltip}}\" \n           tooltipPlacement=\"top\"\n           [tooltipEnable]=\"size !== 'xs'\"\n           (click)=\"specificationItemGroupClickedHander(content)\">\n            <span [ngStyle]=\"{'background-image': 'url(' + imgUrl + ')'}\" class=\"info-box-img\"></span>\n            <div class=\"info-box-content\">\n                <div class=\"info-box-text\">{{displayName}}</div>\n                <span class=\"info-box-number\">{{ (price > 0) ? (price | currency:(isoCurrencyCode$|async):true) : (hasDefault ? 'STD' : '') }}</span>\n            </div>\n            <div class=\"info-box-footer\">\n                <span *ngIf=\"specification.Selected\" class=\"fa fa-check fa-2x fa-pull-right\"></span>\n            </div>\n        </a>\n        <div bsModal #featureGroupModal=\"bs-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"featureGroupModal\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" (click)=\"featureGroupModal.hide()\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                        <h4 class=\"modal-title\">{{specification.SpecificationTypeSystemName}}</h4>\n                    </div>\n                    <div class=\"modal-body row\">\n                        <cwd-specification-display *ngFor=\"let childSpecification of specification.Children\"\n                                                   title=\"{{childSpecification.DisplayName + ':' + (childSpecification.Pricing[appState.CurrentUser.PriceLevel] || 0 | currency:(isoCurrencyCode$|async):true)}}\"\n                                                   class=\"col-xs-12 col-sm-6\"\n                                                   [specification]=\"childSpecification\"\n                                                   [configuration]=\"configuration\"\n                                                   (specificationSelectedEvent)=\"specificationItemClickedHandler(childSpecification)\">\n                        </cwd-specification-display>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-choice.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationItemChoiceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_util__ = __webpack_require__("../../../../../src/app/_shared/util.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_share__ = __webpack_require__("../../../../rxjs/add/operator/share.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_share___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_share__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_debounce__ = __webpack_require__("../../../../rxjs/add/operator/debounce.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_debounce___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_debounce__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};










var SpecificationItemChoiceComponent = SpecificationItemChoiceComponent_1 = (function (_super) {
    __extends(SpecificationItemChoiceComponent, _super);
    function SpecificationItemChoiceComponent(settingService, diag, appState) {
        var _this = _super.call(this) || this;
        _this.settingService = settingService;
        _this.diag = diag;
        _this.appState = appState;
        _this.choiceSpecificationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.featureGroupTypes = ['Flooring', 'Engine', 'Speakers', 'Propeller', 'FeatureGroup'];
        _this.displayName = "";
        _this.price = 0;
        _this.imgUrl = "";
        _this.tooltip = "";
        _this.hasDefault = false;
        _this.bootStrapObj$.subscribe(function (obj) { return _this.size = obj.Size; });
        _this.accordionActive = false;
        _this.specificationMetadata = {};
        return _this;
    }
    Object.defineProperty(SpecificationItemChoiceComponent.prototype, "selectedChild", {
        get: function () {
            return this.specification.Children.find(function (c) { return c.Selected; });
        },
        enumerable: true,
        configurable: true
    });
    SpecificationItemChoiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
        this.diag.logVerbose('Executing ngOninit().', SpecificationItemChoiceComponent_1.name + ".ngOnChanges()");
        this.diag.logVerbose("Subscribed to configurationService.configuration$", SpecificationItemChoiceComponent_1.name + ".ngOnChanges()");
        if (this.specification.Selected) {
            this.setDisplay(this.specification.Metadata['ui.designer.displayname'], this.specification.Pricing[this.appState.CurrentUser.PriceLevel], this.specification.Metadata['ui.designer.feature.image.source'], this.specification.Metadata['ui.designer.tooltip']);
        }
        else {
            this.resetDisplay();
        }
        this._configurationSub =
            this.appState
                .configuration$
                .subscribe(function (config) { return _this.buildMetadata(config, Object(__WEBPACK_IMPORTED_MODULE_4__shared__["j" /* flattenArray */])(_this.specification, function (s) { return s.Children; })); });
        this.hasDefault = this.specification.Children.some(function (c) { return !!c.Metadata["ui.designer.default"] && c.Metadata["ui.designer.default"].toLowerCase() === 'true'; });
    };
    SpecificationItemChoiceComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['specification'] && changes['specification'].currentValue !== changes['specification'].previousValue) {
            this.diag.logVerbose("Property specification { ID: " + changes['specification'].currentValue.ID + ", DisplayName: " + changes['specification'].currentValue.DisplayName + " changed.", SpecificationItemChoiceComponent_1.name + ".ngOnChanges()");
            if (this.specification && this.specification.Children) {
                if (this.size !== 'xs') {
                    this.on_choiceSpecificationSelected(this.specification.Children[0], false);
                }
            }
        }
        if (this.configuration && this.specification) {
            this.diag.logVerbose('Loading metadata.', SpecificationItemChoiceComponent_1.name + ".ngOnChanges()");
            this.buildMetadata(this.configuration, Object(__WEBPACK_IMPORTED_MODULE_4__shared__["j" /* flattenArray */])(this.specification, function (s) { return s.Children; }));
        }
        if (this.specification.SpecificationTypeSystemName === 'FeatureGroup') {
            if (changes['configuration']) {
                var selected_1 = !this.configuration ? null
                    : !this.configuration.Items.some(function (c) { return c.KeySpecificationID === _this.specification.ID; }) ? null
                        : this.configuration.Items.find(function (c) { return c.KeySpecificationID === _this.specification.ID; });
                this.specification.Selected = !!selected_1;
                if (selected_1) {
                    this.specification.Children.forEach(function (spec) { return spec.Selected = (spec.ID === selected_1.ValueSpecificationID); });
                }
            }
        }
    };
    SpecificationItemChoiceComponent.prototype.ngOnDestroy = function () {
        this._configurationSub.unsubscribe();
    };
    SpecificationItemChoiceComponent.prototype.on_choiceSpecificationSelected = function (specification, content) {
        this.choiceSpecification = specification;
        if (this.size === 'xs') {
            this.colorPalletModal.show();
        }
    };
    SpecificationItemChoiceComponent.prototype.on_specificationSelected = function (arg) {
        arg.specification.Selected = true;
        this.choiceSpecification.Selected = true;
        this.choiceSpecificationSelected.emit(new __WEBPACK_IMPORTED_MODULE_2__event_args__["a" /* ChoiceArgs */](this.choiceSpecification, arg.specification));
        if (this.size === 'xs') {
            this.colorPalletModal.hide();
        }
    };
    SpecificationItemChoiceComponent.prototype.specificationItemClickedHandler = function (specification) {
        specification.Selected = true;
        this.specification.Selected = true;
        this.setDisplay(specification.DisplayName, specification.Pricing[this.appState.CurrentUser.PriceLevel], specification.Metadata['ui.designer.feature.image.source'], specification.Metadata['ui.designer.tooltip']);
        this.specification.Pricing[this.appState.CurrentUser.PriceLevel] = specification.Pricing[this.appState.CurrentUser.PriceLevel];
        this.specification.Metadata['ui.designer.displayname'] = specification.DisplayName;
        this.specification.Metadata['ui.designer.feature.image.source'] = specification.Metadata['ui.designer.feature.image.source'];
        this.featureGroupModal.hide();
        this.choiceSpecificationSelected.emit(new __WEBPACK_IMPORTED_MODULE_2__event_args__["a" /* ChoiceArgs */](this.specification, specification));
    };
    SpecificationItemChoiceComponent.prototype.specificationItemGroupClickedHander = function (content) {
        if (this.specification.Selected) {
            this.specification.Selected = false;
            this.specification.Pricing[this.appState.CurrentUser.PriceLevel] = 0;
            this.specification.Metadata['ui.designer.displayname'] = "";
            this.specification.Metadata['ui.designer.feature.image.source'] = "";
            this.choiceSpecificationSelected.emit(new __WEBPACK_IMPORTED_MODULE_2__event_args__["a" /* ChoiceArgs */](this.specification, this.selectedChild));
            this.selectedChild.Selected = false;
            this.resetDisplay();
        }
        else {
            this.featureGroupModal.show();
        }
    };
    SpecificationItemChoiceComponent.prototype.resetClickHander = function () {
        this.appState.resetConfigurationChildren(this.specification.ID);
    };
    SpecificationItemChoiceComponent.prototype.setDisplay = function (displayName, price, imgUrl, tooltip) {
        this.displayName = displayName;
        this.price = price;
        this.imgUrl = imgUrl;
        this.tooltip = tooltip;
    };
    SpecificationItemChoiceComponent.prototype.resetDisplay = function () {
        var defaultChild = this.specification.Children.find(function (c) { return !!c.Metadata["ui.designer.default"]; });
        if (defaultChild && defaultChild.Metadata["ui.designer.default"].toLowerCase() === "true") {
            this.setDisplay(defaultChild.DisplayName, defaultChild.Pricing[this.appState.CurrentUser.PriceLevel], defaultChild.Metadata['ui.designer.feature.image.source'], defaultChild.Metadata['ui.designer.tooltip']);
        }
        else {
            this.setDisplay(this.specification.Metadata['ui.designer.default.displayname'], 0, this.specification.Metadata['ui.designer.default.image.source'], this.specification.Metadata['ui.designer.tooltip']);
        }
    };
    SpecificationItemChoiceComponent.prototype.buildMetadata = function (configuration, specifications) {
        var _this = this;
        this.specificationMetadata = {};
        configuration.Items.forEach(function (c) {
            if (specifications.some(function (spec) { return spec.ID === c.ValueSpecificationID; })) {
                _this.specificationMetadata[c.KeySpecificationID] = specifications
                    .find(function (spec) { return spec.ID === c.ValueSpecificationID; })
                    .Metadata;
            }
        });
    };
    return SpecificationItemChoiceComponent;
}(__WEBPACK_IMPORTED_MODULE_5__shared_util__["a" /* ResponsiveHelper */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _a || Object)
], SpecificationItemChoiceComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"]) === "function" && _b || Object)
], SpecificationItemChoiceComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationItemChoiceComponent.prototype, "choiceSpecificationSelected", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('colorPalletModal'),
    __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _c || Object)
], SpecificationItemChoiceComponent.prototype, "colorPalletModal", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('featureGroupModal'),
    __metadata("design:type", typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ngx_bootstrap_modal__["a" /* ModalDirective */]) === "function" && _d || Object)
], SpecificationItemChoiceComponent.prototype, "featureGroupModal", void 0);
SpecificationItemChoiceComponent = SpecificationItemChoiceComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-item-choice',
        template: __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-choice.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-item/specification-item-choice.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_7__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__application_setting__["ApplicationSettingService"]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]) === "function" && _g || Object])
], SpecificationItemChoiceComponent);

var SpecificationItemChoiceComponent_1, _a, _b, _c, _d, _e, _f, _g;
//# sourceMappingURL=specification-item-choice.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-multi-choice.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn.btn-transparent {\n    background-color: transparent !important;\n}\n\n.btn-round {\n    border-radius: 24px;\n    padding: 0;\n    margin: 0;\n    text-decoration: none;\n    color: #3c763d;\n}\n\n.btn-round::after {\n    font-family: FontAwesome;\n    content: '\\F10C';\n    font-size: 1.33333333em;\n}\n\n.btn-round.selected {\n    color: #f00b0b;\n}\n\n.btn-round.selected::after {\n    font-family: FontAwesome;\n    content: '\\F05D';\n    font-size: 1.33333333em;\n}\n\n@media (max-width: 425px) {\n    h4.media-heading {\n        font-size: 1.8rem;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-multi-choice.component.html":
/***/ (function(module, exports) {

module.exports = "<ng-template [ngIf]=\"specification\">\n    <div *ngFor=\"let childSpecification of specification.Children\" style=\"padding:10px; border-bottom:solid;\">\n        <div class=\"media\">\n            <div class=\"media-top hidden-sm hidden-md hidden-lg\">\n                <button title=\"{{ childSpecification.Selected ? 'Click To Remove' : 'Click To Add' }}\" [ngClass]=\"{'selected':childSpecification.Selected}\" class=\"pull-right btn btn-link btn-transparent btn-round text-success\" (click)=\"on_childSpecificationClicked(childSpecification)\">\n                    {{ childSpecification.Selected ? 'Click To Remove' : 'Click To Add' }}\n                </button>\n            </div>\n            <div class=\"media-left col-xs-12 col-sm-4\">\n                <img src=\"/images/features/exile-speakers.jpg\" class=\"media-object\" />\n            </div>\n            <div class=\"media-body\">\n                <h4 class=\"media-heading\">{{childSpecification.DisplayName}} - {{childSpecification.SpecificationMetadata['domain.mb.pricing.msrp']}}\n                </h4>\n                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam congue lacus velit, at aliquam eros dictum sit amet.\n                Pellentesque turpis nulla, ultrices quis luctus vel, maximus in eros. Aliquam erat volutpat. Proin luctus enim vitae\n                libero bibendum, vel dapibus lorem bibendum. Quisque et pharetra eros. Pellentesque sed blandit tortor. Sed ultrices\n                lacus ut orci malesuada, dapibus scelerisque nisl malesuada. Curabitur viverra at dolor ac consequat. Phasellus ipsum\n                augue, aliquam quis rutrum id, sollicitudin vitae arcu.\n            </div>\n            <div class=\"media-bottom hidden-xs\">\n                <button title=\"{{ childSpecification.Selected ? 'Click To Remove' : 'Click To Add' }}\" [ngClass]=\"{'selected':childSpecification.Selected}\" class=\"pull-right btn btn-link btn-transparent btn-round text-success\" (click)=\"on_childSpecificationClicked(childSpecification)\">\n                    {{ childSpecification.Selected ? 'Click To Remove' : 'Click To Add' }}\n                </button>\n            </div>\n        </div>\n    </div>\n</ng-template>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-multi-choice.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationItemMultiChoiceComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SpecificationItemMultiChoiceComponent = SpecificationItemMultiChoiceComponent_1 = (function () {
    function SpecificationItemMultiChoiceComponent(diag) {
        this.diag = diag;
        this.subSpecificationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SpecificationItemMultiChoiceComponent.prototype.ngOnInit = function () { };
    SpecificationItemMultiChoiceComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        this.diag.logVerbose('Executing ngOnChanges().', SpecificationItemMultiChoiceComponent_1.name + ".ngOnChanges()");
        if (this.specification && this.configuration) {
            this.specification.Children.forEach(function (s) { return s.Selected = _this.configuration.Items.filter(function (c) { return c.State !== __WEBPACK_IMPORTED_MODULE_3__shared__["d" /* DataEntityState */].Deleted; }).some(function (c) { return c.ValueSpecificationID === s.ID; }); });
        }
    };
    SpecificationItemMultiChoiceComponent.prototype.on_childSpecificationClicked = function (specification) {
        specification.Selected = specification.Selected || false;
        specification.Selected = !specification.Selected;
        this.diag.logInformation("Multi-Select item clicked, current selected state " + specification.Selected + ".", SpecificationItemMultiChoiceComponent_1.name);
        this.subSpecificationSelected.emit(new __WEBPACK_IMPORTED_MODULE_4__event_args__["b" /* MultiSelectArgs */](this.specification, specification));
    };
    return SpecificationItemMultiChoiceComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _a || Object)
], SpecificationItemMultiChoiceComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__configuration__["IConfiguration"]) === "function" && _b || Object)
], SpecificationItemMultiChoiceComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationItemMultiChoiceComponent.prototype, "subSpecificationSelected", void 0);
SpecificationItemMultiChoiceComponent = SpecificationItemMultiChoiceComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-item-multi-choice',
        template: __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-multi-choice.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-item/specification-item-multi-choice.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], SpecificationItemMultiChoiceComponent);

var SpecificationItemMultiChoiceComponent_1, _a, _b, _c;
//# sourceMappingURL=specification-item-multi-choice.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-navigation.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "button.active {\n    color: #f00b0b;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-navigation.component.html":
/***/ (function(module, exports) {

module.exports = "<nav *ngIf=\"specification\" class=\"navbar navbar-default hidden-xs\">\n    <div class=\"container-fluid\">\n        <!-- Brand and toggle get grouped for better mobile display -->\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#sub-navigation\" aria-expanded=\"false\">\n                <span class=\"sr-only\">Toggle navigation</span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"/\">{{specification.DisplayName}}</a>\n        </div>\n        <!-- Collect the nav links, forms, and other content for toggling -->\n        <div class=\"collapse navbar-collapse\" id=\"sub-navigation\">\n            <ul class=\"nav navbar-nav\">\n                <li *ngFor=\"let child of filterChildren\">\n                    <button class=\"btn btn-link\" (click)=\"specificationClicked(child)\" [ngClass]=\"{active: child.ID === selectedID}\">\n                        <i *ngIf=\"child.ID === selectedID\" class=\"fa fa-angle-double-right\"></i>\n                        {{child.DisplayName}}\n                    </button>\n                </li>\n                <li>\n                    <button class=\"btn btn-link\" (click)=\"summaryClicked()\" [ngClass]=\"{active: selectedID === -1}\">\n                        <i *ngIf=\"selectedID === -1\" class=\"fa fa-angle-double-right\"></i>\n                        Summary\n                    </button>\n                </li>\n            </ul>\n        </div><!-- /.navbar-collapse -->\n    </div><!-- /.container-fluid -->\n</nav>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item-navigation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationItemNavigationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_application_state__ = __webpack_require__("../../../../../src/app/_shared/application-state.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var SpecificationItemNavigationComponent = (function () {
    function SpecificationItemNavigationComponent(appState) {
        var _this = this;
        this.appState = appState;
        this.filterChildren = [];
        this.sub = this.appState
            .configuration$
            .map(function (c) { return c.Items; })
            .map(function (cis) { return cis.some(function (ci) { return ci.ValueSpecification.DisplayName.indexOf("Boatmate Trailer") >= 0; }); })
            .subscribe(function (hasTrailer) {
            return _this.filterChildren = (!_this.specification)
                ? []
                : hasTrailer
                    ? _this.specification.Children
                    : _this.specification.Children.filter(function (s) { return s.DisplayName.indexOf('Trailer Options') < 0; });
        });
        this._specification = {};
        this.navigationClicked = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    SpecificationItemNavigationComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    Object.defineProperty(SpecificationItemNavigationComponent.prototype, "specification", {
        get: function () {
            return this._specification;
        },
        set: function (specification) {
            this._specification = specification;
            this.filterChildren = this.specification.Children.filter(function (s) { return s.DisplayName.indexOf('Trailer Options') < 0; });
        },
        enumerable: true,
        configurable: true
    });
    SpecificationItemNavigationComponent.prototype.specificationClicked = function (specification) {
        this.selectedID = specification.ID;
        this.navigationClicked.next(specification);
    };
    SpecificationItemNavigationComponent.prototype.summaryClicked = function () {
        this.selectedID = -1;
        this.navigationClicked.next(null);
    };
    return SpecificationItemNavigationComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _a || Object),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _b || Object])
], SpecificationItemNavigationComponent.prototype, "specification", null);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationItemNavigationComponent.prototype, "navigationClicked", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Number)
], SpecificationItemNavigationComponent.prototype, "selectedID", void 0);
SpecificationItemNavigationComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-item-navigation',
        template: __webpack_require__("../../../../../src/app/specification/specification-item/specification-item-navigation.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-item/specification-item-navigation.component.css")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_2__shared_application_state__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_application_state__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_application_state__["a" /* ApplicationState */]) === "function" && _c || Object])
], SpecificationItemNavigationComponent);

var _a, _b, _c;
//# sourceMappingURL=specification-item-navigation.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ":root {\n    --main-bg-color: #f00b0b;\n}\n\n.btn.btn-transparent {\n    background-color: transparent !important;\n}\n\n.btn-round {\n    border-radius: 24px;\n    padding: 0;\n    margin: 0;\n    text-decoration: none;\n    color: #3c763d;\n}\n\n    .btn-round::after {\n        font-family: FontAwesome;\n        content: '\\F10C';\n        font-size: 1.33333333em;\n    }\n\n    .btn-round.selected {\n        color: #f00b0b;\n    }\n\n.btn-round.selected::after {\n            font-family: FontAwesome;\n            content: '\\F05D';\n            font-size: 1.33333333em;\n        }\n\n.btn-tile.selected {\n    border: solid 5px rgba(255, 0, 0, 0.70)\n}\n\n.btn-tile {\n    height: 250px;\n    width: 350px;\n    box-shadow: 0 0 20px rgba(0,0,0,0.2);\n    border: 0;\n    background-color: transparent;\n    padding: 1px;\n    margin: 10px;\n    border-radius: 2px;\n}\n\n.btn-tile:hover {\n    box-shadow: 0 0 20px rgba(0,0,0,0.2);\n    color: #898989;\n}\n\n.btn-tile-content {\n    height: 50px;\n    overflow: hidden;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    background-color: #F0F0F0;\n}\n\n.btn-tile-content h4 {\n    font-size: .5rem;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"specification\">\n    <!-- Feature -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'Feature' || specification.SpecificationTypeSystemName === 'BoatmateTrailerFeature'\">\n        <a class=\"info-box feature\"\n           [ngClass]=\"{'selected':isSelected$|async}\"\n           [attr.data-defaultitem]=\"(!!specification.Metadata['ui.designer.default'] && specification.Metadata['ui.designer.default'].toLowerCase() === 'true')\"\n           id=\"{{specification.ID}}_{{isSelected$|async}}\"\n           tooltip=\"{{specification.Metadata['ui.designer.tooltip']}}\"\n           tooltipPlacement=\"top\"\n           [tooltipEnable]=\"size !== 'xs'\"\n           (click)=\"specificationItemClickedHandler(specification)\">\n            <span [ngStyle]=\"{'background-image': 'url(' + specification.Metadata['ui.designer.feature.image.source'] + ')'}\" class=\"info-box-img\"></span>\n            <div class=\"info-box-content\">\n                <div class=\"info-box-text\">{{specification.DisplayName}}</div>\n                <span class=\"info-box-number\">{{(specification.Pricing[appState.CurrentUser.PriceLevel] ? (specification.Pricing[appState.CurrentUser.PriceLevel] | currency:(isoCurrencyCode$|async):true) : 'STD') }}</span>\n            </div>\n            <div class=\"info-box-footer\">\n                <span *ngIf=\"isSelected$|async\" class=\"fa fa-check fa-2x fa-pull-right\"></span>\n            </div>\n        </a>\n    </div>\n    <!-- UI Image Button -->\n    <div *ngIf=\"specification.SpecificationTypeSystemName === 'UIImageButton' || specification.SpecificationTypeSystemName === 'ReferenceUIImageButton'\">\n        <div [ngClass]=\"specification.Metadata['ui.designer.class']\">\n            <button class=\"btn btn-link thumbnail\" [ngStyle]=\"specification.Metadata['ui.designer.css']\" (click)=\"specificationItemClickedHandler(specification)\">\n                <div class=\"caption\" *ngIf=\"specification.Metadata['ui.designer.image.position'] === 'bottom'\">\n                    {{specification.Metadata['ui.designer.label.text']}}\n                </div>\n                <img src=\"{{specification.Metadata['ui.designer.image.source']}}\" />\n                <div class=\"caption\" *ngIf=\"specification.Metadata['ui.designer.image.position'] === 'top'\">\n                    {{specification.Metadata['ui.designer.label.text']}}\n                </div>\n            </button>\n        </div>\n    </div>\n    <!-- Color -->\n    <div *ngIf=\"specification.IsActive && (specification.SpecificationTypeSystemName === 'Color' || specification.SpecificationTypeSystemName === 'ColorMetallic')\">\n        <div class=\"color-swatch-container\">\n            <div *ngIf=\"specification.Metadata['ui.designer.color.type'] === 'rgb'\">\n                <button class=\"color-swatch thumbnail pull-left\"\n                        placement=\"top\"\n                        tooltip=\"{{toolTip}}\"\n                        [ngClass]=\"{selected: isSelected$|async}\"\n                        [style.background-color]=\"specification.Metadata['ui.designer.color.rgb']\"\n                        (click)=\"specificationItemClickedHandler(specification)\"></button>\n            </div>\n            <div *ngIf=\"specification.Metadata['ui.designer.color.type'] === 'texture'\">\n                <button class=\"color-swatch thumbnail pull-left {{specification.Metadata['ui.designer.color.css-class']}}\"\n                        placement=\"top\"\n                        tooltip=\"{{toolTip}}\"\n                        [ngClass]=\"{selected: isSelected$|async}\"\n                        (click)=\"specificationItemClickedHandler(specification)\"></button>\n            </div>\n        </div>\n    </div>\n    <!-- Attribute Feature -->\n    <cwd-specification-item-attribute-feature\n        *ngIf=\"specification.SpecificationTypeSystemName === 'AttributeFeature'\"\n        [specification]=\"specification\"\n        [configuration]=\"configuration\"\n        (specificationSelected)=\"specificationItemClickedHandler($event)\"\n    ></cwd-specification-item-attribute-feature>\n</div>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-item/specification-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__application_setting__ = __webpack_require__("../../../../../src/app/application-setting/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_application_state__ = __webpack_require__("../../../../../src/app/_shared/application-state.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_services_diagnostic_service__ = __webpack_require__("../../../../../src/app/_shared/services/diagnostic.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shared_util__ = __webpack_require__("../../../../../src/app/_shared/util.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};








var SpecificationItemComponent = SpecificationItemComponent_1 = (function (_super) {
    __extends(SpecificationItemComponent, _super);
    function SpecificationItemComponent(settingService, diag, appState) {
        var _this = _super.call(this) || this;
        _this.settingService = settingService;
        _this.diag = diag;
        _this.appState = appState;
        _this.specificationSelectedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.bootStrapObj$.subscribe(function (obj) { return _this.size = obj.Size; });
        _this.componentName = SpecificationItemComponent_1.name;
        return _this;
    }
    Object.defineProperty(SpecificationItemComponent.prototype, "toolTip", {
        get: function () {
            if (this.specification.SpecificationTypeSystemName === "Color") {
                return this.specification.Metadata['domain.mb.swatch.number']
                    ? this.specification.Metadata['domain.mb.swatch.number'] + " : " + this.specification.DisplayName
                    : this.specification.DisplayName;
            }
            else if (this.specification.SpecificationTypeSystemName === 'ColorMetallic') {
                return this.specification.Metadata['domain.mb.swatch.number']
                    ? this.specification.Metadata['domain.mb.swatch.number'] + " : " + this.specification.DisplayName
                    : this.specification.DisplayName;
            }
            else {
                return this.specification.DisplayName;
            }
        },
        enumerable: true,
        configurable: true
    });
    SpecificationItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isoCurrencyCode$ =
            this.settingService
                .applicationSetting$
                .filter(function (setting) { return setting !== null; })
                .map(function (setting) { return setting['IsoCurrencyFormat']; });
        this.isSelected$ =
            this.appState
                .configuration$
                .map(function (c) { return c.Items.some(function (item) { return item.ValueSpecificationID === _this.specification.ID; }); });
    };
    SpecificationItemComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['configuration'] && changes['configuration'].currentValue) {
            this.specification.Selected =
                this.configuration.Items.some(function (c) { return c.ValueSpecificationID === _this.specification.ID; });
        }
    };
    SpecificationItemComponent.prototype.specificationItemClickedHandler = function (selectionArgs) {
        if (selectionArgs instanceof __WEBPACK_IMPORTED_MODULE_7__event_args__["c" /* SelectionArgs */]) {
            this.specificationSelectedEvent.emit(selectionArgs);
        }
        else {
            this.specificationSelectedEvent.emit(new __WEBPACK_IMPORTED_MODULE_7__event_args__["c" /* SelectionArgs */](selectionArgs));
        }
    };
    return SpecificationItemComponent;
}(__WEBPACK_IMPORTED_MODULE_6__shared_util__["a" /* ResponsiveHelper */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__configuration__["IConfiguration"]) === "function" && _a || Object)
], SpecificationItemComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__specification__["ISpecification"]) === "function" && _b || Object)
], SpecificationItemComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationItemComponent.prototype, "specificationSelectedEvent", void 0);
SpecificationItemComponent = SpecificationItemComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-item',
        template: __webpack_require__("../../../../../src/app/specification/specification-item/specification-item.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-item/specification-item.component.css")]
    }),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__shared_application_state__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__application_setting__["ApplicationSettingService"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__application_setting__["ApplicationSettingService"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__shared_services_diagnostic_service__["a" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_services_diagnostic_service__["a" /* DiagnosticService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__shared_application_state__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_application_state__["a" /* ApplicationState */]) === "function" && _e || Object])
], SpecificationItemComponent);

var SpecificationItemComponent_1, _a, _b, _c, _d, _e;
//# sourceMappingURL=specification-item.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-options/specification-options.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-flat {\n    border-radius: 2px;\n    display: block;\n}\n\n.btn-text-left {\n    text-align: left;\n}\n\n.btn-flat-grey {\n    min-height: 35px;\n    background-color: #fff;\n    box-shadow: 0 0 0 rgba(0, 0, 0, 0);\n    border: 1px solid rgba(0,0,0,0.1);\n    padding: 5px 4px 5px 15px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-pack: justify;\n        justify-content: space-between;\n    -ms-flex-align: baseline;\n        align-items: baseline;\n    width: 185px;\n}\n\n.btn-flat.btn-flat-grey:hover, .btn-flat.btn-flat-grey.active {\n    box-shadow: 3px 3px 15px rgba(0,0,0,0.3);\n    border: 1px solid rgba(0,0,0,0.1);\n    color: #898989;\n}\n\n.btn-flat.btn-flat-grey.active {\n    background-color: rgba(0,0,0,0.5);\n    color: #FFF;\n    border: 1px solid rgba(255,0,0,0.9);\n}\n\n.feature-item {\n    padding: 0;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-options/specification-options.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"specification\">\n    <div *ngIf=\"size === 'xl' || size === 'lg' || size === 'md' || size === 'sm'\">\n        <div class=\"col-sm-3\">\n            <button class=\"btn btn-flat-grey btn-text-left btn-block btn-flat\" *ngFor=\"let item of specification.Children\" [ngClass]=\"{active: (selectedParent && item.ID === selectedParent.ID)}\" (click)=\"specificationParentClickedHandler(item)\">\n                {{item.DisplayName}}\n                <small class=\"label label-primary pull-right\">{{ item.SelectedChildCount || '0' }}</small>\n            </button>\n        </div>\n        <div class=\"col-sm-9\">\n            <div *ngIf=\"selectedParent\">\n                <div *ngFor=\"let childSpecification of selectedParent.Children\">\n                    <cwd-specification-item class=\"col-sm-12 col-md-6\"\n                                            *ngIf=\"choiceGroups.indexOf(childSpecification.SpecificationTypeSystemName) < 1\"\n                                            [specification]=\"childSpecification\"\n                                            [configuration]=\"configuration\"\n                                            (specificationSelectedEvent)=\"specificationItemClickedHandler($event)\">\n                    </cwd-specification-item>\n                    <cwd-specification-item-choice class=\"col-sm-12 col-md-6\"\n                                                   *ngIf=\"choiceGroups.indexOf(childSpecification.SpecificationTypeSystemName) > 0\"\n                                                   [specification]=\"childSpecification\"\n                                                   [configuration]=\"configuration\"\n                                                   (choiceSpecificationSelected)=\"specificationItemClickedHandler($event)\">\n                    </cwd-specification-item-choice>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div *ngIf=\"size === 'xs'\">\n        <accordion [closeOthers]=\"true\">\n            <accordion-group *ngFor=\"let parent of specification.Children\" \n                             [isOpen]=\"parent.ID == this.selectedParent.ID\" \n                             (click)=\"specificationParentClickedHandler(parent)\">\n                <div accordion-heading>\n                    {{parent.DisplayName}}\n                    <small class=\"label label-primary pull-right\">{{ parent.SelectedChildCount }}</small>\n                </div>\n                <div *ngFor=\"let childSpecification of parent.Children\">\n                    <cwd-specification-item class=\"col-xs-12 col-sm-4 feature-item\"\n                                            *ngIf=\"choiceGroups.indexOf(childSpecification.SpecificationTypeSystemName) < 1\"\n                                            [specification]=\"childSpecification\"\n                                            [configuration]=\"configuration\"\n                                            (specificationSelectedEvent)=\"specificationItemClickedHandler($event)\">\n                    </cwd-specification-item>\n                    <cwd-specification-item-choice class=\"col-xs-12 col-sm-4 feature-item\"\n                                                   *ngIf=\"choiceGroups.indexOf(childSpecification.SpecificationTypeSystemName) > 0\"\n                                                   [specification]=\"childSpecification\"\n                                                   [configuration]=\"configuration\"\n                                                   (choiceSpecificationSelected)=\"specificationItemClickedHandler($event)\">\n                    </cwd-specification-item-choice>\n                </div>\n            </accordion-group>\n        </accordion>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-options/specification-options.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationOptionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_util__ = __webpack_require__("../../../../../src/app/_shared/util.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var SpecificationOptionsComponent = (function (_super) {
    __extends(SpecificationOptionsComponent, _super);
    function SpecificationOptionsComponent(appState) {
        var _this = _super.call(this) || this;
        _this.appState = appState;
        _this.childSpecificationSelectedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.multiSpecificationSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.choiceGroups = ['Flooring', 'Engine', 'Speakers', 'Propeller', 'FeatureGroup'];
        _this.bootStrapObj$.subscribe(function (obj) { return _this.size = obj.Size; });
        return _this;
    }
    SpecificationOptionsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.selectedParent = this.specification.Children[0];
        //this.selectedParent.SelectedChildCount = this.selectedParent.SelectedChildCount ||
        //    flattenArray(this.configuration, c => c.Children).map(c => c.KeySpecificationID === this.selectedParent.ID).length
        //this.selectedParent.SelectedChildCount = this.selectedParent.SelectedChildCount || 0
        //this.setCount(this.selectedParent)
        this.specification.Children.forEach(function (s) { return _this.setCount(s); });
    };
    SpecificationOptionsComponent.prototype.specificationParentClickedHandler = function (parent) {
        this.selectedParent = parent;
        //this.selectedParent.SelectedChildCount = this.selectedParent.SelectedChildCount || 0
        this.setCount(this.selectedParent);
    };
    SpecificationOptionsComponent.prototype.specificationItemClickedHandler = function (arg) {
        var _this = this;
        var child = arg instanceof __WEBPACK_IMPORTED_MODULE_1__event_args__["a" /* ChoiceArgs */] ? arg.selectionSpecification :
            arg instanceof __WEBPACK_IMPORTED_MODULE_1__event_args__["b" /* MultiSelectArgs */] ? arg.selectionSpecification :
                arg instanceof __WEBPACK_IMPORTED_MODULE_1__event_args__["c" /* SelectionArgs */] ? arg.specification :
                    undefined;
        var attributeData = arg instanceof __WEBPACK_IMPORTED_MODULE_1__event_args__["c" /* SelectionArgs */] ? arg.attributeData : undefined;
        if (arg instanceof __WEBPACK_IMPORTED_MODULE_1__event_args__["c" /* SelectionArgs */]) {
            child.Selected = !child.Selected;
        }
        this.selectedParent.Selected = this.choiceGroups.some(function (n) { return n === _this.selectedParent.SpecificationTypeSystemName; })
            ? child.Selected
            : this.specification.Selected;
        var selectionArgs = (arg instanceof __WEBPACK_IMPORTED_MODULE_1__event_args__["a" /* ChoiceArgs */])
            ? arg
            : this.choiceGroups.some(function (n) { return n === _this.selectedParent.SpecificationTypeSystemName; })
                ? new __WEBPACK_IMPORTED_MODULE_1__event_args__["a" /* ChoiceArgs */](this.selectedParent, child)
                : new __WEBPACK_IMPORTED_MODULE_1__event_args__["b" /* MultiSelectArgs */](this.selectedParent, child, '', attributeData);
        this.childSpecificationSelectedEvent.emit(selectionArgs);
        this.updateCount(this.selectedParent.ID);
    };
    SpecificationOptionsComponent.prototype.updateCount = function (specID) {
        var curr = this.specification.Children.find(function (s) { return s.ID === specID; });
        if (curr) {
            curr.SelectedChildCount = this.choiceGroups.some(function (n) { return n === curr.SpecificationTypeSystemName; }) ? 1 : curr.Children.filter(function (s) { return s.Selected; }).length;
        }
    };
    SpecificationOptionsComponent.prototype.setCount = function (spec) {
        var _this = this;
        spec.SelectedChildCount = spec.SelectedChildCount || 0;
        var foundCount = 0;
        this.configuration
            .Items
            .forEach(function (c) {
            if (c.KeySpecificationID === spec.ID) {
                foundCount = _this.choiceGroups.some(function (n) { return n === spec.SpecificationTypeSystemName; }) ? 1 : (foundCount + 1);
            }
        });
        spec.SelectedChildCount = foundCount;
    };
    return SpecificationOptionsComponent;
}(__WEBPACK_IMPORTED_MODULE_5__shared_util__["a" /* ResponsiveHelper */]));
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__specification__["ISpecification"]) === "function" && _a || Object)
], SpecificationOptionsComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"]) === "function" && _b || Object)
], SpecificationOptionsComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationOptionsComponent.prototype, "childSpecificationSelectedEvent", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationOptionsComponent.prototype, "multiSpecificationSelected", void 0);
SpecificationOptionsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-options',
        template: __webpack_require__("../../../../../src/app/specification/specification-options/specification-options.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-options/specification-options.component.css")]
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]; }))),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["a" /* ApplicationState */]) === "function" && _c || Object])
], SpecificationOptionsComponent);

var _a, _b, _c;
//# sourceMappingURL=specification-options.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification-stack-panel/specification-stack-panel.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".stack-panel {\n    display: -ms-flexbox;\n    display: flex;\n}\n\n.stack-panel-vertical {\n    -ms-flex-direction: column;\n        flex-direction: column;\n    -ms-flex-align: stretch;\n        align-items: stretch;\n}\n\n.stack-panel-horzontal {\n    -ms-flex-direction: row;\n        flex-direction: row;\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/specification/specification-stack-panel/specification-stack-panel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"stack-panel stack-panel-{{specification.Metadata['ui.designer.stackpanel.orientation']}}\">\n    <ng-template [ngIf]=\"specification.Metadata['ui.designer.stackpanel.chidren.type'] === 'custom'\">\n        <cwd-specification-display *ngFor=\"let child of specification.Children\" [specification]=\"child\" [configuration]=\"configuration\" (specificationSelectedEvent)=\"specificationClickedHandler(child)\"></cwd-specification-display>\n    </ng-template>\n    <ng-template [ngIf]=\"specification.Metadata['ui.designer.stackpanel.chidren.type'] === 'button'\">\n        <button class=\"btn btn-block btn-primary\" *ngFor=\"let child of specification.Children\" (click)=\"on_specificationSelected(child)\">{{child.DisplayName}}</button>\n    </ng-template>\n</div>"

/***/ }),

/***/ "../../../../../src/app/specification/specification-stack-panel/specification-stack-panel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SpecificationStackPanelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification__ = __webpack_require__("../../../../../src/app/specification/specification.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__specification___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__specification__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__event_args__ = __webpack_require__("../../../../../src/app/specification/event-args.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuration__ = __webpack_require__("../../../../../src/app/configuration/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SpecificationStackPanelComponent = SpecificationStackPanelComponent_1 = (function () {
    function SpecificationStackPanelComponent(diag) {
        this.diag = diag;
        this.specificationSelectedEvent = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.componentName = SpecificationStackPanelComponent_1.name;
        this.diag.logVerbose("Instantiating " + this.componentName + " component", this.componentName + ".constructor()");
    }
    SpecificationStackPanelComponent.prototype.specificationClickedHandler = function (specification) {
        specification.Selected = !specification.Selected;
        this.specificationSelectedEvent.next(new __WEBPACK_IMPORTED_MODULE_2__event_args__["b" /* MultiSelectArgs */](this.specification, specification));
    };
    return SpecificationStackPanelComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__configuration__["IConfiguration"]) === "function" && _a || Object)
], SpecificationStackPanelComponent.prototype, "configuration", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__specification__["ISpecification"]) === "function" && _b || Object)
], SpecificationStackPanelComponent.prototype, "specification", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SpecificationStackPanelComponent.prototype, "specificationSelectedEvent", void 0);
SpecificationStackPanelComponent = SpecificationStackPanelComponent_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'cwd-specification-stack-panel',
        template: __webpack_require__("../../../../../src/app/specification/specification-stack-panel/specification-stack-panel.component.html"),
        styles: [__webpack_require__("../../../../../src/app/specification/specification-stack-panel/specification-stack-panel.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], SpecificationStackPanelComponent);

var SpecificationStackPanelComponent_1, _a, _b, _c;
//# sourceMappingURL=specification-stack-panel.component.js.map

/***/ }),

/***/ "../../../../../src/app/specification/specification.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=specification.js.map

/***/ }),

/***/ "../../../../../src/app/surcharge/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__surcharge_type__ = __webpack_require__("../../../../../src/app/surcharge/surcharge-type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__surcharge_type___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__surcharge_type__);
/* harmony namespace reexport (by used) */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__surcharge_type__, "SurchargeService")) __webpack_require__.d(__webpack_exports__, "SurchargeService", function() { return __WEBPACK_IMPORTED_MODULE_0__surcharge_type__["SurchargeService"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_surcharge_service__ = __webpack_require__("../../../../../src/app/surcharge/services/surcharge.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "SurchargeService", function() { return __WEBPACK_IMPORTED_MODULE_1__services_surcharge_service__["a"]; });


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/surcharge/services/surcharge.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SurchargeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared__ = __webpack_require__("../../../../../src/app/_shared/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SurchargeService = SurchargeService_1 = (function () {
    function SurchargeService(http, appState, diag) {
        this.http = http;
        this.appState = appState;
        this.diag = diag;
        this.baseUrl = 'http://localhost:44337/api/surcharge';
    }
    SurchargeService.prototype.getSurchargeTypes = function () {
        var _this = this;
        var url = this.baseUrl + "/get/surchargetypes";
        return this.http
            .get(url)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                _this.diag.logError("Error Response Status (" + res.status + ") while requesting SurchargeTypes.", SurchargeService_1.name + ".getSurchargeTypes()");
                throw new Error("Error Response Status (" + res.status + ") while requesting SurchargeTypes.");
            }
            var body = res.json();
            return body || [];
        })
            .catch(this.handleError);
    };
    SurchargeService.prototype.calcSurcharges = function (surchargeTypes) {
        var _this = this;
        var url = this.baseUrl + "/post/calc?dealerID=" + this.appState.CurrentUser.DealerID;
        return this.http
            .post(url, surchargeTypes)
            .map(function (res) {
            if (res.status < 200 || res.status >= 300) {
                _this.diag.logError("Error Response Status (" + res.status + ") while requesting Surcharge calculation.", SurchargeService_1.name + ".calcSurcharges()");
                throw new Error("Error Response Status (" + res.status + ") while requesting Surcharges calculation.");
            }
            var body = res.json();
            return body || [];
        })
            .catch(this.handleError);
    };
    SurchargeService.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        var errMsg = error.message || 'Server error';
        //this.diag.logError(errMsg, SpecificationService.name + ".handleError()")
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    return SurchargeService;
}());
SurchargeService = SurchargeService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["a" /* ApplicationState */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__shared__["f" /* DiagnosticService */]) === "function" && _c || Object])
], SurchargeService);

var SurchargeService_1, _a, _b, _c;
//# sourceMappingURL=surcharge.service.js.map

/***/ }),

/***/ "../../../../../src/app/surcharge/surcharge-type.ts":
/***/ (function(module, exports) {

//# sourceMappingURL=surcharge-type.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-il": "../../../../moment/locale/en-il.js",
	"./en-il.js": "../../../../moment/locale/en-il.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mn": "../../../../moment/locale/mn.js",
	"./mn.js": "../../../../moment/locale/mn.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./mt": "../../../../moment/locale/mt.js",
	"./mt.js": "../../../../moment/locale/mt.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./tg": "../../../../moment/locale/tg.js",
	"./tg.js": "../../../../moment/locale/tg.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./ug-cn": "../../../../moment/locale/ug-cn.js",
	"./ug-cn.js": "../../../../moment/locale/ug-cn.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map