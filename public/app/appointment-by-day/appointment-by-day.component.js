'use strict';

angular.module('appointmentByDay', [])
    .component('appointmentByDay', {
        templateUrl: '/app/appointment-by-day/appointment-by-day.html',
        bindings: {
        	day: '<',
        	value: '=',
        	hour: '='
        },
        controller: function ($scope) {  
        	$scope.day = [];

        	this.$onInit = () => {
        		$scope.day = getDay(this.day, this.value);
        	}
        	
        	this.$onChanges = function ({day}) {
        		if (angular.isDefined(day) && !day.isFirstChange()) {
        			$scope.day = getDay(this.day, this.value);
                }
        	}.bind(this);
        	
        	$scope.selectHour = function(hour, value) {
        		this.hour = {hour:hour, value:value};
        	}.bind(this);
        	
        	function getDay(thisDay, db=[]) {
            	const startHour = 9;
            	const endHour = 18;
            	const intervalInHour = 0.5;
            	
                var day = [];
                var startDate = moment(thisDay).set({hour: startHour});
                var endDate = moment(thisDay).set({hour: endHour});
                for (var hour = startDate; hour <= endDate; hour=moment(hour).add(intervalInHour, 'H')) {
                	var hourValue = moment(hour).format('HH:mm')
                    day.push({
                    	hour: hourValue,
                    	value: db[hourValue],
                    	customer: db[hourValue] ? db[hourValue].pet.owner.firstName : '',
                    	pet: db[hourValue] ? db[hourValue].pet.name : ''
                    });
                }

                return day;
            }
        	
        	
        }
    });