'use strict';

angular.module('petNewByOwner', ['showDatepicker'])
    .component('petNewByOwner', {
        templateUrl:'/app/pet-new-by-owner/pet-new-by-owner.html',
        bindings: {
            pet: '=',
            item: '<'
        },
        controller: function($scope) {
        	/*
        	
        	$('.datepicker').pickadate({
        	    selectMonths: true, // Creates a dropdown to control month
        	    selectYears: 30, // Creates a dropdown of 15 years to control year,
                labelMonthNext: 'Mes siguiente',
                labelMonthPrev: 'Mes anterior',
                labelMonthSelect: 'Selecciona un mes',
                labelYearSelect: 'Selecciona un año',
                monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
                monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
                weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
                weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
                weekdaysLetter: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
                today: 'Hoy',
                clear: 'Limpiar',
                close: 'Cerrar',
        	    closeOnSelect: false // Close upon selecting a date,
        	  });
            */
        }
    });