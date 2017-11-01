'use strict';
var INTEGER_REGEXP = /^-?\d+$/;

var app = angular.module('inputValidator', []);

app.directive('vInteger', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl, ngModel) {
            console.log(elem, attrs)

            ctrl.$validators.integer = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    //elem.removeClass('invalid');
                    return true;
                }

                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                   // elem.removeClass('invalid');
                    return true;
                }

                //elem.addClass('invalid');
                // it is invalid
                return false;

            };

        }
    }
}).directive('vName', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl, ngModel) {

            ctrl.$validators.length = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (modelValue) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;

            };

        }
    }
});
;


