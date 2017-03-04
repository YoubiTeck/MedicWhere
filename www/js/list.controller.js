angular.module('starter')

//** _________________________________________________________________________________ **//
//** ___________________________ List ContRoller _____________________________________ **//
//** _________________________________________________________________________________ **//

.controller('DetailController', ['$scope','$http','$state','$ionicPopup','profile','comments','users',
  function($scope,$http,$state,$ionicPopup,profile,comments,users){
  	// console.log('profile: ',profile)
  	// console.log('comments: ',comments)
  	// console.log('users: ',users)
  	
  	$scope.profile = profile;
  	$scope.comments = comments;
  	$scope.users = users;

  	$scope.getUser = function(uid){
  		var user = $scope.users.$getRecord(uid);
  		return user.pseudonym;
  	}

  	// for(var i =0;i< comments.length ; i++){
  	// 	console.log(comments[i]);
  	// 	$scope.getUser('userid1');²
  	// }

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

}])
.controller('ListController',['$scope','$http','$state','$ionicPopup','$stateParams','doctrosList',
  function($scope,$http,$state,$ionicPopup,$stateParams,doctrosList){
    $scope.chercher_input ="";


    $scope.filtrageList = [
      'Tous',
      'Hospital',
      'Medecin Général',
      'Medecin Spéciliste'
    ];
    
	$scope.filtrer_spec = 'Tous';

	$scope.listDoctors = doctrosList;

	$scope.defaultPhoto = "docIcon.svg"

	 
   // range Value and distance configuration
    
    $scope.rangeValue = 1;
    $scope.search_head_distance = $scope.rangeValue; //the label value 
    $scope.rangeMinInit = 1;//minimum value of range default
    $scope.rangeMaxInit = 10;//maximum value of range default

		// show popup of maximum value 
    $scope.showPopup = function(rangeMaxInit){
      $scope.data = {};
      rangeMaxInit = $scope.rangeMaxInit;
      $ionicPopup.show({
		/*template:'<input type="username">',*/

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
  }]);