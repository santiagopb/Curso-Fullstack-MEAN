'use strict';

angular.module('socketIo', [])
    .component('socketIo', {
        templateUrl:'/app/socket-io/socket-io.html',
        controller: function($scope) {
            $scope.values = [];
            $('#textarea-io').trigger('autoresize');
            var socket = io.connect('http://localhost:3000', { 'forceNew': true });
            
            socket.on('messages', function(data) {
                console.log(data);
            });

            /****************************************
             * Customer
             ****************************************/
        
            socket.on('customerPost', function(data) {
                $scope.values.unshift(data);
            });

            socket.on('customerPut', function(data) {
                $scope.values.unshift(data);
            });

            socket.on('customerDelete', function(data) {
                $scope.values.unshift(data);
            });

            /****************************************
             * Pet
             ****************************************/

            socket.on('petPost', function(data) {
                $scope.values.unshift(data);
            });

            socket.on('petPut', function(data) {
                $scope.values.unshift(data);
            });

            socket.on('petDelete', function(data) {
                $scope.values.unshift(data);
            });

            /****************************************
             * Vet
             ****************************************/

            socket.on('vetPost', function(data) {
                $scope.values.unshift(data);
            });
            socket.on('vetPut', function(data) {
                $scope.values.unshift(data);
            });
            socket.on('vetDelete', function(data) {
                $scope.values.unshift(data);
            });

            /****************************************
             * Appointment
             ****************************************/

            socket.on('appointmentPost', function(data) {
                $scope.values.unshift(data);
            });
            socket.on('appointmentPut', function(data) {
                $scope.values.unshift(data);
            });
            socket.on('appointmentDelete', function(data) {
                $scope.values.unshift(data);
            });
        }
    });