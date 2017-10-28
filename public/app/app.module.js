'use strict';

angular.module('petStore', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    //Directives
    'showDatepicker',
    //Modules
    'menu',
    'index',
    'appointment',
    'appointmentCustomer',
    'appointmentPet',
    'appointmentByMonth',
    'appointmentByDay',
    'appointmentByHour',
    'customerList',
    'customerEdit',
    'customerDetails',
    'customerById',
    'petList',
    'petEdit',
    'petDetails',
    'petByOwner',
    'petNewByOwner',
    'petUploadFile',
    'vetList',
    'vetEdit',
    'vetDetails'
]).controller('appCtrl', function ($scope) {

    var socket = io.connect('http://localhost:3000', { 'forceNew': true });
    
    socket.on('messages', function(data) {
        console.log(data);
    });

    socket.on('customerPut', function(data) {
        alert(data.message);
    });

    
    $scope.$on("toast", function(evt,data){
        Materialize.toast(data, 4000, 'rounded');
    });




}).component('app', {
    templateUrl: '/app/app.html',
    controller: 'appCtrl'
});