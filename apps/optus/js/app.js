'use strict';

/* App Module */

var optusassignment = angular.module('optusassignment', ['ngRoute','ui.bootstrap','ui.router']);

optusassignment.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/test/home', {
        templateUrl: 'views/home.html',
        controller: 'LoginController'
      }).
	  otherwise({
        redirectTo: '/test/home'
      });
  }]);
  
 //////////////////////
 optusassignment.factory('Page', function(){
  var title = 'default';
  return {
    title: function() { 
	console.log('title is : ' + title);
	return title; },
    setTitle: function(newTitle) { title = newTitle; }
  };
});

optusassignment.factory('Bars', function($http){
  
  return {
    
    getBars: function() { 
       
          //return {"buttons":[16,41,-12,-43],"bars":[21,33],"limit":140};
        return $http.get("https://pb-api.herokuapp.com/bars")
            .then(function(response) {
            console.log('response : ' + JSON.stringify(response.data));
            
            return response.data;
        });
    }
  };
});


optusassignment.run(['$window',  function($window) {
 
  //$window.alert('Started!');
}]);




  
