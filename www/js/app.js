// Ionic Starter App

<<<<<<< HEAD
=======

// salah eddine  aissa khalil 


>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'leaflet-directive','ngCordova'])

.run(function($ionicPlatform,$window, $compile, $document, $ionicLoading, $state,$log, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
		 if ($window.geofence) {
                $window.geofence.initialize();
            }
    });
	 $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $log.log('stateChangeError ', error, toState, toParams, fromState, fromParams);
        });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html',
    controller: 'AppCtrl'
  })
    .state('app.home', {
      url: '/home',
      views: {
<<<<<<< HEAD
        'menuContent': {
=======
        'menuContent2': {
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea
          templateUrl: 'templates/home.html',
          controller: 'MapSearchCntr'
        }
      }
    })
<<<<<<< HEAD
=======
     .state('app.start', {
    url: '/start',
    views: {
      'menuContent2': {
        templateUrl: 'templates/start.html'
      }
    }
  })
    .state('app.forgot', {
    url: '/forgot',
    views: {
      'menuContent2': {
        templateUrl: 'templates/forgot.html'
      }
    }
  })
    .state('app.login', {
        url: '/login',
        views: {
          'menuContent2': {
            templateUrl: 'templates/login.html',
            controller : 'loginCtrl'
          }
        }
      })
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea
    .state('app.list',{
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })
    .state('app.search',{
      url:'/search',
      views : {
        'search-tab':{
          templateUrl:'templates/search.html',
          controller: 'ListController'

        }
      }

    })
    .state('app.account',{
      url:'/account',
      views:{
        'account-tab':{
          templateUrl:'templates/account.html',
          controller: 'ListController'
        }
      }
    })
<<<<<<< HEAD
=======
    .state('app.signeup',{
      url:'/signeup',
      views:{
        'menuContent2':{
          templateUrl:'templates/signeup.html',
          controller: 'loginCtrl'
        }
      }
    })
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea
    .state('app.detail',{
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
<<<<<<< HEAD
  $urlRouterProvider.otherwise('/app/home');
=======
  $urlRouterProvider.otherwise('/app/start');
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea
});
