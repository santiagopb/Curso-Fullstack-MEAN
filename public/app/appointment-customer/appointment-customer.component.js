'use strict';

angular.module('appointmentCustomer', [])
    .component('appointmentCustomer', {
        templateUrl:'/app/appointment-customer/appointment-customer.html',
        bindings: {
            id: '=',
            customer: '='
        },
        controller: function($scope, $routeParams) {
            
        }
    });