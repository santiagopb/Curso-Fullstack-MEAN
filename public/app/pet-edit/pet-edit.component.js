'use strict';

angular.module('petEdit', [])
    .component('petEdit', {
        templateUrl:'/app/pet-edit/pet-edit.html',
        bindings: {
            pet: '=',
            customer: '='
        },
        controller: function( $scope, $routeParams) {
            $scope.item = this.pet.get($routeParams.id);
        }
    });