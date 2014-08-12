		var app = angular.module('myApp.service',[]);
		
		app.factory('DataSource', ['$http',function($http){
			return {
				get: function(file,callback,transform){
					$http.get(
						file,
						{transformResponse:transform}
						).
					success(function(data, status) {
						console.log("Request succeeded");
						callback(data);
					}).
					error(function(data, status) {
						console.log("Request failed " + status);
					});
				}
			};

		}]);


		app.factory('Ruter', function() {
			Parse.initialize("Rx67zlod2jho1hBEbPVPQ1okFW8P4jDM9eEsHWsL", "VGJLUMyFzjYB2406OBDd7EwJrEPdM3yVyA235QKg");	

			var factory = {};

			factory.Harald =  Parse.Cloud.run('getHarald',{});
			factory.Munke =  Parse.Cloud.run('getMunke',{});
			return factory;

		});

		app.factory('YR', function() {
			return Parse.Cloud.run('getWeather', {});

		})





