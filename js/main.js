requirejs.config({
    shim : { 
        // Modules and their dependent modules
        "bootstrap" : { "deps" :['jquery'] },
        "angular" : { exports: 'angular' },
        "uibootstrap" : { "deps" : ['angular']},
        "gapi" : { exports: 'gapi'}
    },
    paths: {
        // Aliases and paths of modules
        "jquery" : "../node_modules/jquery/dist/jquery.min",
        "bootstrap" :  "../node_modules/bootstrap/dist/js/bootstrap.min",
        "angular" : "../node_modules/angular/angular.min",
        "moment" : "../node_modules/moment/min/moment.min",
        "uibootstrap" : "https://cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/2.5.0/ui-bootstrap-tpls.min",
        "angular-animate" : "../node_modules/angular-animate/angular-animate.min",
        "angular-touch" : "../node_modules/angular-touch/angular-touch.min",
        "gapi" : "https://apis.google.com/js/api.js?onload=init"
    }
});

requirejs(['jquery', 'app', 'bootstrap', 'gapi', 'NavigationController', 'UserSessionController', 'NewExpenseController', 'ExpensesController', 'ExpenseService'], function($, app) {
    app.init();
});