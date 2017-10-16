'use strict';

angular.module('vetList', ['vet'])
    .component('vetList', {
        templateUrl: '/app/vet-list/vet-list.html',
        controller: function (vetService, $scope, $http) {
            
            this.$onInit = function() {
                $scope.vet = vetService.getVet();
                console.log($scope.vet);
            }
                
            
            
        }
    });