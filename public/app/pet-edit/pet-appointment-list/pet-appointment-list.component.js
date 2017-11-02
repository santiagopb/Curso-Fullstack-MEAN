'use strict';

angular.module('petAppointmentList', ['appointmentService'])
    .component('petAppointmentList', {
        templateUrl:'/app/pet-edit/pet-appointment-list/pet-appointment-list.html',
        bindings: {
            petId: '<'
        },
        controller: function(appointmentService, $scope) {
            $scope.pet;
            $scope.appointments = [];
           
            this.$onInit = () => {
                $scope.appointments = appointmentService.getByPetId(this.petId);
            }
            this.$onChanges = function ({ petId }) {
                if (angular.isDefined(petId) && !petId.isFirstChange()) {
                    $scope.appointments = appointmentService.getByPetId(petId.currentValue);
                    $scope.pet = petId.currentValue;
                }
            }

            $scope.formatDate = (date) => {
                return  moment(date).format('dddd, Do MMMM YYYY');
            }

            $scope.formatDateToHour = (date) => {
                return moment(date).format('HH:mm');
            }

        }
    });