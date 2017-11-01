'use strict';

angular.module('socketIo', ['appointmentService', 'customerService', 'petService', 'vetService'])
    .component('socketIo', {
        templateUrl:'/app/socket-io/socket-io.html',
        controller: function(appointmentService, customerService, petService, vetService, $scope) {
            $scope.values = [];
            $('#textarea-io').trigger('autoresize');
            var socket = io.connect('http://localhost:3000', { 'forceNew': true });
            
            socket.on('messages', function(data) {
                //console.log(data);
            });

            /****************************************
             * Customer
             ****************************************/
        
            socket.on('customerPost', function(data) {
                customerService.socketPost(data);
            });

            socket.on('customerPut', function(data) {
                customerService.socketPut(data);
            });

            socket.on('customerDelete', function(id) {
                customerService.socketDelete(id);
            });

            /****************************************
             * Pet
             ****************************************/

            socket.on('petPost', function(data) {
                petService.socketPost(data);
            });

            socket.on('petPut', function(data) {
                petService.socketPut(data);
            });

            socket.on('petDelete', function(id) {
                petService.socketDelete(id);
            });

            /****************************************
             * Vet
             ****************************************/

            socket.on('vetPost', function(data) {
                vetService.socketPost(data);
            });
            socket.on('vetPut', function(data) {
                vetService.socketPut(data);
            });
            socket.on('vetDelete', function(id) {
                vetService.socketDelete(id);
            });

            /****************************************
             * Appointment
             ****************************************/

            socket.on('appointmentPost', function(data) {
                appointmentService.socketPost(data);
            });
            socket.on('appointmentPut', function(data) {
                appointmentService.socketPut(data);
            });
            socket.on('appointmentDelete', function(id) {
                appointmentService.socketDelete(id);
            });
        }
    });