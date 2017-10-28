'use strict';

angular.module('customerById', ['customerService'])
    .component('customerById', {
        templateUrl:'/app/pet-edit/pet-details/customer-by-id/customer-by-id.html',
        bindings: {
            id: '='
        },
        controller: function(customerService, $scope) {
            this.$onInit = () => {
                var customerSubscription = customerService.query()
                    .subscribe((subscription) => {
                        subscription.$promise.then(function (data) {
                            $scope.customers = data;
                        })
                    });
            }
        }
    });