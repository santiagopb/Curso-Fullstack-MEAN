'use strict';

angular.module('customerFactory2', [])
    .factory('customerFactory2', function($resource) {
        return $resource('/api/customers/:id', {id: '@id'}, {
            query: {
                method: "GET",
                params: {},
                isArray: true,
                cache: true
                // transformResponse,
                // interceptor
            },
            /*get: {
                method: "GET",
                params: {id: "@id"},
                isArray: false,
                cache: false
                // transformResponse,
                // interceptor
            },*/
            update: { 
                method:'PUT'
            }
        })
    });