app.controller('finishedVideosController',['$scope','$http', function($scope, $http){
    $scope.videoToBeTranslatedArray = [];
	var tempUrl = 'http://localhost:3000/videosFinished'
	$http({
		method: "GET",
		url: tempUrl
	}).then(
		function successFunction(videoData){
			$scope.videoData = videoData
		},
		function failedFunction(videoData){
		}
	)
}]);