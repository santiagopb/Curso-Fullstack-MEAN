'use strict';

angular.module('menu', [])
    .component('menu', {
        templateUrl:'/app/menu/menu.html',
        bindings: {
            title: '=',
            item: '=',
            option: '='
        },
        controller: function($scope) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });
