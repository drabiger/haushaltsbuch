define(['app', 'gapi'], function(app) {

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


	  	var createExpense = function(payer, amount, shop, date) {
	  		return {
	  			payer: payer,
	  			amount: amount,
	  			shop: shop,
	  			date: date
	  		};
	  	};

	  	var getListOfExpenses = function(setterCallback) {
	  		console.log("getListOfExpenses()");
	        gapi.client.sheets.spreadsheets.values.get({
	          spreadsheetId: '1hD2tnAnriHpDRhhVwOTfB-zuTfCOsOFCrdZF2DmizsY',
	          range: 'Ausgaben!A2:E',
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
					console.log("getListOfExpenses: No data in spreadsheet.")
				}
				setterCallback(result);
	        }, function(response) {
				console.log('Error: ' + response.result.error.message);
	        });
	  	};

	  	return {
	  		addExpense : addExpense,
	  		getListOfExpenses : getListOfExpenses,
	  		registerAddExpenseListener : registerAddExpenseListener
	  	};

  	});

});
