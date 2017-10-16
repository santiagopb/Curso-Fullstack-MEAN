'use strict';

angular.module('vetNew', ['vet'])
    .component('vetNew', {
        templateUrl: '/app/vet-new/vet-new.html',
        bindings: {
            vet: '='
        },
        controller: function (vetService, $scope, $http) {
            $scope.item = {_id:'', name: ''};
        }
    });