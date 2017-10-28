'use strict';

angular.module('customerEdit', ['customerService'])
    .component('customerEdit', {
        templateUrl: '/app/customer-edit/customer-edit.html',
        controller: function (customerService, $scope, $routeParams) {

            this.$onInit = () => {
                if ($routeParams.id) {
                    $scope.item = customerService.get($routeParams.id);
                } else {
                    $scope.item = {};
                }
            }

            $scope.$on("saveItem", function (evt, customer) {
                customerService.save(customer).then(
                    (res) => {
                        $scope.item = res;
                        $scope.$emit('toast', 'Cliente guardado');
                    },
                    (err) => {
                        $scope.$emit('toast', 'Error:' + err)
                    });
            });
        }
    });
