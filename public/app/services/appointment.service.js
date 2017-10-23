'use strict';

angular.module('appointmentService', ['appointmentResource'])
    .service('appointmentService', function(appointmentResource) { 	
    	
    	this.getCalendar = function  (initDate, endDate) {
    		if (!initDate) initDate = moment(new Date).format('YYYYMMDD');
    		if (!endDate) endDate = moment(new Date).format('YYYYMMDD');
    		return appointmentResource.getCalendar({initDate: initDate, endDate: endDate});
    	}
    	

    });