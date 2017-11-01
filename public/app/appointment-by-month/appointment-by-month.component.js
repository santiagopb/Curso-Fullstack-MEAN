'use strict';

angular.module('appointmentByMonth', ['appointmentService'])
    .component('appointmentByMonth', {
        templateUrl: '/app/appointment-by-month/appointment-by-month.html',

        controller: function (appointmentService, $scope, $location) {
            $scope.daySelected;
            $scope.hour = {};
            $scope.date = {};
            $scope.calendar = []
            $scope.weekdayNames = Array(7).fill(0).map((_, i) => {
                return moment(i, 'e').format('dddd');
            });
            $scope.back = () => { window.history.back(); }
            var appointmentSubscription;

            this.$onInit = () => {
                $scope.selectMonth(new Date());
                $('.modal').modal()
            }

            $scope.selectDay = (date, value) => {
                $scope.daySelected = { date: date, value: value };
            }

            $scope.selectMonth = (date) => {
                date = moment(date, 'YYYYMM');
                $scope.date = getDate(date);
                this.appointmentSubscription = appointmentService.getCalendar($scope.date.current, $scope.date.next).subscribe((subscription) => {
                    subscription.$promise.then((appointments) => {
                        appointments = appointments.reduce(function (mapa, item) {
                            var date = moment(item.initDate).format('YYYY-MM-DD');
                            var time = moment(item.initDate).format('HH:mm');
                            if (!mapa) var mapa = {};
                            if (!mapa[date]) mapa[date] = {};
                            if (!mapa[date][time]) mapa[date][time] = item;
                            return mapa;
                        }, {})
                        $scope.calendar = getCalendar(appointments, date);
                    });
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
                var endWeek = moment(date).endOf('month').week();
                endWeek = endWeek == 1 ? 53 : endWeek; // Gregorian calendar (Some times 31 Dic = first week on next year)
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
                            value: db[thisDate],
                            cant: db[thisDate] ? Object.keys(db[thisDate]).length : 0,
                            isValid: isValid
                        }
                    }));
                }
                return calendar;
            }

            $scope.$on("saveItem", function (evt, appointment) {
                /**
                 * The ERROR - binding data between components
                 */
                $scope.$broadcast("changeCalendarByDay", appointment)
            });

            this.$onDestroy = () => {
                /**
                 * Unsubscribe the old way
                 * now (dispose became unsubscribe in RxJS5)
                 */
                this.appointmentSubscription.dispose();
            }
        }
    });
