define(['app', 'gapi'], function(app) {
	
  app.controller('UserSessionController', ['$scope', 'expenseService', function UserSessionController($scope, expenseService) {
	// Client ID and API key from the Developer Console
	var CLIENT_ID = '717798422387-m8sdsgknbl7d00l0m6usgf3rd0k756j4.apps.googleusercontent.com';

	// Array of API discovery doc URLs for APIs used by the quickstart
	var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest", "https://sheets.googleapis.com/$discovery/rest?version=v4"];

	// Authorization scopes required by the API; multiple scopes can be
	// included, separated by spaces.
	var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/spreadsheets';

	$scope.loggedIn = false;

	$scope.currentUser = "";

	$scope.googleDataInitialized = false;

	var setUserAuthStatus = function(isSignedIn) {
		console.log("setUserAuthStatus: " + isSignedIn);
		$scope.$apply(function() {
			if(isSignedIn) {
				postAuthenticationActions();
			} else {			
				$scope.loggedIn = false;
				$('#logoutMenu').hide();
			}
		});
	};

	var postAuthenticationActions = function() {
		$('#logoutMenu').show();
		$scope.loggedIn = true;
		$scope.currentUser = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getGivenName();
		expenseService.getExpensesFromGoogle(function(success) {
			if(success) {
				$scope.$apply(function() {
					$scope.googleDataInitialized = true;
				});
			} else {
				alert('Entschuldigung, es gab ein Problem mit den Daten von Google.');
			}
		});
	};

	$scope.logOut = function() {
		gapi.auth2.getAuthInstance().signOut();
		$scope.googleDataInitialized = false;
		$scope.loggedIn = false;
		$scope.currentUser = "";
	};

	$scope.logIn = function() {
		gapi.auth2.getAuthInstance().signIn();
	};

	function handleClientLoad() {
		gapi.load('client:auth2', initClient);
	};

	function initClient() {
        console.log("start initClient()");
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(setUserAuthStatus);

          // Handle the initial sign-in state.
          setUserAuthStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        });
    }

	handleClientLoad();

  }]);
});