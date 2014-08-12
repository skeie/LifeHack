var app = angular.module('Ruter',['myApp.service']);

	// create the controller and inject Angular's $scope
	app.controller('mainController', function($scope, $http,$timeout,DataSource, RESTapi) {
		$scope.publicTransport =[];
		$scope.harald = [];
		$scope.munke = [];
		var tempArray = [];
		$scope.weatherData ="";
		$scope.periodeArray =[];
		var weatherArray = [];
		Parse.initialize("Rx67zlod2jho1hBEbPVPQ1okFW8P4jDM9eEsHWsL", "VGJLUMyFzjYB2406OBDd7EwJrEPdM3yVyA235QKg");
		var timeMunke = 1;
		var timeHarald = 1;

		$scope.init = function() {
			initWeatherArray();
			getWeather();
			getHarald();
			getMunke();	

		};

		var xmlTransform = function(data) {
			var x2js = new X2JS();
			var json = x2js.xml_str2json($scope.weatherData);
			$scope.periodeArray[0] =json.weatherdata.forecast.tabular.time[0];
			$scope.periodeArray[1]=json.weatherdata.forecast.tabular.time[1];
			$scope.periodeArray[2]=json.weatherdata.forecast.tabular.time[2];
			$scope.periodeArray[3]=json.weatherdata.forecast.tabular.time[3];
			compareDates($scope.periodeArray[0]);
			compareDates($scope.periodeArray[1]);
			compareDates($scope.periodeArray[2]);
			compareDates($scope.periodeArray[3]);
			
		};

		function showlocation() {
			navigator.geolocation.getCurrentPosition(callback);
		}

		function callback(position) {
			console.log(position.coords.latitude);
			console.log(position.coords.longitude);

		}


		var getMunke = function() {
			console.log(RESTapi);
			console.log(RESTapi.Harald);
			/*
			var promise = RESTapi.Munke();
			promise.then(
				function(ruterInfo) {
					var res = JSON.parse(ruterInfo);
					$scope.munke = res;
					$scope.data();
					$timeout(getMunke,timeMunke);
					timeMunke = 60000;	
				},function(errorInfo){
					console.log(errorInfo);
				});
*/
		};



		var getHarald = function() {
			/*
			var promise = RESTapi.Harald();
			promise.then(
				function(ruterInfo) {
					var res = JSON.parse(ruterInfo);
					$scope.harald = res;
					$scope.data();
					$timeout(getHarald,timeHarald);
					timeHarald = 60000;	
				},function(errorInfo){
					console.log(errorInfo);
				});
*/
		};


		$scope.data = function() {
			$scope.posts = $scope.harald.concat($scope.munke)
				//console.log($scope.posts);
				for (var i = 0; i < $scope.posts.length; i++) {
					var temp = {minutesToArrival:0, destination:"", color:0, DirectionRef:"", line:0};
					var line = $scope.posts[i].MonitoredVehicleJourney.LineRef;
					if(line == 37 || line == 19 || line == 18 || line == 70 || line == 34) {
						temp.minutesToArrival = getDifference($scope.posts[i].MonitoredVehicleJourney.MonitoredCall.ExpectedArrivalTime);
						temp.destination = $scope.posts[i].MonitoredVehicleJourney.DestinationName;
						if(temp.minutesToArrival < 30 && temp.minutesToArrival> 0){
							temp.color= minutes(temp.minutesToArrival); 
							temp.line = line;
							if($scope.posts[i].MonitoredVehicleJourney.DirectionRef === "2") 
								temp.DirectionRef ="City";
							else
								temp.DirectionRef ="Other";	
							tempArray.push(temp);



						}

					}
				}
				$scope.publicTransport = tempArray;
				tempArray = [];

				sortArray();

			}
			var minutes = function (min) {
				if(min < 5)
					return 1
				if(min < 15)
					return 2
				else
					return 3

			}

			var getDifference = function(dt) {
				var currentdate = new Date(); 
				var transportDate = new Date(dt)
				var seconds = Math.round((transportDate-currentdate)/1000);
				var minutes = seconds/60;
				return minutes.toString().split(".")[0];
			};

			var sortArray = function() {
				$scope.publicTransport.sort(function(a,b){
					return (a.minutesToArrival) -  (b.minutesToArrival);
				});


			}


			$scope.appliedClass = function(color, line) {
				if(color === 1){
					if(line == 37){
						return "success";
					}
				}
				if(color === 1)
					return "danger";
				if(color === 2)
					return "success";
				else
					return "active";

			}

			$scope.appliedWeatherClass = function (weatherNr) {
				return weatherArray[weatherNr-1];

			} 





			var getWeather = function() {
				Parse.Cloud.run('getWeather', {}, {
					success: function(result) {
						$scope.weatherData = result;
						xmlTransform();


					},
					error: function(error) {
						console.log("ERROR "+ error);
					}
				})};
				var initWeatherArray = function () {
					weatherArray[0] = "wi wi-day-sunny fa-4x";
					weatherArray[1] = "wi wi-day-cloudy fa-4x";
					weatherArray[2] = "wi wi-day-cloudy fa-4x";
					weatherArray[3] = "wi wi-cloudy fa-4x";
					weatherArray[4] = "wi wi-night-rain-mix fa-4x";
					weatherArray[5] = "wi wi-night-rain-mix fa-4x";
					weatherArray[6] = "wi wi-day-snow-wind fa-4x";
					weatherArray[7] = "wi wi-day-snow-wind fa-4x";
					weatherArray[8] = "wi wi-rain fa-4x";
					weatherArray[9] = "wi wi-rain fa-4x";
					weatherArray[10] = "wi wi-storm-showers fa-4x";
					weatherArray[11] = "wi wi-showers fa-4x";
					weatherArray[12] = "wi wi-snow fa-4x";
					weatherArray[13] = "wi wi-night-snow-thunderstorm fa-4x";
					weatherArray[14] = "wi wi-fog fa-4x";
					weatherArray[15]= "wi wi-day-sunny fa-4x";
					weatherArray[16] = "wi wi-day-cloudy fa-4x";
					weatherArray[17] = "wi wi-day-rain-mix fa-4x";
					weatherArray[18] = "wi wi-day-snow fa-4x";
					weatherArray[19] = "wi wi-day-sleet-storm fa-4x";
					weatherArray[20] = "wi wi-day-snow-thunderstorm fa-4x";
					weatherArray[21] = "wi wi-thunderstorm fa-4x"; 
					weatherArray[22] = "wi wi-thunderstorm fa-4x";

				}

				var compareDates = function(dt) {
					a = new Date(dt._from);
					var today = new Date();
					if(a.getDate() === today.getDate()){
						dt.day ="Today";
						return;
					}
					dt.day ="Tomorrow";

				}

			});




