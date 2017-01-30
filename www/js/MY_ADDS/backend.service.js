
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
angular.module('starter')
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
