'use strict';

angular.module('vet', [])
    .factory('vetService', function($resource) {
        return $resource('/api/vets/:id', {id: '@id'}, {
            query: {
                method: "GET",
                //params: {},
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
            },
            delete: {
                method:'DELETE'
            }
        })
    });