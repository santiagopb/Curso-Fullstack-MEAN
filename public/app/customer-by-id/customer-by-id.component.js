'use strict';

angular.module('customerById', [])
    .component('customerById', {
        templateUrl:'/app/customer-by-id/customer-by-id.html',
        bindings: {
            id: '=',
            customer: '='
        },
        controller: function($scope, $routeParams) {
            //$scope.item = this.customer.get($routeParams.id);
        }
    });