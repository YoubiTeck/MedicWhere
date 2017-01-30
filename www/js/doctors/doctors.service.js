angular.module('starter')
.factory('DoctorsServ',['$firebaseObject','$firebaseArray','$firebaseRef',
	function($firebaseObject,$firebaseArray, $firebaseRef){
		var result;
		var doctorsArray =  $firebaseArray($firebaseRef.doctors);

		return {
			getAll: function(){
				// console.log('in getAll',doctorsArray[0]);
				return doctorsArray;
			},
			getById: function(uid){
				return doctorsArray.$getRecord(uid);
			}
		};
}]);