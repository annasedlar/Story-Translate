app.controller('videosToTranslateController',['$scope','$http', function($scope, $http){
    // $scope.videoToBeTranslated = "http://placehold.it/350x150"
    $scope.videoToBeTranslatedArray = [];

	var tempUrl = 'http://localhost:3000/videosToTranslate'
	// $scope.imagePath = 'http://image.tmdb.org/t/p/w300/';

	$http({
		method: "GET",
		url: tempUrl
	}).then(
		function successFunction(videoData){
			$scope.videoData = videoData
			// $scope.targetVideo = 
			console.log(videoData.data[0].id)

			// $scope.videoToBeTranslatedArray.push(videoData.data)
			// $scope.tempArray = []

			// videoData.data.map((eachVideo, index)=>{
			// 	console.log(eachVideo)
			// 	$scope.videoToBeTranslatedArray.push(eachVideo.name)
			// })
		},
		function failedFunction(videoData){
			// console.log(videoData)
		}
	)
}]);