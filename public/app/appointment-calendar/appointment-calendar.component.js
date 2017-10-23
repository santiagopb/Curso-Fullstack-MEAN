'use strict';

angular.module('appointmentCalendar', ['appointmentService'])
    .component('appointmentCalendar', {
        templateUrl:'/app/appointment-calendar/appointment-calendar.html',

        controller: function(appointmentService, $scope, $location) {
        	  $scope.date = {};
              $scope.calendar = []
              $scope.calendarDB;
              $scope.back = () => { window.history.back(); }            
              
              this.$onInit = () => {
                  moment.lang('es', { week: { dow: 1 } }); // Monday is the first day of the week.
                  
                  $scope.date = getDate($location.initDate);
                  
                  
                  console.log($scope.date, $scope.date.next)
                  $scope.calendarDB = appointmentService.getCalendar($scope.date.current,  $scope.date.next)
                  	.then(function(data){
                  		$scope.calendar = getCalendar(data);
                  	});
            
              }

              

              function getDate (date = new Object){
                  if (!date){
                      date.current = moment(new Date()).startOf('month').format('YYYYMMDD');
                  } else {
                      date.current = moment(date).startOf('month').format('YYYYMMDD');
                  }
                  date.previous = moment(date).startOf('month').subtract(1, 'M').format('YYYYMMDD');
                  date.next = moment(date).startOf('month').add(1, 'M').format('YYYYMMDD');
                  date.month = moment(date).format('MMMM');
                  return date;
              }
              
              function getCalendar(data) {
                  var calendar = [];
                  const startWeek = moment().startOf('month').week();
                  const endWeek = moment().endOf('month').week();
                  
                  for (var week = startWeek; week <= endWeek; week++) {
                      calendar.push(Array(7).fill(0).map((n, i) => {
                          var date = moment().isoWeek(week).startOf('week').clone().add(n + i, 'day').format('YYYY-MM-DD');
                          var day = date.slice(8,2);
                          return {
                              day: date,
                              cant: day
                          }
                      }))
                  }   
                  
                  return calendar;
              }
        }
    });
