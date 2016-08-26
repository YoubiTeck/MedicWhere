// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider , $urlRouterProvider){
  $stateProvider
  .state('apps',{
    url: '/app',
    abstract: true,
    templateUrl: 'templates/app.html'
  })
  .state('apps.home',{
    url: '/home',
    views: {
      'home-tab' : {
        templateUrl: 'templates/home.html'
      }
    }
  })
  .state('apps.list',{
    url: '/list',
    views: {
      'list-tab' : {
        templateUrl: 'templates/list.html',
        controller: 'ListController'
      }
    }
  })
  .state('apps.search',{
    url:'/search',
    views : {
      'search-tab':{
        templateUrl:'templates/search.html',
        controller: 'ListController'
    
      }
    }

  })
  .state('apps.account',{
    url:'/account',
    views:{
      'account-tab':{
        templateUrl:'templates/account.html',
        controller: 'ListController'
      }
    }
  })
  .state('apps.detail',{
    url: '/list/:aId',
    views: {
      'list-tab' : {
        templateUrl: 'templates/detail.html',
        controller: 'ListController'
      }
    }
  })

  $urlRouterProvider.otherwise('/app/home');
  
})
.controller('ListController',['$scope','$http','$state',function($scope,$http,$state){
  
  $http.get('js/data.json').success( function(data){
    
    $scope.artists = data.artists;
    
    $scope.wichartist = $state.params.aId;

    $scope.doRefreshser = function(){
      $http.get('js/data.json').success( function(data){
          $scope.artists = data.artists;
          $scope.$broadcast('scroll.refreshComplete');

      });
    }

    $scope.toggleStar = function(item){
      item.star =! item.star;
    }

    $scope.deleteItem = function(item){
      $scope.artists.splice( $scope.artists.indexOf(item),1);
    };

    $scope.moveItem = function(item, fromIndex , toIndex){
      // alert("from : "+ fromIndex + " to: "+ toIndex)
      $scope.artists.splice(fromIndex,1);
      // delete this item from the eldest position
      $scope.artists.splice(toIndex,0,item);
      // copy this item in the newest position without deleting other items

     };

  });//end success

}]);
