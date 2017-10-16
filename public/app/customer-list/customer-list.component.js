'use strict';

angular.module('customerList', [])
    .component('customerList', {
        templateUrl:'/app/customer-list/customer-list.html',
        bindings: {
            customer: '='
        },
        controller: function($scope) {


        }
    });
