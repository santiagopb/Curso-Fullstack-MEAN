'use strict';

angular.module('customerList', ['customerService'])
    .component('customerList', {
        templateUrl:'/app/customer-list/customer-list.html',
        bindings: {
            customer: '='
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

            $scope.delete = (customer) => {
                customerService.delete(customer).then(
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
