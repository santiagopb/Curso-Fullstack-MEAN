'use strict';

angular.module('petStore', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    //Services
    'customer',
    'pet',
    'vet',
    //Directives
    'showDatepicker',
    //Modules
    'menu',
    'index',
    'appointmentCalendar',
    'appointmentByMonth',
    'appointmentByDay',
    'appointmentDetails',
    'customerList',
    'customerNew',
    'customerEdit',
    'customerDetails',
    'customerById',
    'petList',
    'petNew',
    'petEdit',
    'petDetails',
    'petByOwner',
    'petNewByOwner',
    'petUploadFile',
    'vetList',
    'vetNew',
    'vetEdit',
    'vetDetails'
]).controller('appCtrl', function (customerService, petService, $scope) {

    var socket = io.connect('http://localhost:3000', { 'forceNew': true });
    
    socket.on('messages', function(data) {
        console.log(data);
    });

    socket.on('customerPut', function(data) {
        alert(data.message);
    });


    $scope.customer = {};
    $scope.pet = {};
    $scope.vet = {};

    /*****************************************************************
     * Customer
     *****************************************************************/
    customerService.query(function (data) {
        $scope.customer.data = data;
    });
    $scope.customer.get = function (id) {
        return customerService.get({ id: id });
    }
    $scope.customer.save = function (customer) {
        if (customer._id) { // PUT
            customerService.update({ id: customer._id }, {
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
            customerService.save({}, {
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
        customerService.delete({ id: customer._id }, () => {
            const index = $scope.customer.data.indexOf(customer);
            $scope.customer.data.splice(index, 1);
        });
    }

    /*****************************************************************
     * Pet
     *****************************************************************/
    petService.query(function (data) {
        $scope.pet.data = data;
    });
    $scope.pet.get = function (id) {
        return petService.get({ id: id });
    }
    $scope.pet.save = function (pet) {
        if (pet._id) { // PUT
            petService.update({ id: pet._id }, {
                photoUrl: pet.photoUrl,
                name: pet.name,
                birthday: pet.birthday,
                specie: pet.specie,
                race: pet.race,
                chipNumber: pet.chipNumber,
                description: pet.description,
                owner: pet.owner,
            }, (data) => {
                const ObjIndex = $scope.pet.data.findIndex((obj => obj._id == pet._id));
                $scope.pet.data[ObjIndex].photoUrl = pet.photoUrl;
                $scope.pet.data[ObjIndex].name = pet.name;
                $scope.pet.data[ObjIndex].birthday = pet.birthday;
                $scope.pet.data[ObjIndex].specie = pet.specie;
                $scope.pet.data[ObjIndex].race = pet.race;
                $scope.pet.data[ObjIndex].chipNumber = pet.chipNumber;
                $scope.pet.data[ObjIndex].description = pet.description;
                $scope.pet.data[ObjIndex].owner = pet.owner;
                Materialize.toast('Los datos de la Mascota se han actualizado con exito!!!', 4000, 'rounded');
            });
        } else { // SAVE
            petService.save({}, {
                photoUrl: '',
                name: pet.name,
                birthday: pet.birthday,
                specie: pet.specie,
                race: pet.race,
                chipNumber: pet.chipNumber,
                description: pet.description,
                owner: pet.owner
            }, (data) => {
                $scope.pet.data.unshift(data);
                Materialize.toast('Los datos de la Mascota se han guardado con exito!!!', 4000, 'rounded');
            }, (err) => {
                console.log(err);
            });
        }

    }
    $scope.pet.delete = function (pet) {
        petService.delete({ id: pet._id }, () => {
            const index = $scope.pet.data.indexOf(pet);
            $scope.pet.data.splice(index, 1);
        });
    }
    $scope.pet.upload = function (_id, photoUrl) {
        console.log(_id, photoUrl);
        /*petService.upload({ id: pet._id }, {
            photoUrl: pet.photoUrl
        }, (data)=>{
            console.log('ok');
        }, (err) => {
            console.log('err')
        });*/
    }


}).component('app', {
    templateUrl: '/app/app.html',
    controller: 'appCtrl'
});