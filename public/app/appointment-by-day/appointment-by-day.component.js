'use strict';

angular.module('appointmentByDay', [])
    .component('appointmentByDay', {
        templateUrl: '/app/appointment-by-day/appointment-by-day.html',
        bindings: {
        	day: '=',
        	value: '='
        },
        controller: function ($scope,) {
        	const startHour = 9;
        	const endHour = 18;
        	const intervalInHour = 0.5;
        	
        	$scope.day = [];

        	this.$onInit = () => {
        		$scope.day = getDay(null, startHour, endHour, intervalInHour);
        	}
        	
        	function getDay(db, startHour, endHour, intervalInHour) {
                var day = [];
                
                for (var hour = startHour; hour <= endHour; hour++) {
                    day.push(moment(hour).format('HH:mm'));
                    hour = moment(hour).add(intervalInHour, 'H');
                    console.log('dddd', hour, endHour)
                }

                return day;
            }
        }
    });