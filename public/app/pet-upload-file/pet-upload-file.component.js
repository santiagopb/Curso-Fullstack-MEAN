'use strict';

angular.module('petUploadFile', [])
    .component('petUploadFile', {
        templateUrl:'/app/pet-upload-file/pet-upload-file.html',
        bindings: {
            pet: '=',
            item: '='
        },
        controller: function($scope) {
            $scope.photoUrl;
        }
    });