'use strict';

angular.module('appointmentByDay', [])
    .component('appointmentByDay', {
        templateUrl: '/app/appointment-by-month/appointment-by-day/appointment-by-day.html',
        bindings: {
        	day: '<',
        	value: '=',
        	hour: '='
        },
        controller: function ($scope) {  
			$scope.hourSelected;
			$scope.day = [];

        	this.$onInit = () => {
				$scope.day = getDay(this.day, this.value);
				this.day = moment(this.day).format('dddd, Do MMMM YYYY');
				this.hour={};
        	}
        	
        	this.$onChanges = function ({day}) {
        		if (angular.isDefined(day) && !day.isFirstChange()) {
					$scope.day = getDay(this.day, this.value);
					this.day = moment(this.day).format('dddd, Do MMMM YYYY');
					this.hour={};
                }
			}.bind(this);
        	
        	$scope.selectHour = function(hour, value) {
				if (!value) { // 
					var initDate = moment(this.day+' '+hour, 'dddd, Do MMMM YYYY HH:mm').toDate();
					var endDate = moment(initDate).add(29, 'm');
					value = {initDate, endDate}
				}	
				this.hour = {hour:hour, value:value};
				$scope.hourSelected = hour;
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
            };
			
			$scope.$on("changeCalendarByDay", function (evt, appointment) {
				const ObjIndex = $scope.day.findIndex((obj) => obj.hour == $scope.hourSelected);
				$scope.day[ObjIndex].value = appointment;
				$scope.day[ObjIndex].customer = appointment.pet.owner.firstName;
				$scope.day[ObjIndex].pet = appointment.pet.name;
            });
			
        }
    });