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
                $scope.values.push(data);
            });

            socket.on('customerPut', function(data) {
                customerService.socketPut(data);
                $scope.values.push(data);
            });

            socket.on('customerDelete', function(id) {
                customerService.socketDelete(id);
                $scope.values.push({_id: id, __v:-1});
            });

            /****************************************
             * Pet
             ****************************************/

            socket.on('petPost', function(data) {
                petService.socketPost(data);
                $scope.values.push(data);
            });

            socket.on('petPut', function(data) {
                petService.socketPut(data);
                $scope.values.push(data);
            });

            socket.on('petDelete', function(id) {
                petService.socketDelete(id);
                $scope.values.push({_id: id, __v:-1});
            });

            /****************************************
             * Vet
             ****************************************/

            socket.on('vetPost', function(data) {
                vetService.socketPost(data);
                $scope.values.push(data);
            });
            socket.on('vetPut', function(data) {
                vetService.socketPut(data);
                $scope.values.push(data);
            });
            socket.on('vetDelete', function(id) {
                vetService.socketDelete(id);
                $scope.values.push({_id: id, __v:-1});
            });

            /****************************************
             * Appointment
             ****************************************/

            socket.on('appointmentPost', function(data) {
                appointmentService.socketPost(data);
                $scope.values.push(data);
            });
            socket.on('appointmentPut', function(data) {
                appointmentService.socketPut(data);
                $scope.values.push(data);
            });
            socket.on('appointmentDelete', function(id) {
                appointmentService.socketDelete(id);
                $scope.values.push({_id: id, __v:-1});
            });
        }
    });