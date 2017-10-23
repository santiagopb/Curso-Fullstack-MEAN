'use strict';

angular.module('appointmentService', ['appointmentResource'])
    .service('appointmentService', function(appointmentResource, $q) {
    	
    	var calendar;
    	
    	this.getCalendar = function  (initDate, endDate) {
    		var defered = $q.defer();
    		var promise = defered.promise;
    		
    		console.log(initDate, endDate)
    		if (!initDate) initDate = moment(new Date).format('YYYYMMDD');
    		if (!endDate) endDate = moment(new Date).format('YYYYMMDD');
    		defered.resolve(calendar = appointmentResource.getCalendar({initDate: initDate, endDate: endDate}));
    		return promise;
    	}
    	

    });