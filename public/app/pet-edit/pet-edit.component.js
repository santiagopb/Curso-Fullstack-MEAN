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