angular.module('starter')
.factory('HospitalsServ',['$firebaseObject','$firebaseArray','$firebaseRef',
	function($firebaseObject,$firebaseArray, $firebaseRef){

		var hospitalsRef = firebase.database().ref('hospitals');
		var hospitals =  $firebaseArray(hospitalsRef);

		return hospitals;

}])