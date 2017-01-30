angular.module('starter')
//** _________________________________________________________________________________ **//
//** ___________________________ MAP search ContRoller _______________________________ **//
//** _________________________________________________________________________________ **//
.controller('MapSearchCntr', function($scope,$rootScope, $ionicModal,$ionicActionSheet, $timeout, $http,
 $log,$state, $location, $ionicPopup, $compile,geolocationService,geofenceService,$ionicLoading,$cordovaSQLite,Doctors) {

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
            $log.log('An Error has occured in Getting geofences', reason);
  });


  $scope.GetGeoLocation = function (data) {

            $log.log('Tracing current location...');
            $ionicLoading.show({
                template: 'Tracing current location. ..'
            });
            geolocationService.getCurrentPosition()
                .then(function (position) {
                    $log.log('Current location found');
                    $log.log('Current location Latitude'+position.coords.latitude);
                    $log.log('Current location Longitude'+position.coords.longitude);
                    console.log('lat:'+position.coords.latitude+' __ lang:'+position.coords.longitude);
                    $ionicLoading.hide();
					
                    $scope.latLang.lat=parseFloat(position.coords.latitude);
                    $scope.latLang.lang=parseFloat(position.coords.longitude);
                    var lat =$scope.latLang.lat;
                    var lang =$scope.latLang.lang;
                    console.log(lat+' '+lang);
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
                        zoom: 10,
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
                      var image = {
                          // Adresse de l'icône personnalisée
                          url: 'img/map-marker-me.png',
                          // Taille de l'icône personnalisée
                          size: new google.maps.Size(35, 35),
                          // Origine de l'image, souvent (0, 0)
                          origin: new google.maps.Point(0,0),
                          // L'ancre de l'image. Correspond au point de l'image que l'on raccroche à la carte.
                          // Par exemple, si votre îcone est un drapeau, cela correspond à son mâts
                          anchor: new google.maps.Point(0, 20)
                      };
          
                      var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: 'Current Location',
                        icon: image
                      });
                              
                      google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(map,marker);
                      });

                      // // Configuration de l'icône personnalisée
                      var image = {
                          // Adresse de l'icône personnalisée
                          url: 'img/markerHosp.png',
                          // Taille de l'icône personnalisée
                          size: new google.maps.Size(35, 40),
                          // Origine de l'image, souvent (0, 0)
                          origin: new google.maps.Point(0,0),
                          // L'ancre de l'image. Correspond au point de l'image que l'on raccroche à la carte. Par exemple, si votre îcone est un drapeau, cela correspond à son mâts
                          anchor: new google.maps.Point(0, 20)
                      };
          
                      for (var index = 0; index < data.length; index++) {
                        console.log(
                              data[index]['id']
                        +"\n"+data[index]['latitude']
                        +"\n"+data[index]['longitude']
                        +"\n"+data[index]['address']
                        +"\n"+data[index]['phone']
                        +"\n"+data[index]['firstname']
                        +"\n"+data[index]['lastname']
                        +"\n"+data[index]['specialty']
                        +"\n"+data[index]['append']
                        +"\n"+data[index]['edit']
                        );
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(data[index]['latitude'], data[index]['longitude']),
                            map: map,
                            title:"Hello World !",
                            // On définit l'icône de ce marker comme étant l'image définie juste au-dessus
                            icon: image
                        });

                      }                                   
                      
                  //    marker.setMap(null);
                      $scope.map = map;
                    })//end of success response
                    .error(function (data, status, headers, config) {
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
                 }
                );         
         };
	 //This is default set location before fetching current location///
	 //***************Start********************************//

	if($scope.latLang.lat==''){
     
        Doctors.allDocs().then(function(res){
            // $scope.loadGeoLoc(res);
            $scope.GetGeoLocation(res);          
        },function(error){
          alert("error: "+error);
        });  

        // $scope.GetGeoLocation();
	}
  
	 //***********************End**********************************///
});