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
    });
