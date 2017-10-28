'use strict';

angular.module('appointmentPet', ['petService'])
    .component('appointmentPet', {
        templateUrl: '/app/appointment-by-month/appointment-by-hour/appointment/appointment-pet/appointment-pet.html',
        bindings: {
            customerId: '<',
            pet: '='
        },
        controller: function (petService, $scope, $http) {
            $scope.pets;
            $scope.item = {};
            this.$onInit = function () {
                if (this.customerId){
                    $scope.pets = petService.getPetsByOwner(this.customerId);
                }    
            };

            this.$onChanges = function ({ customerId }) {
                $scope.pets = [];
                $scope.item = {};
                if (angular.isDefined(customerId) && !customerId.isFirstChange()) {
                    $scope.pets = petService.getPetsByOwner(customerId.currentValue);
                }
            }
        }
    });
