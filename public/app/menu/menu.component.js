'use strict';

angular.module('menu', [])
    .component('menu', {
        templateUrl:'/app/menu/menu.html',
        bindings: {
            title: '=',
            item: '='
        },
        controller: function($scope) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });
