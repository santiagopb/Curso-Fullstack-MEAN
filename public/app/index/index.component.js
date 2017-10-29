'use strict';
angular.module('index', [])
    .component('index', {
        templateUrl:'/app/index/index.html',
        controller: function($scope, $http) {
            $('ul.tabs').tabs();
        }
    });
