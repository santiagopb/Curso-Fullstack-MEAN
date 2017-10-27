'use strict';

angular.module('appointmentService', ['appointmentResource'])
    .service('appointmentService', function(appointmentResource) { 	
    	var _initDate = moment(new Date).format('YYYYMMDD');
		var _endDate = moment(new Date).format('YYYYMMDD');
		function _refresh () {
			appointmentSource.onNext(appointmentResource.getCalendar({initDate: _initDate, endDate: _endDate}));
		}
		
    	var appointmentSource = new Rx.BehaviorSubject(appointmentResource.getCalendar({initDate: _initDate, endDate: _endDate}));
    	var appointment = appointmentSource.asObservable();
    	this.appointment = appointment;
    	
    	this.getCalendar = function  (initDate, endDate) {
    		_initDate = initDate;
    		_endDate = endDate;
    		_refresh();
    		return this.appointment;
    	}
    	
    	this.save = function (appointment) {
            if (appointment._id) { // PUT
            	appointmentResource.update({ id: appointment._id }, {
                    initDate: appointment.initDate,
                    endDate: appointment.endDate,
                    pet: appointment.pet._id,
                    vet: appointment.vet,
                    note: appointment.note
                }, (data) => {
                	console.log('PUT', data)
                	_refresh();
                	/*
                    const ObjIndex = $scope.customer.data.findIndex((obj => obj._id == customer._id));
                    $scope.customer.data[ObjIndex].dni = customer.dni;
                    $scope.customer.data[ObjIndex].firstName = customer.firstName;
                    $scope.customer.data[ObjIndex].lastName = customer.lastName;
                    $scope.customer.data[ObjIndex].phone = customer.phone;
                    $scope.customer.data[ObjIndex].email = customer.email;
                    $scope.customer.data[ObjIndex].note = customer.note;*/
                    Materialize.toast('Los datos del Cliente se han guardado con exito!!!', 4000, 'rounded');
                });
            } else { // SAVE
            	console.log('SAVE', appointment)
//            	appointmentResource.save({}, {
//            		initDate: appointment.initDate,
//                    endDate: appointment.endDate,
//                    pet: appointment.pet._id,
//                    vet: appointment.vet,
//                    note: appointment.note
//                }, (data) => {
//                    //$scope.customer.data.unshift(data);
//                    Materialize.toast('Los datos del Cliente se han guardado con exito!!!', 4000, 'rounded');
//                });
            }

        }
        
        this.delete = function (appointment) {
        	appointmentResource.delete({ id: appointment._id }, () => {
                //const index = $scope.customer.data.indexOf(customer);
                //$scope.customer.data.splice(index, 1);
            });
        }
        
    });