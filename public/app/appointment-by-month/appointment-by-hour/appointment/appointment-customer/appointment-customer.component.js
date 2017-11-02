'use strict';

angular.module('appointmentCustomer', [])
    .component('appointmentCustomer', {
        templateUrl:'/app/appointment-by-month/appointment-by-hour/appointment/appointment-customer/appointment-customer.html',
        bindings: {
            id: '=',
            customer: '='
        },
        controller: function($scope, $routeParams) {
            
        }
    });