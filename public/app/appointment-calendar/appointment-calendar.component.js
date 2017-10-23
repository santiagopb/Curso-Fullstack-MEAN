'use strict';

angular.module('appointmentCalendar', ['appointmentService'])
    .component('appointmentCalendar', {
        templateUrl: '/app/appointment-calendar/appointment-calendar.html',

        controller: function (appointmentService, $scope, $location) {
            $scope.date = {};
            $scope.calendar = []
            $scope.calendarDB;
            $scope.weekdayNames = Array(7).fill(0).map((_, i) => {
                return moment(i, 'e').format('dddd');
            });
            $scope.back = () => { window.history.back(); }

            this.$onInit = () => {
                moment.lang('es', { week: { dow: 1 } }); // Monday is the first day of the week.
                $scope.selectMonth(new Date());
            }

            $scope.selectMonth = (date) => {
                date = moment(date, 'YYYYMM');
                
                $scope.date = getDate(date);
                appointmentService.getCalendar($scope.date.current, $scope.date.next)
                    .$promise.then(function (db) {
                        $scope.calendar = getCalendar(db, date);
                    });
            }

            function getDate(date) {
                date.current = moment(date).startOf('month').format('YYYYMMDD');
                date.previous = moment(date).startOf('month').subtract(1, 'M').format('YYYYMMDD');
                date.next = moment(date).startOf('month').add(1, 'M').format('YYYYMMDD');
                date.month = moment(date).format('MMMM');
                date.year = moment(date).format('YYYY') 
                return date;
            }

            function getCalendar(db, date) {
                var calendar = [];
                const startWeek = moment(date).startOf('month').week();
                const endWeek = moment(date).endOf('month').week();

                for (var week = startWeek; week <= endWeek; week++) {
                    calendar.push(Array(7).fill(0).map((n, i) => {
                        var thisDate = moment(date).isoWeek(week).startOf('week').clone().add(n + i, 'day').format('YYYY-MM-DD');
                        var day = moment(thisDate).format('DD');
                        var isValid = true;
                        if ((day > 7 && week == startWeek) || (day < 7 && week == endWeek)) {
                            isValid = false;
                        }
                        return {
                            day: day,
                            date: thisDate,
                            cant: db[thisDate] ? Object.keys(db[thisDate]).length : 0,
                            isValid: isValid
                        }
                    }))
                }

                return calendar;
            }

        }
    });
