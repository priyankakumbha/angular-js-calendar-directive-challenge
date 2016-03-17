angular.module('calendarDemoApp', []);
	.directive( 'calendar', function () {
		return {
			restrict   : 'E',
			templateUrl: 'calendar-template.html',
			controller : 'calendarCtrl'
		}
	} )
	.controller( 'calendarCtrl', function ($scope, $element, $attrs) {

		// Set variables
		var date = new Date();
		var currentMonth = date.getMonth();
		var currentYear = date.getFullYear();
		var startYear = date.getFullYear() - 20;
		var endYear = date.getFullYear() + 20;

		// create month array
		$scope.monthNames = [
			{id: 0, name: 'January'},
			{id: 1, name: 'February'},
			{id: 2, name: 'March'},
			{id: 3, name: 'April'},
			{id: 4, name: 'May'},
			{id: 5, name: 'June'},
			{id: 6, name: 'July'},
			{id: 7, name: 'August'},
			{id: 8, name: 'September'},
			{id: 9, name: 'October'},
			{id: 10, name: 'November'},
			{id: 11, name: 'December'},
		];

		// create year array based on date selected
		$scope.yearArray = [];
		for (var start = +startYear, end = +endYear;
			 start <= end; start++) {
			$scope.yearArray.push( start );
		}

		// set year, month, year in drop down
		$scope.selectedMonth = currentMonth;
		$scope.selectedYear = currentYear;

		// render calendar on change
		$scope.refresh = function () {
			currentMonth = $scope.selectedMonth;
			$scope.renderCalendar( $scope.selectedYear, $scope.selectedMonth );
		};

		// go back to today's date
		$scope.setToday = function () {
			currentMonth = date.getMonth();
			currentYear = date.getFullYear();
			$scope.selectedMonth = currentMonth;
			$scope.selectedYear = currentYear;
			$scope.renderCalendar( currentYear, currentMonth );
		};

		// render calendar
		$scope.renderCalendar = function (year, month) {
			$scope.range = CalendarRange.getMonthlyRange( new Date( year, month ) );
			$scope.range.days.forEach( changeDayClass );
		}

		// set appropriate class for previous and next months
		function changeDayClass(element) {
			if ((element.month < date.getMonth() || element.month > date.getMonth())) {
				element.dayClass = 'outside';
			} else if (element.month == date.getMonth() && (element.year < date.getFullYear() || element.year > date.getFullYear())) {
				element.dayClass = 'outside';
			} else {
				element.dayClass = '';
			}

			if (element.day == date.getDate() && element.month == date.getMonth() && element.year == date.getFullYear()) {
				element.dayClass += 'today';
			}
		}

		// display calendar
		$scope.renderCalendar( currentYear, currentMonth );
	} )

