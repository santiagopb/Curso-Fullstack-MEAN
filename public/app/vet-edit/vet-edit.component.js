'use strict';

angular.module('vetEdit', [])
    .component('vetEdit', {
        templateUrl: '/app/vet-edit/vet-edit.html',
        bindings: {
            vet: '='
        },
        controller: function ($scope, $http, $routeParams) {
            $scope.item = this.vet.get($routeParams.id);
        }
    });