'use strict';
var INTEGER_REGEXP = /^-?\d+$/;

var app = angular.module('inputValidator', []);

app.directive('inputPet', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            name: '@',
            model: '=',
            label: '@'
        },
        template: `<div class="input-field">
        <input id="{{name}}" type="text" ng-model="model" class="validate" ng-class="{'invalid ng-invalid': error}">
        <span ng-show="error" class="red-text error" ng-repeat="err in error">{{err}}</span>
        <label class="active" for="{{name}}">{{label}}</label>
        </div>`,
        link: function (scope, elem, attrs, ctrl, ngModel) {

            ctrl.$validators.validate = function (modelValue, viewValue) {
                var obj = {};
                obj[attrs.name] = modelValue;
                const validationErrors = Validators.validatePet(obj);
                if (angular.isDefined(validationErrors) && validationErrors[attrs.name]) {
                    scope.error = validationErrors[attrs.name];
                    return false;
                }
                // it is valid
                scope.error = ""
                return true;
            };

        }
    }
}).directive('inputVet', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            name: '@',
            model: '=',
            label: '@'
        },
        template: `<div class="input-field">
        <input id="{{name}}" type="text" ng-model="model" class="validate" ng-class="{'invalid ng-invalid': error}">
        <span ng-show="error" class="red-text error" ng-repeat="err in error">{{err}}</span>
        <label class="active" for="{{name}}">{{label}}</label>
        </div>`,
        link: function (scope, elem, attrs, ctrl, ngModel) {

            ctrl.$validators.validate = function (modelValue, viewValue) {
                var obj = {};
                obj[attrs.name] = modelValue;
                const validationErrors = Validators.validateVet(obj);
                if (angular.isDefined(validationErrors) && validationErrors[attrs.name]) {
                    scope.error = validationErrors[attrs.name];
                    return false;
                }
                // it is valid
                scope.error = ""
                return true;
            };

        }
    }
}).directive('inputCustomer', function () {
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            name: '@',
            model: '=',
            label: '@'
        },
        template: `<div class="input-field">
        <input id="{{name}}" type="text" ng-model="model" class="validate" ng-class="{'invalid ng-invalid': error}">
        <span ng-show="error" class="red-text error" ng-repeat="err in error">{{err}}</span>
        <label class="active" for="{{name}}">{{label}}</label>
        </div>`,
        link: function (scope, elem, attrs, ctrl, ngModel) {

            ctrl.$validators.validate = function (modelValue, viewValue) {
                var obj = {};
                obj[attrs.name] = modelValue;
                const validationErrors = Validators.validateCustomer(obj);
                if (angular.isDefined(validationErrors) && validationErrors[attrs.name]) {
                    scope.error = validationErrors[attrs.name];
                    return false;
                }
                // it is valid
                scope.error = ""
                return true;
            };
        }
    }
});



