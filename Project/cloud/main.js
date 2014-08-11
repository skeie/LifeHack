
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("getMunke", function(request, response){
	Parse.Cloud.httpRequest({
		url: 'http://reisapi.ruter.no/StopVisit/GetDepartures/3010625',
		success: function(httpResponse) {
			response.success(httpResponse.text);

		},
		error: function(httpResponse) {
			var failer = new Array();
			failer[0] = "fail";
			failer[1] = httpResponse.status;
			response.success(failer);
		}
	});

});


Parse.Cloud.define("getHarald", function(request, response){
	Parse.Cloud.httpRequest({
		url: 'http://reisapi.ruter.no/StopVisit/GetDepartures/3010627',
		success: function(httpResponse) {
			response.success(httpResponse.text);

		},
		error: function(httpResponse) {
			var failer = new Array();
			failer[0] = "fail";
			failer[1] = httpResponse.status;
			response.success(failer);
		}
	});
});

	Parse.Cloud.define("getWeather", function(request, response){
		Parse.Cloud.httpRequest({
			url:'http://www.yr.no/sted/Norge/Oslo/Oslo/Oslo/varsel.xml',
			success: function(httpResponse) {
				response.success(httpResponse.text);

			},
			error: function(httpResponse) {
				var failer = new Array();
				failer[0] = "fail";
				failer[1] = httpResponse.status;
				response.success(failer);
			}
		});
	});


	