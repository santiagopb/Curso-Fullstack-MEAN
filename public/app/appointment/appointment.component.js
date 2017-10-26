'use strict';

angular.module('appointment', ['customerService', 'rx'])
    .component('appointment', {
        templateUrl: '/app/appointment/appointment.html',
        bindings: {
        	value: '='
        },
        controller: function (customerService, $scope) {  
        	
        	var customer = customerService.customer.subscribe((data)=> {
        		console.log(data)
        	});
        	
        	
        	//console.log(customer)
        	/*
        	customer.subscribe().((data)=>{
        		console.log(data)
        	})
        	*/
        }
    });