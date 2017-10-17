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
            },
            upload: {
                method: 'POST',
                transformRequest: formDataObject,
                headers: { 'Content-Type': undefined, enctype:'multipart/form-data' }
            }
        })

        function formDataObject (data) {
            var fd = new FormData();
            angular.forEach(data, function(value, key) {
                fd.append(key, value);
            });
            return fd;
        }
        
    });