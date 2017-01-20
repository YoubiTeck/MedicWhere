angular.module('starter.controllers', [])

//** _________________________________________________________________________________ **//
//** ___________________________ App ContRoller ______________________________________ **//
//** _________________________________________________________________________________ **//
.controller('AppCtrl', function($scope, $rootScope, $state) {
  
  // #SIMPLIFIED-IMPLEMENTATION:
  // Simplified handling and logout function.
  // A real app would delegate a service for organizing session data
  // and auth stuff in a better way.
	$scope.pageFlow = {
   							disableOtherTabs : false
						}
  $scope.isExpanded = false;
  $scope.logout = function(){
		$scope.pageFlow.disableOtherTabs = false;
    $rootScope.user = {};
    $state.go('app.start')
  };
        $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
      };    

    })
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


  $scope.GetGeoLocation = function () {

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
                      var image = {
                          // Adresse de l'icône personnalisée
                          url: 'img/medecin.png',
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

  $scope.loadGeoLoc = function(data){
            // alert("data: "+data.length)
            var myLatlng = new google.maps.LatLng(36.684518319590005, 3.0799829101562137);

						var mapOptions = {
						  center: myLatlng,
						  zoom: 16,
						  mapTypeId: google.maps.MapTypeId.ROADMAP
						};
            
						var map = new google.maps.Map(document.getElementById("map"),mapOptions);


						var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
						var compiled = $compile(contentString)($scope);

						var infowindow = new google.maps.InfoWindow({
						});
            
            // to show the information shapes 
						infowindow.setContent($scope.latLang.location);
						infowindow.open(map, marker);


            // Configuration de l'icône personnalisée
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
 
            //  Insertion du marker avec l'ajout de l'icône
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(36.684518319590005, 3.0799829101562137),
                map: map,
                title:"Hello World !",
                // On définit l'icône de ce marker comme étant l'image définie juste au-dessus
                icon: image
            });
            var marker=null;

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

  }
	if($scope.latLang.lat==''){
     
        Doctors.allDocs().then(function(res){
            $scope.loadGeoLoc(res);          
        },function(error){
          alert("error: "+error);
        });  
	}
	 //***********************End**********************************///
})

//** _________________________________________________________________________________ **//
//** ___________________________ List ContRoller _____________________________________ **//
//** _________________________________________________________________________________ **//


