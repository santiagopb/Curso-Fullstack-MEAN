'use strict';

angular.module('vetDetails', [])
    .component('vetDetails', {
        templateUrl: '/app/vet-details/vet-details.html',
        bindings: {
            vet: '=',
            item: '='
        },
        controller: function ($scope, $http) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });