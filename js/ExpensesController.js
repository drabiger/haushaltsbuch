define(['app'], function(app) {
	
  app.controller('ExpensesController', function ExpensesController($scope) {
    $scope.expenses = [
      { amount: '50.0', payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
      { amount: '42.0', payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
      { amount: '101', payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"},
      { amount: '50.0', payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
      { amount: '42.0', payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
      { amount: '101', payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"},
      { amount: '50.0', payer: "Flash", shop: "Aldi", date: "23. Mai 1974"},
      { amount: '42.0', payer: "Nanaka", shop: "Edeka", date: "24. März 1983"},
      { amount: '101', payer: "Nanaka", shop: "Pflanzenhof", date: "22. September 2010"}
    ];
  });
  
});