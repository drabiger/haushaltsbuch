define(['app'], function(app) {
	
  app.controller('NavigationController', function NavigationController($scope) {
  	var topLevelPages = ['addExpense', 'detailList', 'summary'];
  	var currentTopLevelPage = topLevelPages[0];

  	$scope.showAddExpense = function() {
  		console.log("in show add expense");
  		return currentTopLevelPage === topLevelPages[0];
  	};

  	$scope.showDetailList = function() {
  		return currentTopLevelPage === topLevelPages[1];
  	};

  	$scope.showSummary = function() {
  		return currentTopLevelPage === topLevelPages[2];
  	};

  	$scope.handleAddExpense = function() {
  		currentTopLevelPage = topLevelPages[0];
  		console.log("add expense called");
  	};

  	$scope.handleDetailList = function() {
  		currentTopLevelPage = topLevelPages[1];
  		console.log("detailList called");
  	};

  	$scope.handleSummary = function() {
  		currentTopLevelPage = topLevelPages[2];
  		console.log("summary called");
  	};
  });
});