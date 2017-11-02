'use strict';

angular.module('vetList', ['vetService'])
    .component('vetList', {
        templateUrl: '/app/vet-list/vet-list.html',
        controller: function (vetService, $scope) {
            var vetSubscription;
            
            this.$onInit = () => {
                this.vetSubscription = vetService.query()
                    .subscribe((subscription) => {
                        subscription.$promise.then((data) => {
                            $scope.vets = data;
                        })
                    });
            }

            $scope.delete = (vet) => {
                vetService.delete(vet).then(
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
                this.vetSubscription.dispose();
            }
            
        }
    });