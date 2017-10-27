'use strict';

angular.module('appointmentResource', [])
    .factory('appointmentResource', function($resource) {  	
    	return $resource('/api/appointments/:id', {}, {
            query: {
                method: "GET",
                params: {},
                isArray: true,
                cache: true
            },
            update: { 
                method:'PUT'
            },
            getCalendar: {
                method: "GET",
                params: {initDate: "@initDate", endDate: "@endDate"},
                isArray: false,
                url: '/api/appointments/:initDate/:endDate'
            }
        })
    });