'use strict';

angular.module('customerNew', [])
    .component('customerNew', {
        templateUrl:'/app/customer-new/customer-new.html',
        bindings: {
            customer: '=',
            pet: '='
        },
        controller: function( $scope, $routeParams) {
            $scope.item = {id: ''};
        }
    });
