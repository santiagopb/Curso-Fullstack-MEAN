'use strict';

angular.module('petUploadFile', [])
    .component('petUploadFile', {
        templateUrl:'/app/pet-edit/pet-details/pet-upload-file/pet-upload-file.html',
        bindings: {
            pet: '=',
            item: '='
        },
        controller: function($scope) {
            $scope.photoUrl;
        }
    });