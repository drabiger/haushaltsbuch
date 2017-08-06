define(['app'], function(app) {

	app.factory('expenseService', function() {
	  	var addExpenseListeners = new Map();

	  	var addExpense = function(payer, amount, shop, date, successCallback) {
	  		
	  		var success = false;
	  		var operationMessage;
	  		if(!(parseFloat(amount) > 0)) {
	  			operationMessage = "Betrag muss positiv sein."
	  		} else {
	  			success = true;
	  			operationMessage = amount + "€ für " + payer + " eingetragen.";
	  		}

	  		if(successCallback) {
		  		addExpenseListeners.forEach(function(callback, listener, mapObj) {
		  			callback(payer, amount, shop, date);
		  		});
	  			successCallback(success, operationMessage);
	  		}

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

});
