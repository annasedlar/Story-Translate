app.controller('uploadRawVideoController',function($scope, $location, $http){
	$scope.product = {};
	$scope.tempImage

	$scope.submit = function(){
		$('#demoModal').modal('close');
		// modal.parentElement.removeChild(modal);
		// Posting video to the backend
		var formData = new FormData;
		for(key in $scope.product){
			formData.append(key, $scope.product[key])
		}
		var file = $('#file')[0].files[0];
		formData.append('video', file);
		formData.append('familyName', $scope.familyName)
		console.log(typeof($scope.tempImage))
		$http.post('http://localhost:3000/videos', formData, {
			transformRequest: angular.identity,
			headers:{
				'Content-Type' : undefined
			}
		}).then(
			function successFunction(data){
				console.log(data)
				
				$location.path('/videosToTranslate')
				
				

			},
			function failedFunction(data){
				console.log("fail")
				$scope.failedUpload = 'Try Again, upload has failed'
			}
    	)


    	// adding thumbnail to the backend
		// $http.post('http://localhost:3000/thumbnails', $scope.tempImage, {
		// 	transformRequest: angular.identity,
		// 	headers:{
		// 		'Content-Type' : undefined
		// 	}
		// }).then(
		// 	function successFunction(data){
		// 		console.log(data)
		// 		// $location.path('/videosToTranslate')
		// 		// document.getElementById('thumbnailGoesHere').removeChild(0)
		// 	},
		// 	function failedFunction(data){
		// 		console.log("fail")
		// 		// $scope.failedUpload = 'Try Again, upload has failed'
		// 	}
  //   	)
  //   	$http({
  //   		method:"POST",
  //   		url: 'http://localhost:3000/thumbnails',
  //   		data: $scope.tempImage
  //   	}).then(
  //   			function successFunction(movieData){
		// 	console.log(movieData)
		// },
		// function failedFunction(movieData){
		// 	// console.log(movieData)
		// }
		// )
	}
});
// console.dir(document.getElementsByTagName('input'))
