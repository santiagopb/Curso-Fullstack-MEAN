'use strict';

angular.module('petByOwner', [])
    .component('petByOwner', {
        templateUrl: '/app/pet-by-owner/pet-by-owner.html',
        bindings: {
            customerId: '=',
            pet: '='
        },
        controller: function ($scope, $http) {
            $scope.newPet = false;
            $scope.pets;
            $scope.item = {};
            this.$onInit = function () {
                if (this.customerId){
                	var customerId = this.customerId;
                    $http.get('/api/petsbyowner/' + this.customerId).
                    then(function (response) {
                        $scope.pets = response.data;
                        $scope.item.owner = customerId;
                    });
                }
                
            };

            this.$onChanges = function ({ customerId }) {
                if (angular.isDefined(customerId) && !customerId.isFirstChange()) {
                    $http.get('/api/petsbyowner/' + customerId.currentValue).
                        then(function (response) {
                            if (response.data.length>0){
                                $scope.pets = response.data;
                                $scope.item.owner = customerId.currentValue;
                            }
                        });
                }
            }

            $scope.addPet = function () {
                $scope.newPet=true;
            }

        }
    });
