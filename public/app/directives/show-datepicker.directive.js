'use strict';

angular.module('showDatepicker', [])
	.directive('showDatepicker', function () {
		return {
			restrict: "A",
			require: 'ngModel',
			link: function (scope, elem, attrs, ngModel) {
				$('.datepicker').pickadate({
					selectMonths: true, // Creates a dropdown to control month
					selectYears: 30, // Creates a dropdown of 15 years to control year,
					labelMonthNext: 'Mes siguiente',
					labelMonthPrev: 'Mes anterior',
					labelMonthSelect: 'Selecciona un mes',
					labelYearSelect: 'Selecciona un año',
					monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
					monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
					weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
					weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
					weekdaysLetter: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
					today: 'Hoy',
					clear: 'Limpiar',
					close: 'Cerrar',
					closeOnSelect: true 
				});


				if (ngModel) {

					ngModel.$formatters.push(function (value) {
						return moment(value).format('DD-MMMM-YYYY', 'es');
					});
				}

				$('.datepicker').each(function () {
					var elem = $(this);

					// Save current value of element
					elem.data('oldVal', elem.val());
					// Look for changes in the value
					elem.bind("propertychange change click keyup input paste", function (event) {
						// If value has changed...
						if (elem.data('oldVal') != elem.val()) {
							// Updated stored value
							elem.data('oldVal', elem.val());
							var date = moment(elem.val()).format('DD-MMMM-YYYY', 'es');

							/**
							 * 
							 * Hay que implementar la funcion selectDate en el controlador
							 * para hacer los cambios de valor en los bindings correspondientes
							 * y luego notificarlos con la funcion "$scope.$apply()"
							 * 
							 *  $scope.selectDate = function(dateSelected) {
							 *  // Asignar cambios 
							 *  // $scope.$apply();
							 *  }
							 * 
							 */
							scope.selectDate(date);
						}
					});
				})
			}
		}
	});