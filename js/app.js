define(['angular', 'uibootstrap'], function (angular, uiBootstrap) {
  var app = angular.module('myApp', ['ui.bootstrap']);

  app.controller('ExpensesController', function ExpensesController($scope) {
  	$scope.expenses = [
  		{ amount: '50.0', payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
  		{ amount: '42.0', payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
  		{ amount: '101', payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"}
  	];
  });

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

  app.init = function () {
    angular.bootstrap(document, ['myApp']);
  };
  
  return app;
});
