  
//** _________________________________________________________________________________ **//
//** ___________________________ Login ContRoller ____________________________________ **//
//** _________________________________________________________________________________ **//
angular.module('starter')
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