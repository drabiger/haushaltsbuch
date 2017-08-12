define(['app', 'gapi'], function(app) {

	app.factory('expenseService', function() {
	  	var addExpenseListeners = new Map();

	  	var expenses;

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
	  		if(addExpenseListeners.has(controller)) {
	  			console.log("expenseService.registeraddExpenseListeners: listener already registered.");
	  		} else {
	  			addExpenseListeners.set(controller, callback);
	  		}
	  	};


	  	var createExpense = function(payer, amount, shop, date) {
	  		return {
	  			payer: payer,
	  			amount: amount,
	  			shop: shop,
	  			date: date
	  		};
	  	};

	  	var getExpenses = function() {
	  		return expenses;
	  	};

	  	var getExpensesFromGoogle = function() {
	  		console.log("getListOfExpenses() called");
	  		if(typeof expenses != 'undefined') {
	  			return;
	  		}

	        gapi.client.sheets.spreadsheets.values.get({
	          spreadsheetId: '1hD2tnAnriHpDRhhVwOTfB-zuTfCOsOFCrdZF2DmizsY',
	          range: 'Ausgaben!A2:E',
	          valueRenderOption: 'UNFORMATTED_VALUE'
	        }).then(function(response) {
	        	console.log("got list of expenses from speadsheet");
	        	var result = new Array;
				var range = response.result;
				if (range.values.length > 0) {
					for (i = 0; i < range.values.length; i++) {
					  var row = range.values[i];
					  // Print columns A and E, which correspond to indices 0 and 4.
					  result.push(createExpense(row[1], row[0], row[2], row[3]));
					}
				} else {
					console.log("getExpensesFromGoogle: No data in spreadsheet.")
				}
				expenses = result;
	        }, function(response) {
				console.log('Error: ' + response.result.error.message);
	        });
	  	};

	  	var getShops = function() {
	  		var shops = new Set();
	  		for (var i = 0; i < expenses.length; ++i) {
				shops.add(expenses[i].shop);
			}
			return Array.from(shops).sort();	  		
	  	};

	  	return {
	  		addExpense : addExpense,
	  		getExpensesFromGoogle : getExpensesFromGoogle,
	  		getExpenses : getExpenses,
	  		getShops : getShops,
	  		registerAddExpenseListener : registerAddExpenseListener
	  	};

  	});

});
