'use strict';

/**
 * @ngdoc function
 * @name parktrollApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the parktrollApp
 */
angular.module('parktrollApp')
  .controller('MainCtrl', ['UserData', '$scope', function (UserData, $scope) {
    $scope.userData = UserData;

    //get the current location of the user
    navigator.geolocation.getCurrentPosition(function(position){
    	$scope.userData.lat = position.coords.latitude;
    	$scope.userData.lng = position.coords.longitude;
    });

    //build map
    var marker;
    function initialize() {
    	 var mapOptions = {
	   		zoom: 12,
	   		center: new google.maps.LatLng($scope.userData.lat, $scope.userData.lng)
	   	};
	   	var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	   	marker = new google.maps.Marker({
	      position: new google.maps.LatLng($scope.userData.lat,$scope.userData.lng),
	      animation: google.maps.Animation.DROP,
	      map: map
	  });
    }
    google.maps.event.addDomListener(window, 'load', initialize);


    //get the current time
    var today = new Date();

	//hackishly convert the timezone
    var correctTimezone;
    function convertOffset(offset) {
    	var toHours = offset / 60;
    	var toString = toHours.toString();
    	correctTimezone = toString.replace('-', '-0') + "00";
    	return correctTimezone;
    }

    $scope.userData.startTime = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' + convertOffset(today.getTimezoneOffset());

    //set the model to take the user endtime
    
    $scope.parkingLength = {
    	hrs: '',
    	min: ''
    };
    
    var modifiedDay = '';

    // will hold {probability: "20"}
    $scope.result = {};

    //fuction to be called on submit time
    $scope.calculate = function() {
    	//calculate if the end time will go over to the next day
    	if (today.getHours() + $scope.parkingLength.hrs > 23) {
	    	modifiedDay = today.getDate() + 1;
	    } else {
	    	modifiedDay = today.getDate();
	    }
	    $scope.userData.endTime = today.getFullYear() + '-' + today.getMonth() + '-' + modifiedDay + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' ' + today.getTimezoneOffset();
	    $scope.result = $scope.userData.fetchAPI($scope.userData.lat, $scope.userData.lng, $scope.userData.startTime, $scope.userData.endTime);
    };

    //generate map and place marker of the curent location


  }]);
