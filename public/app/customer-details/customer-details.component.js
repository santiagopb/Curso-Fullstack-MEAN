'use strict';

angular.module('customerDetails', [])
    .component('customerDetails', {
        templateUrl:'/app/customer-details/customer-details.html',
        bindings: {
            customer: '=',
            item: '='
        },
        controller: function($scope, $routeParams) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });
