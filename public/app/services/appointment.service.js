'use strict';

angular.module('appointmentService', ['rx'])
    .service('appointmentService', function($resource, $q) { 	
        var Resource = $resource('/api/appointments/:id', {}, {
            query: {
                method: "GET",
                params: {},
                isArray: true,
                cache: true
            },
            update: { 
                method:'PUT'
            },
            getCalendar: {
                method: "GET",
                params: {initDate: "@initDate", endDate: "@endDate"},
                isArray: false,
                url: '/api/appointments/:initDate/:endDate'
            }
        })

    	var _initDate = moment(new Date).format('YYYYMMDD');
		var _endDate = moment(new Date).format('YYYYMMDD');
		function _refresh () {
			appointmentSource.onNext(Resource.getCalendar({initDate: _initDate, endDate: _endDate}));
		}
		
    	var appointmentSource = new Rx.BehaviorSubject(Resource.getCalendar({initDate: _initDate, endDate: _endDate}));
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
            	Resource.update({ id: appointment._id }, {
                    initDate: appointment.initDate,
                    endDate: appointment.endDate,
                    pet: appointment.pet._id,
                    vet: appointment.vet,
                    note: appointment.note
                }, (data) => {
                	_refresh();
                });
            } else { // SAVE
            	Resource.save({}, {
            		initDate: appointment.initDate,
                    endDate: appointment.endDate,
                    pet: appointment.pet._id,
                    vet: appointment.vet,
                    note: appointment.note
                }, (data) => {
                    _refresh();
                });
            }

        }
        
        this.delete = function (appointment) {
        	Resource.delete({ id: appointment._id }, () => {
                //const index = $scope.customer.data.indexOf(customer);
                //$scope.customer.data.splice(index, 1);
            });
        }
        
    });