'use strict';

angular.module('appointmentService', ['appointmentResource'])
    .service('appointmentService', function(appointmentResource) {
    	var calendar;
    	
    	this.getCalendar = function  (date) {
    		if (!date) date = moment(new Date).format('YYYYMM');
    		calendar = appointmentResource.query({date: date})
    		return calendar;
    	}
    	
    	console.log('Service');

    });