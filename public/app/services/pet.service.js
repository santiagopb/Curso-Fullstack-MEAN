'use strict';

angular.module('petService', ['petResource'])
    .service('petService', function (petResource) {

        var perSource = new Rx.BehaviorSubject(petResource.query());
        var pet = perSource.asObservable();
        this.pet = pet;

        /*****************************************************************
         * Pet
         *****************************************************************/
        this.query = function() {
            return pet;
        }
        
        this.get = function (id) {
        	return pet.find(function (obj) { return obj._id === id; });
        }
        /*
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
            //petService.upload({ id: pet._id }, {
            //    photoUrl: pet.photoUrl
            //}, (data)=>{
            //    console.log('ok');
            //}, (err) => {
            //    console.log('err')
            //});
        }
    */

    });