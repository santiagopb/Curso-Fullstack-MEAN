'use strict';

angular.module('petStore')
    .config(function(
    	$resourceProvider,
        $locationProvider,
        $routeProvider
    ){
    	$resourceProvider.defaults.stripTrailingSlashes = false;
        $locationProvider.html5Mode({ enabled: true });
        $routeProvider
        .when("/",{template: "<index></index>"})
        .when("/clientes",{template: "<customer-list customer='customer'></customer-list>"})
        .when("/clientes/nuevo",{template: "<customer-edit></customer-edit>"})
        .when("/clientes/:id",{template: "<customer-edit></customer-edit>"})
        .when("/mascotas",{template: "<pet-list pet='pet'></pet-list>"})
        .when("/mascotas/nuevo",{template: "<pet-edit></pet-edit>"})
        .when("/mascotas/:id",{template: "<pet-edit></pet-edit>"})
        .when("/veterinarios", {template: "<vet-list></vet-list>"})
        .when("/veterinarios/nuevo", {template: "<vet-edit></vet-edit>"})
        .when("/veterinarios/:id", {template: "<vet-edit></vet-edit>"})
        .when("/calendario",{template: "<appointment-by-month></appointment-by-month>"})
        .otherwise({template: "Other"});
    });