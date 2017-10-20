'use strict';

angular.module('petStore')
    .config(function(
        $locationProvider,
        $routeProvider
    ){
        $locationProvider.html5Mode({ enabled: true });
        $routeProvider
        .when("/",{template: "<index></index>"})
        .when("/clientes",{template: "<customer-list customer='customer'></customer-list>"})
        .when("/clientes/nuevo",{template: "<customer-new customer='customer' pet='pet'></customer-new>"})
        .when("/clientes/:id",{template: "<customer-edit customer='customer' pet='pet'></customer-edit>"})
        .when("/mascotas",{template: "<pet-list pet='pet'></pet-list>"})
        .when("/mascotas/nuevo",{template: "<pet-new pet='pet' customer='customer'></pet-new>"})
        .when("/mascotas/:id",{template: "<pet-edit pet='pet' customer='customer'></pet-edit>"})
        .when("/veterinarios", {template: "<vet-list vet='vet'></vet-list>"})
        .when("/veterinarios/nuevo", {template: "<vet-new vet='vet'></vet-new>"})
        .when("/veterinarios/:id", {template: "<vet-edit vet='vet'></vet-edit>"})
        .when("/calendario",{template: "<appointment-calendar></appointment-calendar>"})
        .otherwise({template: "Other"});
    });