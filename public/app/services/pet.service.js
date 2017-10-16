'use strict';

angular.module('pet', [])
    .factory('petService', function($resource) {
        return $resource('/api/pets/:id', {id: '@id'}, {
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
            }
        })
    });