define(['app'], function(app) {
	
  app.controller('ExpensesController', ['$scope', 'expenseService', function ExpensesController($scope, expenseService) {
    $scope.expenses = [
      { amount: parseFloat('50.0'), payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
      { amount: parseFloat('42.0'), payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
      { amount: parseFloat('101'), payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"},
      { amount: parseFloat('50.0'), payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
      { amount: parseFloat('42.0'), payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
      { amount: parseFloat('101'), payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"},
      { amount: parseFloat('50.0'), payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
      { amount: parseFloat('42.0'), payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
      { amount: parseFloat('101'), payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"}
    ];

    var sumFlash = 0;
    var sumNanaka = 0;

    var calcSums = function() {
      $.each($scope.expenses, function(index, expense) {
        if(expense.payer === "Flash") {
          sumFlash += expense.amount;
        } else {
          if(expense.payer === "Nanaka") {
            sumNanaka += expense.amount;
          }
          else {
            alert('Error in data, payer unknown.');
          }
        }
      });
    };
    calcSums();

    $scope.getSumFlashAnNanaka = function() {
      if(sumFlash > sumNanaka || sumNanaka == sumFlash) {
        return 0;
      } else {
        return ((sumNanaka - sumFlash)/2).toFixed(2);
      }
    };

    $scope.getSumNanakaAnFlash = function() {
      if(sumNanaka > sumFlash || sumNanaka == sumFlash) {
        return 0;
      } else {
        return ((sumFlash - sumNanaka)/2).toFixed(2);
      }
    };

    $scope.getFlashPerc = function() {
      return Math.round((100*sumFlash)/(sumFlash+sumNanaka));
    };

    $scope.getNanakaPerc = function() {
      return Math.round((100*sumNanaka)/(sumFlash+sumNanaka));
    };

    expenseService.registerAddExpenseListener(this, function(payer, amount, shop, date) {
        console.log("ExpenseController: got callback add expense listener, amount=", amount);
        $scope.expenses.push({amount: amount, payer: payer, shop: shop, date: date});
    });

  }]);

});