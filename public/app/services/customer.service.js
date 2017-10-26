'use strict';

angular.module('customerService', ['customerResource', 'rx'])
    .service('customerService', function(customerResource) { 	

        var customerSource =  new Rx.BehaviorSubject(Rx.Observable.fromPromise(customerResource.query()));
        var customer = customerSource.asObservable();
        this.customer = customer;
        //Rx.Observable.fromPromise(customerResource.query());
        //.do(function(pilots){ cache.pilots = pilots; }); 
        //Rx.BehaviorSubject(); 
        //	Rx.Observable.fromPromise(customerResource.query());


        /*****************************************************************
         * Customer
         *****************************************************************/
        
        //customer.next(Rx.Observable.fromPromise(customerResource.query()));
        //customer.next();
        customerResource.query(function (data) {
        	//this.customerSource.next(data);
        });
        
        this.query = function() {
        	return customer;
        }
        
        this.get = function (id) {
        	return customer.find(function (obj) { return obj._id === id; });
        }
        
        
        /*
        $scope.customer.get = function (id) {
            return customerFactory.get({ id: id });
        }
        $scope.customer.save = function (customer) {
            if (customer._id) { // PUT
            	customerFactory.update({ id: customer._id }, {
                    dni: customer.dni,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phone: customer.phone,
                    email: customer.email,
                    note: customer.note
                }, (data) => {
                    const ObjIndex = $scope.customer.data.findIndex((obj => obj._id == customer._id));
                    $scope.customer.data[ObjIndex].dni = customer.dni;
                    $scope.customer.data[ObjIndex].firstName = customer.firstName;
                    $scope.customer.data[ObjIndex].lastName = customer.lastName;
                    $scope.customer.data[ObjIndex].phone = customer.phone;
                    $scope.customer.data[ObjIndex].email = customer.email;
                    $scope.customer.data[ObjIndex].note = customer.note;
                    Materialize.toast('Los datos del Cliente se han guardado con exito!!!', 4000, 'rounded');
                });
            } else { // SAVE
            	customerFactory.save({}, {
                    dni: customer.dni,
                    firstName: customer.firstName,
                    lastName: customer.lastName,
                    phone: customer.phone,
                    email: customer.email,
                    note: customer.note
                }, (data) => {
                    $scope.customer.data.unshift(data);
                    Materialize.toast('Los datos del Cliente se han guardado con exito!!!', 4000, 'rounded');
                });
            }

        }
        $scope.customer.delete = function (customer) {
        	customerFactory.delete({ id: customer._id }, () => {
                const index = $scope.customer.data.indexOf(customer);
                $scope.customer.data.splice(index, 1);
            });
        }
*/
    });