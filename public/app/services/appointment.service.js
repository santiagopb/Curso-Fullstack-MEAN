'use strict';

angular.module('appointmentService', ['rx'])
    .service('appointmentService', function($resource, $q) { 	
        var Resource = $resource('/api/appointments/:id', {}, {
            query: {
                method: 'GET',
                params: {},
                isArray: true,
                cache: true
            },
            update: { 
                method:'PUT'
            },
            getByPetId: {
                method: 'GET',
                params: {id: "@id"},
                isArray: true,
                url:'/api/pets/:id/appointments'
            },
            getCalendar: {
                method: 'GET',
                params: {initDate: "@initDate", endDate: "@endDate"},
                isArray: true,
                url: '/api/appointments/:initDate/:endDate'
            }
        })

    	var _initDate = moment(new Date).format('YYYYMMDD');
        var _endDate = moment(new Date).format('YYYYMMDD');
        

    	var appointmentSource = new Rx.BehaviorSubject(Resource.getCalendar({initDate: _initDate, endDate: _endDate}));
    	var appointmentList = appointmentSource.asObservable();
    	
    	this.getCalendar = function  (initDate, endDate) {
            appointmentSource.onNext(Resource.getCalendar({initDate: initDate, endDate: endDate}));
    		return appointmentList;
        }
        
        this.getByPetId = function(id) {
            return Resource.getByPetId({id: id});
        }
    	
    	this.save = function (appointment) {
            var d = $q.defer();
            if (appointment._id) { // PUT
            	Resource.update({ id: appointment._id }, {
                    initDate: appointment.initDate,
                    endDate: appointment.endDate,
                    pet: appointment.pet._id,
                    vet: appointment.vet,
                    note: appointment.note,
                    __v: appointment.__v
                }, (data) => {
                    d.resolve (data);
                }, (err) => {
                    d.reject(err);
                });
            } else { // SAVE
            	Resource.save({}, {
            		initDate: appointment.initDate,
                    endDate: appointment.endDate,
                    pet: appointment.pet._id,
                    vet: appointment.vet,
                    note: appointment.note
                }, (data) => {
                    d.resolve (data);
                }, (err) => {
                    d.reject(err);
                });
            }
            return d.promise;
        }
        
        this.delete = function (appointment) {
            var d = $q.defer();
        	Resource.delete({ id: appointment._id }, (data) => {
                d.resolve(data);
            }, (err) => {
                d.reject(err);
            });
            return d.promise;
        }
        

        /************************************************
         * SOCKET IO
         ***********************************************/
        this.socketPost = (appointment) => {
            appointmentList.source.value.unshift(appointment);
            appointmentSource.onNext(appointmentList.source.value)
        }
        this.socketPut = (appointment) => {
            const ObjIndex = appointmentList.source.value.findIndex((obj) => obj._id == appointment._id);
            appointmentList.source.value[ObjIndex].initDate = appointment.initDate; 
            appointmentList.source.value[ObjIndex].endDate = appointment.endDate;
            appointmentList.source.value[ObjIndex].pet = appointment.pet;
            appointmentList.source.value[ObjIndex].vet = appointment.vet;
            appointmentList.source.value[ObjIndex].note = appointment.note;
            appointmentList.source.value[ObjIndex].__v = appointment.__v;;
            appointmentSource.onNext(appointmentList.source.value);
        }
        this.socketDelete = (id) => {
            const ObjIndex = appointmentList.source.value.findIndex((obj) => obj._id == id);
            appointmentList.source.value.splice(ObjIndex, 1);
            appointmentSource.onNext(appointmentList.source.value);
        }

    });