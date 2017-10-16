'use strict';

angular.module('petDetails', [])
    .component('petDetails', {
        templateUrl:'/app/pet-details/pet-details.html',
        bindings: {
            pet: '=',
            customer: '=',
            item: '='
        },
        controller: function($scope, $routeParams) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });