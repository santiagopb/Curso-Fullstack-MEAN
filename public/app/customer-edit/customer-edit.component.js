'use strict';

angular.module('customerEdit', [])
    .component('customerEdit', {
        templateUrl:'/app/customer-edit/customer-edit.html',
        bindings: {
            customer: '=',
            pet: '='
        },
        controller: function( $scope, $routeParams) {
        	$scope.customerId = $routeParams.id
            $scope.item = this.customer.get($routeParams.id);
        }
    });
