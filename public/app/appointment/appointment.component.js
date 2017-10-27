'use strict';

angular.module('appointment', ['appointmentService', 'customerService', 'petService', 'rx'])
    .component('appointment', {
        templateUrl: '/app/appointment/appointment.html',
        bindings: {
        	value: '<'
        },
        controller: function (appointmentService, customerService, petService, $scope) {  
        	var _this = this;
        	$scope.customer = {};
			$scope.pet = {}
			$scope.pet.selected = {};

			this.$onInit = () => {
				sincData();
			}
			
			this.$onChanges = function ({ value }) {
                if (angular.isDefined(value) && !value.isFirstChange()) {
                	sincData();
                }
			}

			function sincData () {
				var customerSubscription = customerService.query().subscribe((data)=> {
					$scope.customer.data = data;
				});

				var petSubscription = petService.query().subscribe((data)=> {
					$scope.pet.data = data;
				})
				if(angular.isDefined(_this.value) && _this.value.pet){
					$scope.pet.selected = _this.value.pet;
				}
			}
        	
			$scope.saveAppointment = () => {
				_this.value.pet = $scope.pet.selected;
				appointmentService.save(_this.value);
				$scope.$emit("saveAppointment", "some data");
			}
			
			$scope.pet.selectPet = (pet) => {
				$scope.pet.selected = pet;
			}

        }
    });