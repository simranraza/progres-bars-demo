'use strict';

/* Services */

(function() {
    var itemsFactory = function($http) {
    
        var factory = {};
        
        factory.getItemsList = function() {
            return $http.get('https://pb-api.herokuapp.com/bars').success (function(data){
				
				console.log('from http service' + data);
				return data;
			});
        };
		
		factory.getItemDetail = function(){
			return $http.get('https://pb-api.herokuapp.com/bars').success (function(data){
				
				console.log('from http service 2' + data);
				return data;
			});
		};
              
        return factory;
    };
    
    itemsFactory.$inject = ['$http'];
        
    angular.module('optusassignment').factory('itemsFactory', 
                                           itemsFactory);
                                           
}());

