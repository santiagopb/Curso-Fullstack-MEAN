'use strict';

angular.module('customerDetails', [])
    .component('customerDetails', {
        templateUrl:'/app/customer-details/customer-details.html',
        bindings: {
            customer: '=',
            item: '='
        },
        controller: function($scope, $routeParams) {
        	$scope.hello = {message: "hola" };
            $scope.back = () => {
                window.history.back();
            }
        }
    }).directive('myMessage', function() {
    	     return {
    		       link: function(scope, element) {
    		         scope.$watch('hello.message', function(newVal, oldVal) {
    		           //if(oldVal !== newVal) return;
    		 
    		           ReactDOM.render(
    		         		  Hello({name: scope.hello.message}), // componente + props
    		         		  document.getElementById('output') // element
    		           );
    		         });
    		       }
    	     }
    });
