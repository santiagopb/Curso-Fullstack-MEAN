'use strict';

angular.module('appointment', ['customerService', 'petService', 'rx'])
    .component('appointment', {
        templateUrl: '/app/appointment/appointment.html',
        bindings: {
        	value: '<'
        },
        controller: function (customerService, petService, $scope) {  

			$scope.customer = {};
			$scope.pet = {}

			this.$onInit = () => {
				getData();
			}

			function getData () {
				var customerSubscription = customerService.query().subscribe((data)=> {
					$scope.customer.data = data;
				});

				var petSubscription = petService.query().subscribe((data)=> {
					$scope.pet.data = data;
				})
			}
        	

        }
    });