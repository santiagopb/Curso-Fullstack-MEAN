'use strict';

angular.module('petNew', [])
    .component('petNew', {
        templateUrl:'/app/pet-new/pet-new.html',
        bindings: {
            pet: '=',
            customer: '='
        },
        controller: function( $scope, $routeParams) {
            $scope.item = {id: ''};
        }
    });