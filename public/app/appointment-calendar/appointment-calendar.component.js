'use strict';

angular.module('appointmentCalendar', ['appointmentService'])
    .component('appointmentCalendar', {
        templateUrl:'/app/appointment-calendar/appointment-calendar.html',

        controller: function(appointmentService, $scope) {
        	$scope.calendar = appointmentService.getCalendar();
        	
            $scope.back = () => {
                window.history.back();
            }
        }
    });
