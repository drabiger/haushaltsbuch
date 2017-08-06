define(['angular', 'uibootstrap'], function (angular, uiBootstrap) {
  var app = angular.module('myApp', ['ui.bootstrap']);

  app.factory('expenseService', function() {
  	var addExpenseListeners = new Map();

  	var addExpense = function(payer, amount, shop, date) {
  		addExpenseListeners.forEach(function(callback, listener, mapObj) {
	  			callback(payer, amount, shop, date);
	  		});
  		
  		return;
  	};

  	var registerAddExpenseListener = function(controller, callback) {
  		console.log("expenseService.registeraddExpenseListeners called by ", controller);
  		addExpenseListeners.set(controller, callback);
  	};

  	return {
  		addExpense : addExpense,
  		registerAddExpenseListener : registerAddExpenseListener
  	};

  });

  app.init = function () {
    angular.bootstrap(document, ['myApp']);
  };
  
  return app;
});
