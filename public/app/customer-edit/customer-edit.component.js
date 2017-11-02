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
                if($('.ng-invalid').length > 0 || $('.invalid').length > 0){
                    $scope.$emit('toast', 'Hay errores en el formulario');
                    return;
                }
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
