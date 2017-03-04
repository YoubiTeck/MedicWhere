angular.module('starter')
.factory('CommentsServ',['$firebaseObject','$firebaseArray','$firebaseRef',
	function($firebaseObject,$firebaseArray, $firebaseRef){

		var commentsRef = firebase.database().ref('comments');
		var comments =  $firebaseArray(commentsRef);

		return comments;

}])