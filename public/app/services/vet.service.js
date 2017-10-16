'use strict';

angular.module('vet', ['vetFactory'])
    .service('vetService', function(vetResource, $resource) {
    
        var vet = {};

        vetResource.query(function (data) {
            console.log(data);
            vet.data = data;    
        });

        this.getVet = function () {
            return vet.data;
        };



    /*****************************************************************
     * Vet
     *****************************************************************/
    /*this.vetService.query(function (data) {
        $scope.vet.data = data;
    });
    $scope.vet.save = function (vet) {
        if (vet._id) { // PUT
            vetService.update({ id: vet._id }, { name: vet.name }, (data) => {
                const ObjIndex = $scope.vet.data.findIndex((obj => obj._id == vet._id));
                $scope.vet.data[ObjIndex].name = vet.name;
            });
        } else { // SAVE
            vetService.save({}, { name: vet.name }, (data) => {
                $scope.vet.data.unshift(data);
            });
        }

    }
    $scope.vet.get = function (id) {
        return vetService.get({ id: id });
    }
    $scope.vet.delete = function (vet) {
        vetService.delete({ id: vet._id }, () => {
            const index = $scope.vet.data.indexOf(vet);
            $scope.vet.data.splice(index, 1);
        });
    }*/
    /*****************************************************************
     * Vet
     *****************************************************************/


    });