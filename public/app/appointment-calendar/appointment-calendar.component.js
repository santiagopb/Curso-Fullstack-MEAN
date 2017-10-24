'use strict';

angular.module('appointmentCalendar', [])
    .component('appointmentCalendar', {
        templateUrl: '/app/appointment-calendar/appointment-calendar.html',

        controller: function ($scope, $location) {
        	$scope.daySelected = {};
        	$scope.$on('selectDay', function(event, day) { 
        		$scope.daySelected.date = day.date;
        		$scope.daySelected.value = day.value;
        	});
        }
    });