.controller('ListController',['$scope','$http','$state','$ionicPopup',function($scope,$http,$state,$ionicPopup){
		 /*$http.get("http://127.0.0.1/test.php").then(function (response) {
			 $scope.names = response.data.records;
			});*/
   
   
   
   
   
	  $http.get('js/data.json').success( function(data){

      $scope.artists = data.artists;

      $scope.wichartist = $state.params.aId;

		//function that get the value from the range in list.html
		$scope.drag = function(value){
      $scope.search_head_distance = value;
        alert("value: "+$scope.rangeValue);
};
    // set the rate and max variables
    $scope.rating = {};
    $scope.rating.rate = 0;
    $scope.rating.max = 5;
    $scope.readOnly = true;
    $scope.testInput = [];

    $scope.showMyCommentDiv = true;

    $scope.main =  function(data) {
                    Base = 'data:image/svg+xml;base64,';
                    radius = 'border-radius:30px;';
                    alphabetcolors = ["#5A8770", "#B2B7BB", "#6FA9AB", "#F5AF29", "#0088B9", "#F18636", "#D93A37", "#A6B12E", "#5C9BBC", "#F5888D", "#9A89B5", "#407887", "#9A89B5", "#5A8770", "#D33F33", "#A2B01F", "#F0B126", "#0087BF", "#F18636", "#0087BF", "#B2B7BB", "#72ACAE", "#9C8AB4", "#5A8770", "#EEB424", "#407887"];

                                var params = {
                                  charCount : 1,
                                  data : data,
                                  textColor : '#ffffff',
                                  height : 50,
                                  width : 50 ,
                                  fontsize : 30 ,
                                  fontWeight : 400 ,
                                  fontFamily : 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif' ,
                                  avatarBorderStyle : null,
                                  avatardefaultBorder : 'border:5px solid white',
                                  defaultBorder :'border:5px solid white',
                                  shape : 'round'
                                };

                                var c = params.data.substr(0, params.charCount).toUpperCase();
                                // get the first letter as UpperCase

                                var cobj = getCharacterObject(c, params.textColor, params.fontFamily, params.fontWeight, params.fontsize);

                                var colorIndex = '';

                                var color = '';// last color to find for the cobj

                                if (c.charCodeAt(0) < 65) {//if it's a not alphabetic char
                                  color = getRandomColors();//get random color
                                } else {//aphabetic letter

                                  colorIndex = Math.floor( (c.charCodeAt(0) - 65) % alphabetcolors.length );
                                  
                                  color = alphabetcolors[colorIndex];
                                }


                                // get the background svg
                                var svg = getImgTag(params.width, params.height, color);
                                svg.append(cobj);

                                // get html of the div>svg>Cobj
                                var lvcomponent = angular.element('<div>').append( svg.clone() ).html();
                                
                                // coded the last element
                                var svgHtml = window.btoa(unescape(encodeURIComponent(lvcomponent)));

                                // last element to add varibale
                                var component = document.createElement("img");

                                // base16
                                var base = Base;

                                var _style = '';

                                //if there is border style
                                if (params.avatarBorderStyle) {
                                  _style = params.avatarBorderStyle;
                                } else if (params.avatardefaultBorder) {
                                  _style = params.defaultBorder;//take this
                                }


                                if (params.shape) {
                                  if (params.shape === 'round') {
                                    
                                    var round_style = radius + _style;

                                    // component.setAttribute("src",base+svgHtml);
                                    // component.setAttribute("style",round_style);
                                    component = "<img src=" + base + svgHtml + " style='" + round_style + "' />";
                                  }
                                } else {
                                  // component.setAttribute("src",base+svgHtml);
                                  // component.setAttribute("style",round_style);

                                  component = "<img src=" + base + svgHtml + " style='" + _style + "' />";
                                }
                                return component;
                    }
                    // get random color
                    function getRandomColors() {
                      var letters = '0123456789ABCDEF'.split('');
                      var _color = '#';
                      for (var i = 0; i < 6; i++) {
                        _color += letters[Math.floor(Math.random() * 16)];
                      }
                      return _color;
                    }
                    // create the circle background
                    function getImgTag(width, height, color) {

                      var svgTag = angular.element('<svg></svg>')
                        .attr({
                          'xmlns' : 'http://www.w3.org/2000/svg',
                          'pointer-events' : 'none',
                          'width' : width,
                          'height' : height
                        })
                        .css({
                          'background-color' : color,
                          'width' : width + 'px',
                          'height' : height + 'px'
                        });

                      return svgTag;
                    }
                    //create the letter object that will be shown
                    function getCharacterObject(character, textColor, fontFamily, fontWeight, fontsize) {
                      var textTag = angular.element('<text text-anchor="middle"></text>')
                        .attr({
                          'y' : '50%',
                          'x' : '50%',
                          'dy' : '0.35em',
                          'pointer-events' : 'auto',
                          'fill' : textColor,
                          'font-family' : fontFamily
                        })
                        .html(character)
                        .css({
                          'font-weight' : fontWeight,
                          'font-size' : fontsize + 'px',
                        });

                      return textTag;
                    }
    $scope.ratingClick = function(ratingValue){
      
      var motion = function(ratingValue){
        if (ratingValue>4) {return "<h3 style='color:green !important;'>Bravo!</h3>";}
        else if(ratingValue>3) {return "<h3>Bien!</h3>";}
        else if(ratingValue>2) {return "<h3>Moyen!</h3>";}
        else if(ratingValue>1) {return "<h3>Pas vraiment!</h3>";}
        else {return "<h3>Méchant!</h3>";}
      };


      // alert("ratingValue: "+ratingValue);
    $ionicPopup.show({
      cssClass:"myPopup",
      template:'<input name="titleInput" id="titleInput" type="text" placeholder="Titre"><input name="descripInput" id="descripInput" type="text" placeholder="Description">',

      title: '<div class="list stable-bg center CommentAvatar padding">'+$scope.main("Xhou Ta")+ '<h4>Xhou Ta (app user)</h4></div>',

      subTitle: motion($scope.rating.rate),
      scope: $scope,
      buttons: [
        {
          text: '<b>Cancel</b>',
          type:'button-stable',
          onTap: function(e){
            $scope.rating.rate = 0;
          }
        },{
          text:'<b>Ok</b>',
          type: 'button-positive',
          onTap: function(e){


            var titleInput = document.getElementById("titleInput").value;
            var descripInput = document.getElementById("descripInput").value;

            if( titleInput =="" || descripInput ==""){
              e.preventDefault();
            }else{
            var divComments = document.getElementById("otherComments") ;
            // var firstChild = divComments.firstChild;
            // divComments.appendChild(firstChild);
            var divCommentHeader = document.createElement('div');

            divCommentHeader.setAttribute("class","item item-avatar");
            divCommentHeader.setAttribute("id","myImage");
            

            // var img = document.createElement('img');
            // img.setAttribute("id","myImage");
            // Drawing the Avatar Image


            
            var h2 = document.createElement('h2');
            h2.appendChild(document.createTextNode("Xhou Ta"));
            // Drawing the User name

            var rating = document.createElement("ul");
            rating.setAttribute("class","MyRating");

            var frag = function(){

                var li = null;
                var i = null;
                var fragement = document.createDocumentFragment();

                for (var ii = 0  ; ii < 5; ii++) {
                  li = document.createElement("li");
                  i = document.createElement("i");
                  if( ii<ratingValue){
                    i.setAttribute("class","icon ion-ios-star");
                  } else{
                    i.setAttribute("class","icon ion-ios-star-outline");
                  }
                  li.appendChild(i);
                  fragement.appendChild(li);
                }
                return fragement;
            }
            rating.appendChild(frag());          
            

            var dateText = document.createTextNode("23/06/2016");
            var dateParag = document.createElement("p");
            dateParag.appendChild(dateText);
            
            

            divCommentHeader.innerHTML = $scope.main("Xhou Ta");
            divCommentHeader.appendChild(h2);
            divCommentHeader.appendChild(rating);
            divCommentHeader.appendChild(dateParag);


            var divCommentBody = document.createElement('div');
            divCommentBody.setAttribute("class","item item-body");
            var bodyTitre = document.createElement('h2');
            bodyTitre.appendChild(document.createTextNode(titleInput));
            var bodyDescrip = document.createTextNode(descripInput);

            divCommentBody.appendChild(bodyTitre);
            divCommentBody.appendChild(bodyDescrip);

            divComments.appendChild(divCommentHeader); 
            divComments.appendChild(divCommentBody); 


            // hide the div of my comments
            $scope.showMyCommentDiv = false;
          }  
          }//end of onTap
        }
      ]
    });

    };
    
    $scope.rangeValue = 1;
    $scope.search_head_distance = $scope.rangeValue; //the label value 
    $scope.rangeMinInit = 1;//minimum value of range default
    $scope.rangeMaxInit = 10;//maximum value of range default

		// show popup of maximum value 
    $scope.showPopup = function(rangeMaxInit){
      $scope.data = {};
      rangeMaxInit = $scope.rangeMaxInit;
      $ionicPopup.show({
/*        template:'<input type="username">',*/

        title: '<b>غير مسافة البحث</b>',
        subTitle: 'المسافة القصوى : 50 كم',
        scope: $scope,
        
        buttons: [
          {
            text: '<b>-</b>',
            type:'button-assertive',
            onTap: function(e){
              // add your action
              if($scope.rangeMaxInit>10) {
                $scope.rangeMaxInit -=10;
                if($scope.search_head_distance > $scope.rangeMaxInit )
                {
                  $scope.search_head_distance = $scope.rangeMaxInit;
                }
                // $scope.drag; 

              }
            }
          },
          {
            text: '<b>'+rangeMaxInit+'</b>',
            type:'button-positive',
            onTap: function(e){
              // add your action
            }
          },
          {
            text: '<b>+</b>',
            type:'button-positive',
            onTap: function(e){
              // add your action
              if($scope.rangeMaxInit<50) 
              {
                $scope.rangeMaxInit +=10;
                // $scope.drag; 
              }
            }
          }
        ]
      });

    }

/* //not usefull now
      $scope.doRefreshser = function(){
        $http.get('js/data.json').success( function(data){
          $scope.artists = data.artists;
          $scope.$broadcast('scroll.refreshComplete');

        });
      }

      $scope.goToLocation = function(item){
        // item.star =! item.star;
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
*/
    });//end success

  }])
  
