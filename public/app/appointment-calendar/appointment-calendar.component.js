'use strict';

angular.module('appointmentCalendar', [])
    .component('appointmentCalendar', {
        templateUrl:'/app/appointment-calendar/appointment-calendar.html',

        controller: function($scope) {
            $scope.back = () => {
                window.history.back();
            }
        }
    });
