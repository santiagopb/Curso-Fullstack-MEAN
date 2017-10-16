'use strict';

angular.module('petList', [])
    .component('petList', {
        templateUrl:'/app/pet-list/pet-list.html',
        bindings: {
            pet: '='
        },
        controller: function($scope) {


        }
    });
