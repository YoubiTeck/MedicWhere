angular.module('starter')
.factory('UsersServ',['$firebaseObject','$firebaseArray','$firebaseRef',
	function($firebaseObject,$firebaseArray, $firebaseRef){
		var result;
		var usersArray =  $firebaseArray($firebaseRef.users);

		return {
			getAll: function(){
				// console.log('in getAll',usersArray[0]);
				return usersArray;
			},
			getById: function(uid){
				return usersArray.$getRecord(uid);
			}
		};
}]);