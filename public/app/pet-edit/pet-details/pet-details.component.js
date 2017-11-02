'use strict';

angular.module('petDetails', [])
    .component('petDetails', {
        templateUrl: '/app/pet-edit/pet-details/pet-details.html',
        bindings: {
            item: '='
        },
        controller: function ($scope, $routeParams) {

            /**
             *  La directiva show-datepicker necesita implementar la notificacion manual de los cambios de angular a travez de
             *  la interfaz "$scope.selectDate = function (date) {}".
             *  Luego de actualizar los cambios de fecha en los bindings correspondientes es necesario ejecutar "$scope.$apply()" 
             *  para hacer la notificacion namual de cambio de valor
             */
            $scope.selectDate = function (date) {
                this.item.birthday = date;
                $scope.$apply();
            }.bind(this);

            $scope.back = () => {
                window.history.back();
            }
        }
    });