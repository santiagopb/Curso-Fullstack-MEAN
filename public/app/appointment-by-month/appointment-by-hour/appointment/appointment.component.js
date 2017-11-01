'use strict';

angular.module('appointment', ['appointmentService', 'customerService', 'petService', 'rx'])
    .component('appointment', {
        templateUrl: '/app/appointment-by-month/appointment-by-hour/appointment/appointment.html',
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
				$scope.pet.selected = {};
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
				appointmentService.save(_this.value).then(
                    (res) => {
                        this.value = res;
						$scope.$emit('toast', 'Cita guardada');
						$scope.$emit('saveItem', _this.value);
                    },
                    (err) => {
                        $scope.$emit('toast', 'Error:' + err)
					});
			}
			
			$scope.deleteAppointment = () => {
				appointmentService.delete(_this.value).then(
					(res) => {
						$scope.$emit('toast', 'Cita borrada');
						$scope.$emit('deleteItem', _this.value);
					},
					(err) => {
						$scope.$emit('toast', 'Error:' + err);
					}
				);

			}

			$scope.pet.selectPet = (pet) => {
				$scope.pet.selected = pet;
			}

        }
    });