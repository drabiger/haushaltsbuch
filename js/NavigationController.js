define(['app'], function(app) {
	
  app.controller('NavigationController', function NavigationController($scope) {
  	var topLevelPages = ['addExpense', 'detailList', 'summary'];
  	var currentTopLevelPage = topLevelPages[0];
    $scope.appTitle = document.title;

    $scope.getAddExpenseInclude = function() {
      if($scope.showAddExpense() == true) {
        return 'addExpense.html';
      } else {
        return '';
      }
    };

  	$scope.showAddExpense = function() {
  		console.log("in show add expense");
  		return currentTopLevelPage === topLevelPages[0];
  	};

  	$scope.showDetailList = function() {
  		return currentTopLevelPage === topLevelPages[1];
  	};

    $scope.getDetailListInclude = function() {
      if($scope.showDetailList() == true) {
        return 'detailTable.html';
      } else {
        return '';
      }
    };

  	$scope.showSummary = function() {
  		return currentTopLevelPage === topLevelPages[2];
  	};

    $scope.getSummaryInclude = function() {
      if($scope.showSummary() == true) {
        return 'summary.html';
      } else {
        return '';
      }
    };

  	$scope.handleAddExpense = function($event) {
  		currentTopLevelPage = topLevelPages[0];
  		removeAndAddActiveClassToNavigation($event);
  		console.log("add expense called");
  	};

  	$scope.handleDetailList = function($event) {
  		currentTopLevelPage = topLevelPages[1];
  		removeAndAddActiveClassToNavigation($event);
  		console.log("detailList called");
  	};

  	$scope.handleSummary = function($event) {
  		currentTopLevelPage = topLevelPages[2];
  		removeAndAddActiveClassToNavigation($event);
  		console.log("summary called");
  	};

  	var removeAndAddActiveClassToNavigation = function($event) {
  		var activeDiv = $(".nav li.active");
  		activeDiv.removeClass("active");
  		angular.element($event.currentTarget.closest('li')).addClass("active");
  	};
  });
});