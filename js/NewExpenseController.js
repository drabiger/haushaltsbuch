define(['app'], function(app) {
	
	app.controller('NewExpenseController', function NewExpenseController($scope) {
	  	$scope.payerOptions = [ "Flash", "Nanaka"];
	  	$scope.selectedPayer;
	  	$scope.expenseDate;
	  	$scope.amount;
	  	$scope.dt;
		$scope.options = {
	    	customClass: getDayClass,
	    	minDate: new Date(),
	    	showWeeks: true
	  	};

	  	$scope.payerSelected = function(item) {
	  		$scope.selectedPayer = item;
	  	};

	  	$scope.addExpense = function() {
	  		alert("got it: " + $scope.dt + ", " + $scope.selectedPayer + ", " + $scope.selectedShop + ", " + $scope.amount);
	  	};

	  	// Shop typeahead
	  	$scope.selectedShop;
	  	$scope.shops = ['Aldi', 'Rewe', 'Sarter', 'Werners', 'Obi', 'Saturn', 'Edeka', 'Kiosk', 'Pflanzenhof', 'Lo Sfizio', 'Oebel', 'Bäcker', 'Flug USA', 'Bahnfahrt Osnabrück'];

	  	// date picker
		$scope.open1 = function() {
			$scope.popup1.opened = true;
		};

		$scope.open2 = function() {
			$scope.popup2.opened = true;
		};

		$scope.setDate = function(year, month, day) {
			$scope.dt = new Date(year, month, day);
		};
		$scope.today = function() {
			$scope.dt = new Date();
		};
		$scope.today();
		$scope.popup1 = {
	    	opened: false
	  	};

	  	$scope.popup2 = {
	    	opened: false
	  	};
	  	var tomorrow = new Date();
	  	tomorrow.setDate(tomorrow.getDate() + 1);
	  	var afterTomorrow = new Date();
	  	afterTomorrow.setDate(tomorrow.getDate() + 1);
	  	$scope.events = [{date: tomorrow,status: 'full'}, { date: afterTomorrow, status: 'partially' }];
	  	function getDayClass(data) {
	    var date = data.date, mode = data.mode;
	    if (mode === 'day') {
	      var dayToCheck = new Date(date).setHours(0,0,0,0);

			for (var i = 0; i < $scope.events.length; i++) {
				var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

				if (dayToCheck === currentDay) {
					return $scope.events[i].status;
				}
			}
	    }

	    return '';
	  }
  	});
  	
});