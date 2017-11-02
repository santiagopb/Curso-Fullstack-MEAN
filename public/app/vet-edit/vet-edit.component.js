'use strict';

angular.module('vetEdit', ['vetService'])
    .component('vetEdit', {
        templateUrl: '/app/vet-edit/vet-edit.html',
        controller: function (vetService, $scope, $routeParams) {
            this.$onInit = () => {
                if ($routeParams.id){
                    $scope.item = vetService.get($routeParams.id);
                } else {
                    $scope.item = {}
                }
            }
            
            $scope.$on("saveItem", function (evt, vet) {
                if($('.ng-invalid').length > 0 || $('.invalid').length > 0){
                    $scope.$emit('toast', 'Hay errores en el formulario');
                    return;
                }
                vetService.save(vet).then(
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