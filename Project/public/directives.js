	var mod = angular.module('response', []);
	
	mod.config(function ( $httpProvider) {
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}).factory('featuresData', function ($http) {
		return{          
			doCrossDomainGet: function() {
				return $http({
					url: 'http://reisapi.ruter.no/Place/GetStopsByLineID/37',
					method: 'GET'
				})
			}        
		}
	});


	mod.service('userService', function($http){
		this.restAPI = function() {

			$http({
				method: 'GET',
				crossDomain: true,
				url: 'http://reisapi.ruter.no/Place/GetStopsByLineID/37'+ '?callback=JSON_CALLBACK',
			}).success(function(data, status) {
				console.log(status);

			}).error(function(data, status) {
				console.log("fail")

			});






		};

	});