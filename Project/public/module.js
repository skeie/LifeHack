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

		app.factory('Harald', function() {
			Parse.initialize("Rx67zlod2jho1hBEbPVPQ1okFW8P4jDM9eEsHWsL", "VGJLUMyFzjYB2406OBDd7EwJrEPdM3yVyA235QKg");	
			return {
				Harald:function() {
					return Parse.Cloud.run('getHarald',{});
				}
			};	

		});


		app.factory('Munke', function() {
			Parse.initialize("Rx67zlod2jho1hBEbPVPQ1okFW8P4jDM9eEsHWsL", "VGJLUMyFzjYB2406OBDd7EwJrEPdM3yVyA235QKg");	
			return {
				Munke:function() {
					return Parse.Cloud.run('getMunke',{});
				}
			};
		});




