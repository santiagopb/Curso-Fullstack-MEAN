'use strict';

angular.module('appointmentDetails', [])
    .component('appointmentDetails', {
        templateUrl: '/app/appointment-details/appointment-details.html',
        bindings: {
        	hour: '='
        },
        controller: function ($scope) {


        }
    });