//** _________________________________________________________________________________ **//
//** ___________________________ Login ContRoller ____________________________________ **//
//** _________________________________________________________________________________ **//

.controller('loginCtrl', function ($scope, $state, $rootScope,BackendService) { /**/

  // #SIMPLIFIED-IMPLEMENTATION:
  // This login function is just an example.
  // A real one should call a service that checks the auth against some
  // web service
            $scope.signeup = function(){
           
            $user = document.getElementById("username").value;
            $mail= document.getElementById("mail").value;
            $password= document.getElementById("password").value;
            $nom= document.getElementById("nom").value;
            $prenom=document.getElementById("prenom").value;
            $birthday = document.getElementById("birthday").value;
            var myDB = window.openDatabase("MedicWhere","1.0", "MedicWhere", 200000);  
            myDB.transaction(function(tx) {
            tx.executeSql('SELECT count(*) AS mycount FROM users', [], function(tx, rs) {
            $id = rs.rows.item(0).mycount+1;
            //alert("nb users"+ $id);
            tx.executeSql("INSERT INTO users (id, pseudonym, email, password, forename, surname, birthday) VALUES (?,?,?,?,?,?,?)", [$id, $user, $mail, $password, $nom, $prenom, $birthday]);
            tx.executeSql('SELECT * FROM users where id=(?) ', [$id], function(tx, rs) {
              if(rs.rows.item(0).pseudonym == $user){
                alert("user created");
              }
            },function(tx,error){
              alert('SELECT error: ' + error.message);
            });
        
      
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
            
          
           
        }); 
              
     };
            $scope.login = function(){
            //in this case we just set the user in $rootScope
            //$rootScope.name;
						
						$scope.pageFlow.disableOtherTabs = false;
              
            $psw=document.getElementById("password").value;
            $user=document.getElementById("user").value;
               
        var myDB = window.openDatabase("MedicWhere","1.0", "MedicWhere", 200000);
        myDB.transaction(function(tx) {
            tx.executeSql('SELECT *,count(*) as mycount FROM users where pseudonym=(?) and password=(?) ', [$user,$psw], function(tx, rs) {
                //alert('pseudonym: ' + rs.rows.item(0).pseudonym);
                if(rs.rows.item(0).mycount==1){
                  $rootScope.user = {
                    pseudonym : $user,
                    forename : rs.rows.item(0).forename,
                    surname : rs.rows.item(0).surname,
                    birthday : rs.rows.item(0).birthday,
                    email : rs.rows.item(0).email
                };
                  $state.go('app.home');
                }else{
                  alert("User not found");
                }
                //pseudonym, email, password, forename
            }, function(tx, error) {
                alert('SELECT error: ' + error.message);
            });
        });
            
              // alert($psw+$user);
                
                //finally, we route our app to the 'app.shop'
                //$state.go('app.home');


        };

});