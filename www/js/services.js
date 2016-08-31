angular.module('starter')
    .factory('geofenceService', function ($rootScope, $window, $q, $log, $ionicLoading) {

        var geofenceService = {
            _geofences: [],
            _geofencesPromise: null,
            createdGeofenceDraft: null,
            loadFromLocalStorage: function () {
                var result = localStorage['geofences'];
                var geofences = [];
                if (result) {
                    try {
                        geofences = angular.fromJson(result);
                    } catch (ex) {

                    }
                }
                this._geofences = geofences;
                return $q.when(this._geofences);
            },
          
            loadFromDevice: function () {
                var self = this;
                if ($window.geofence && $window.geofence.getWatched) {
                    return $window.geofence.getWatched().then(function (geofencesJson) {
                        self._geofences = angular.fromJson(geofencesJson);
                        return self._geofences;
                    });
                }
                return this.loadFromLocalStorage();
            },
            getAll: function () {
                var self = this;
                if (!self._geofencesPromise) {
                    self._geofencesPromise = $q.defer();
                    self.loadFromDevice().then(function (geofences) {
                        self._geofences = geofences;
                        self._geofencesPromise.resolve(geofences);
                    }, function (reason) {
                        $log.log("Error fetching geofences", reason);
                        self._geofencesPromise.reject(reason);
                    });
                }
                return self._geofencesPromise.promise;
            },
          
            getNextNotificationId: function () {
                var max = 0;
                this._geofences.forEach(function (gf) {
                    if (gf.notification && gf.notification.id) {
                        if (gf.notification.id > max) {
                            max = gf.notification.id;
                        }
                    }
                });
                return max + 1;
            }
        };

        return geofenceService;
    })
    .factory('geolocationService', function ($q, $timeout) {
        var currentPositionCache;
        return {
            getCurrentPosition: function () {
                if (!currentPositionCache) {
                    var deffered = $q.defer();
                    navigator.geolocation.getCurrentPosition(function (position) {
                        deffered.resolve(currentPositionCache = position);
                        $timeout(function () {
                            currentPositionCache = undefined;
                        }, 10000);
                    }, function () {
                        deffered.reject();
                    });
                    return deffered.promise;
                }
                return $q.when(currentPositionCache);
            }
        };
    })
/*

  DeepBlue Starter Kit - version 1.1
  Copyright (c) 2015 INMAGIK SRL - www.inmagik.com
  All rights reserved

  written by Mauro Bianchi
  bianchimro@gmail.com  
  
  file: services.js
  description: this file contains all services of the DeepBlue app.

*/

// CartService is an example of service using localStorage 
// to persist items of the cart.
.factory('CartService', [function () {

  var svc = {};

  svc.saveCart = function(cart){
    window.localStorage.setItem('cart', JSON.stringify(cart));
  };

  svc.loadCart = function(){
    var cart = window.localStorage.getItem('cart');
    if(!cart){
      return { products : [ ] }
    }
    return JSON.parse(cart);
  };

  svc.resetCart = function(){
    var cart =  { products : [ ] };
    svc.saveCart(cart);
    return cart;
  };

  svc.getTotal = function(cart){
    var out = 0;
    if(!cart || !cart.products || !angular.isArray(cart.products)){
      return out;
    }
    for(var i=0; i < cart.products.length; i++){
      out += cart.products[i].price;
    }
    return out;
  }

  return svc;

}])

// #SIMPLIFIED-IMPLEMENTATION
// This is an example if backend service using $http to get
// data from files.
// In this example, files are shipped with the application, so 
// they are static and cannot change unless you deploy an application update
// Other possible implementations (not covered by this kit) include:
// - loading dynamically json files from the web 
// - calling a web service to fetch data dinamically
// in those cases be sure to handle url whitelisting (specially in android)
// (https://cordova.apache.org/docs/en/5.0.0/guide_appdev_whitelist_index.md.html)
// and handle network errors in your interface
.factory('BackendService', ['$http', function ($http) {

  var svc = {};

  svc.getFeeds = function(cb){
    return $http.get('sampledata/feeds.json')
        .succes(function(err, data){
           // return data;
          cb(data);
        })
  }

  svc.getProducts = function(){
    return $http.get('sampledata/products.json');
  }
  svc.getUser = function(){
    return $http.get('127.0.0.1/test.php')
  }
  return svc;
}])


    .service('LoginService', function($q) {
      return {
        loginUser: function(name, pw) {
          var deferred = $q.defer();
          var promise = deferred.promise;

          if (name == 'user' && pw == 'secret') {
            deferred.resolve('Welcome ' + name + '!');
          } else {
            deferred.reject('Wrong credentials.');
          }
          promise.success = function(fn) {
            promise.then(fn);
            return promise;
          }
          promise.error = function(fn) {
            promise.then(null, fn);
            return promise;
          }
          return promise;
        }
      }
    })
    ;