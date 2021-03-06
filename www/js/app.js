// Ionic Starter App

// salah eddine  aissa khalil 

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var myDB = null;
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'leaflet-directive','ngCordova','starter.rating','ionic-letter-avatar','firebase'])

.run(function($ionicPlatform,$window, $compile, $document, $ionicLoading, $state,$log, $rootScope,$cordovaSQLite,Doctors) {
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

    myDB = window.openDatabase("MedicWhere","1.0", "MedicWhere", 200000);  
    // $cordovaSQLite.execute(myDB, "DROP TABLE IF EXISTS `doctors`");
    $cordovaSQLite.execute(myDB,"CREATE TABLE IF NOT EXISTS doctors ("
      +"id int(11) NOT NULL PRIMARY KEY," 
      +"latitude float NOT NULL, "
      +"longitude float NOT NULL, "
      +"address varchar(255) NOT NULL," 
      +"phone varchar(255) DEFAULT ''," 
      +"firstname varchar(255) NOT NULL," 
      +"lastname varchar(255) NOT NULL,"
      +"specialty varchar(255) NOT NULL," 
      +"append int(11) NOT NULL,"
      +"edit int(11) DEFAULT '')")

    });
	 $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            $log.log('stateChangeError ', error, toState, toParams, fromState, fromParams);
        });
})
.config(['$stateProvider', '$urlRouterProvider','$firebaseRefProvider',
  function($stateProvider, $urlRouterProvider, $firebaseRefProvider) {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAp4d8F25uJujn_WWPLS2tewOTVuN60FGc",
    authDomain: "medicwhere-81309.firebaseapp.com",
    databaseURL: "https://medicwhere-81309.firebaseio.com",
    storageBucket: "medicwhere-81309.appspot.com",
    messagingSenderId: "491926403826"
  };
  firebase.initializeApp(config);

  // config my references
  $firebaseRefProvider.registerUrl({
    default: config.databaseURL,
    doctors: config.databaseURL + '/doctors',
    users: config.databaseURL + '/users'
  });

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
        'menuContent2': {
          templateUrl: 'templates/home.html',
          controller: 'MapSearchCntr'
        }
      }
    })
    .state('app.list',{
      url: '/list',
      views: {
        'list-tab' : {
          templateUrl: 'templates/list.html',
          controller: 'ListController as ctrl',
          resolve:{
            doctrosList : function(DoctorsServ){
              return DoctorsServ.getAll().$loaded();
            }
          }
        }
      }
    })
    .state('app.detail',{
      url: '/list/:aId',
      views: {
        'list-tab' : {
          templateUrl: 'templates/detail.html',
          controller: 'DetailController as detailController'
        }
      },
      resolve:{
        profile: function( $stateParams, DoctorsServ){
          // console.log('in porfile',$stateParams.aId);

          return DoctorsServ.getById($stateParams.aId).$loaded();
        },
        comments: function(CommentsServ){
          // console.log('in comments', $stateParams.aId);
          return CommentsServ.$loaded();
        },
        users: function(UsersServ){
          return UsersServ.getAll().$loaded();
        }
      }
    })
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
    .state('app.signeup',{
      url:'/signeup',
      views:{
        'menuContent2':{
          templateUrl:'templates/signeup.html',
          controller: 'loginCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
}]);
