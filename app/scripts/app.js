'use strict';

/**
 * @ngdoc overview
 * @name parktrollApp
 * @description
 * # parktrollApp
 *
 * Main module of the application.
 */
angular
  .module('parktrollApp', [
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'parktroll.services'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
