'use strict';

angular.module('appointmentPet', [])
    .component('appointmentPet', {
        templateUrl: '/app/appointment-pet/appointment-pet.html',
        bindings: {
            customerId: '<',
            pet: '='
        },
        controller: function ($scope, $http) {
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
                $scope.pets = [];
                $scope.item = {};
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


        }
    });
