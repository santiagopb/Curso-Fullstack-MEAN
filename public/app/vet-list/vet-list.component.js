'use strict';

angular.module('vetList', ['vetService'])
    .component('vetList', {
        templateUrl: '/app/vet-list/vet-list.html',
        controller: function (vetService, $scope) {
            
            this.$onInit = () => {
                var vetSubscription = vetService.query()
                    .subscribe((subscription) => {
                        subscription.$promise.then(function (data) {
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
            
        }
    });