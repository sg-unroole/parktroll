'use strict';

var services = angular.module('parktroll.services', []);

services.factory('UserData', ['$http', function($http){
	return {
		reachAPI: function(lat, lng, startTime, endTime) {
			$http.post('http://ourapi.com/', {
				'lat' : lat,
				'lng' : lng,
				'startTime' : startTime,
				'endTime' : endTime
			})
			.success(function(data, status, header, config){
				return data;
			});
		}
	};
}]);