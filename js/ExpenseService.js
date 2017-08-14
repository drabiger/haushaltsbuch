define(['app', 'gapi'], function(app) {

	app.factory('expenseService', function() {
	  	var addExpenseListeners = new Map();

	  	var expenses;

	  	var addExpense = function(payer, amount, shop, date, successCallback) {
	  		
	  		var success = false;
	  		var operationMessage;
	  		if(!(parseFloat(amount) > 0)) {
	  			operationMessage = "Betrag muss positiv sein.";
	  		} else if(payer != "Flash" && payer != "Nanaka") {
	  			operationMessage = "Person ist unbekannt.";
	  		} else {
	  			var newExpense = createExpense(payer, amount, shop, date);
		  		addExpenseToGoogle(newExpense, function(googleSuccess, response) {
		  			if(googleSuccess) {
		  				success = true;
			  			operationMessage = amount + "€ für " + payer + " eingetragen.";
			  			expenses.push(newExpense);
		  			} else {
		  				success = false;
		  				operationMessage = 'error inserting row: ' + response.result.error.message;
		  			}
			  		addExpenseListeners.forEach(function(callback, listener, mapObj) {
			  			callback(payer, amount, shop, date);
			  		});
			  		if(successCallback) {
			  			successCallback(success, operationMessage);
			  		}
		  		});
		  		return;
	  		}
	  		if(successCallback) {
	  			successCallback(success, operationMessage);
	  		}
	  		return;
	  	};

	  	var addExpenseToGoogle = function(expense, successCallback) {
	  		var params = {
	  			spreadsheetId : '1hD2tnAnriHpDRhhVwOTfB-zuTfCOsOFCrdZF2DmizsY',
	  			range: 'Ausgaben!A2:E',
	  			valueInputOption: 'USER_ENTERED',
	  			insertDataOption: 'INSERT_ROWS'
	  		};

	  		var valueRangeBody = {
	  			"range": "Ausgaben!A2:E",
	  			"majorDimension": "ROWS",
	  			values: [ [expense.amount, expense.payer, expense.shop, expense.date, "FALSE"] ]
	  		};

			var request = gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
			      request.then(function(response) {
			      	successCallback(true, response);
			        // TODO: Change code below to process the `response` object:
			        console.log("Inserted row. Response: " + response.result);
			      }, function(reason) {
			      	successCallback(false, reason);
			        console.error('error inserting row: ' + reason.result.error.message);
			      });

	  	};

	  	var registerAddExpenseListener = function(controller, callback) {
	  		console.log("expenseService.registeraddExpenseListeners called by ", controller);
	  		if(addExpenseListeners.has(controller)) {
	  			console.log("expenseService.registeraddExpenseListeners: listener already registered.");
	  		} else {
	  			addExpenseListeners.set(controller, callback);
	  		}
	  	};


	  	var addDate = function(originalDate, days) {
	  		return originalDate.setDate(originalDate.getDate() + days);
	  	};

	  	var createExpense = function(payer, amount, shop, date) {
	  		if(date instanceof Date) {
	  			dateStr = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
	  		} else if(typeof(date) == 'number') {
	  			var newDate = new Date(addDate(new Date("1899-12-30"), date));
	  			dateStr = newDate.getFullYear() + "-" + (newDate.getMonth()+1) + "-" + newDate.getDate();
	  		} else {
	  			dateStr = date;
	  		}
	  		return {
	  			payer: payer,
	  			amount: amount,
	  			shop: shop,
	  			date: dateStr
	  		};
	  	};

	  	var getExpenses = function() {
	  		return expenses;
	  	};

	  	var getExpensesFromGoogle = function(successCallback) {
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
				if(successCallback) {
					successCallback(true);
				}

	        }, function(response) {
				console.log('Error: ' + response.result.error.message);
				if(successCallback) {
					successCallback(false);
				}
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
