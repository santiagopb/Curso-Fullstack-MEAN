'use strict';

angular.module('petList', ['petService'])
    .component('petList', {
        templateUrl:'/app/pet-list/pet-list.html',
        controller: function(petService, $scope) {
            var petSubscription;

            this.$onInit = () => {
                this.petSubscription = petService.query()
                    .subscribe((subscription) => {
                        subscription.$promise.then((data) => {
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

            this.$onDestroy = () => {
                /**
                 * Unsubscribe the old way
                 * now (dispose became unsubscribe in RxJS5)
                 */
                this.petSubscription.dispose();
            }

        }
    });
