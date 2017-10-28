'use strict';

angular.module('petList', ['petService'])
    .component('petList', {
        templateUrl:'/app/pet-list/pet-list.html',
        bindings: {
            pet: '='
        },
        controller: function(petService, $scope) {

            this.$onInit = () => {
                var petSubscription = petService.query()
                    .subscribe((subscription) => {
                        subscription.$promise.then(function (data) {
                            $scope.pets = data;
                        })
                    });
            }

            $scope.delete = (pet) => {
                petService.delete(pet).then(
                    (res) => {
                        $scope.$emit('toast', 'Cliente borrado');
                    },
                    (err) => {
                        $scope.$emit('toast', 'Error');
                    }
                );
            }
        }
    });
