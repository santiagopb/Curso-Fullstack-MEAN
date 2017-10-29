'use strict';

angular.module('customerList', ['customerService'])
    .component('customerList', {
        templateUrl:'/app/customer-list/customer-list.html',
        controller: function(customerService, $scope) {
            var customerSubscription;

            this.$onInit = () => {
                this.customerSubscription = customerService.query()
                    .subscribe((subscription) => {
                        subscription.$promise.then((data) => {
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

            this.$onDestroy = () => {
                /**
                 * Unsubscribe the old way
                 * now (dispose became unsubscribe in RxJS5)
                 */
                this.customerSubscription.dispose();
            }

        }
    });
