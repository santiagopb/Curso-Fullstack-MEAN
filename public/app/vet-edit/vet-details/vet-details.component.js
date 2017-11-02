'use strict';

angular.module('vetDetails', [])
    .component('vetDetails', {
        templateUrl: '/app/vet-edit/vet-details/vet-details.html',
        bindings: {
            item: '='
        },
        controller: function ($scope, $http) {

        }
    });