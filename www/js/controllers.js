angular.module('starter.controllers', [])

<<<<<<< HEAD
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})
=======
.controller('AppCtrl', function($scope, $rootScope, $state) {
  
  // #SIMPLIFIED-IMPLEMENTATION:
  // Simplified handling and logout function.
  // A real app would delegate a service for organizing session data
  // and auth stuff in a better way.
	$scope.pageFlow = {
   							disableOtherTabs : true
						}
						
  $scope.isExpanded = false;
  $scope.logout = function(){
		$scope.pageFlow.disableOtherTabs = true;
    $rootScope.user = {};
    $state.go('app.start')
  };
      $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
      };

    })
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea

.controller('MapSearchCntr', function($scope, $ionicModal,$ionicActionSheet, $timeout, $http, $log,$state, $location, $ionicPopup, $compile,geolocationService,geofenceService,$ionicLoading) {

	$scope.latLang={
		lat:'',
		lang:'',
		location:''
	};

		 $ionicLoading.show({
            template: 'Getting geofences from device...',
            duration: 5000
        });

        $scope.geofences = [];

        geofenceService.getAll().then(function (geofences) {
            $ionicLoading.hide();
            $scope.geofences = geofences;
        }, function (reason) {
            $ionicLoading.hide();
            $log.log('An Error has occured', reason);
        });


        $scope.GetGeoLocation = function () {

            $log.log('Tracing current location...');
            $ionicLoading.show({
                template: 'Tracing current location...'
            });
            geolocationService.getCurrentPosition()
                .then(function (position) {
                    $log.log('Current location found');
                    $log.log('Current location Latitude'+position.coords.latitude);
                    $log.log('Current location Longitude'+position.coords.longitude);

                    $ionicLoading.hide();
					$scope.latLang.lat=parseFloat(position.coords.latitude);
					$scope.latLang.lang=parseFloat(position.coords.longitude);
					var lat =$scope.latLang.lat;
					var lang =$scope.latLang.lang;
					//You can hit request upto 2500 per day on free of cost.
					var mrgdata='http://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lang+'&sensor=true'
					$http.get(mrgdata)
							.success(function (response) {
							/* console.log(response.results[0].formatted_address); */
							$scope.latLang.location=response.results[0].formatted_address;
							console.log("Your Current Location is : " +$scope.latLang.location)

							var myLatlng = new google.maps.LatLng(lat,lang);

						var mapOptions = {
						  center: myLatlng,
						  zoom: 16,
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						var map = new google.maps.Map(document.getElementById("map"),
							mapOptions);


						 var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
						var compiled = $compile(contentString)($scope);

						var infowindow = new google.maps.InfoWindow({

						});
						infowindow.setContent($scope.latLang.location);
						infowindow.open(map, marker);

						var marker = new google.maps.Marker({
						  position: myLatlng,
						  map: map,
						  title: 'Current Location'
						});

						google.maps.event.addListener(marker, 'click', function() {
						  infowindow.open(map,marker);

						});

						$scope.map = map;


				}).error(function (data, status, headers, config) {
					console.log("error");

					 if (status == 0)
						showalert("Error", "Errro Occured from Server site!");
					else
						showalert("Error", data);

				});

		}, function (reason) {
			$log.log('Cannot obtain current location', reason);

			$ionicLoading.show({
				template: 'Cannot obtain current location',
				duration: 1500
			});
		});
     };

	 //This is default set location before fetching current location///
	 //***************Start********************************//
	 if($scope.latLang.lat==''){
			var myLatlng = new google.maps.LatLng(18.9750,72.8258);

						var mapOptions = {
						  center: myLatlng,
						  zoom: 16,
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						var map = new google.maps.Map(document.getElementById("map"),
							mapOptions);


						 var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
						var compiled = $compile(contentString)($scope);

						var infowindow = new google.maps.InfoWindow({

						});
						infowindow.setContent($scope.latLang.location);
						infowindow.open(map, marker);

						var marker = new google.maps.Marker({
						  position: myLatlng,
						  map: map,
						  title: 'Current Location'
						});

						google.maps.event.addListener(marker, 'click', function() {
						  infowindow.open(map,marker);

						});

						$scope.map = map;
	 }
	 //***********************End**********************************///
})

<<<<<<< HEAD

  .controller('ListController',['$scope','$http','$state',function($scope,$http,$state){

=======
  .controller('ListController',['$scope','$http','$state',function($scope,$http,$state){

		 /*$http.get("http://127.0.0.1/test.php").then(function (response) {
			 $scope.names = response.data.records;
			});
*/
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea
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

<<<<<<< HEAD
  }]);
=======
  }])
	.controller('loginCtrl', function ($scope, $state, $rootScope,BackendService) { /**/

  // #SIMPLIFIED-IMPLEMENTATION:
  // This login function is just an example.
  // A real one should call a service that checks the auth against some
  // web service
        $scope.login = function(){
            //in this case we just set the user in $rootScope
            //$rootScope.name;
						
						$scope.pageFlow.disableOtherTabs = false;
                $rootScope.user = {
                    email : "k_fahloune@esi.dz",
                    name : "Katia Fahloune",
                    address : "Route nationale 26 Sonatrach",
                    city : "Bejaia",
                    zip  : "06OO1",
                    avatar : 'sampledata/images/avatar.jpg'
                };
                //finally, we route our app to the 'app.shop'
                $state.go('app.home');


        };

})
	;
>>>>>>> ac5e5f5f437ffee474a96e062412e13b9b2508ea