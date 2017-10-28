'use strict';

angular.module('customerDetails', [])
    .component('customerDetails', {
        templateUrl:'/app/customer-edit/customer-details/customer-details.html',
        bindings: {
            item: '='
        },
        controller: function($scope, $routeParams) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });
