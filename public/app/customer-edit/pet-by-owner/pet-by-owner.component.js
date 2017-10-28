'use strict';

angular.module('petByOwner', ['petService'])
    .component('petByOwner', {
        templateUrl: '/app/customer-edit/pet-by-owner/pet-by-owner.html',
        bindings: {
            customerId: '<',
        },
        controller: function (petService, $scope, $http) {
            $scope.newPet = false;
            $scope.pets;
            $scope.item = {};
            this.$onInit = function () {
                if (this.customerId){
                    $scope.pets = petService.getPetsByOwner(this.customerId);
                    $scope.item.owner = this.customerId;
                }
                
            };

            this.$onChanges = function ({ customerId }) {
                if (angular.isDefined(customerId) && !customerId.isFirstChange()) {
                    $scope.pets = petService.getPetsByOwner(customerId.currentValue );
                    $scope.item.owner = customerId.currentValue;
                }
            }

            $scope.addPet = function () {
                $scope.item = {};
                $scope.item.owner = this.customerId;
                $scope.newPet=true;
            }.bind(this);


            $scope.$on("addPet", function(evt,pet){
                var event = petService.save(pet);
                // Ok
                $scope.pets.unshift(pet);
                $scope.item = {}
                $scope.newPet=false;
                Materialize.toast(pet, 4000, 'rounded');
            });

        }
    });
