'use strict';

angular.module('petStore', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    //Directives
    'showDatepicker',
    'inputValidator',
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
    'petAppointmentList',
    'vetList',
    'vetEdit',
    'vetDetails',
    //SocketIO
    'socketIo'
]).controller('appCtrl', function ($scope) {

    $scope.$on("toast", function(evt,data){
        Materialize.toast(data, 4000, 'rounded');
    });

}).component('app', {
    templateUrl: '/app/app.html',
    controller: 'appCtrl'
});