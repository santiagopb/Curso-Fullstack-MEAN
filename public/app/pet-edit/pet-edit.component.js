'use strict';

angular.module('petEdit', ['petService'])
    .component('petEdit', {
        templateUrl:'/app/pet-edit/pet-edit.html',
        controller: function(petService, $scope, $routeParams) {
            this.$onInit = () => {
                if ($routeParams.id){
                    $scope.item = petService.get($routeParams.id);
                } else {
                    $scope.item = {}
                }
            }
            
            $scope.$on("saveItem", function (evt, pet) {
                if($('.ng-invalid').length > 0 || $('.invalid').length > 0){
                    $scope.$emit('toast', 'Hay errores en el formulario');
                    return;
                }
                petService.save(pet).then(
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