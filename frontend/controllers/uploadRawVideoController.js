app.controller('uploadRawVideoController',function($scope, $location, $http){
	$scope.product = {};
	$scope.tempImage

	$scope.submit = function(){
		$('.failedUploadMessage').html('uploading...')
		var formData = new FormData;
		for(key in $scope.product){
			formData.append(key, $scope.product[key])
		}
		var file = $('#file')[0].files[0];
		formData.append('video', file);
		formData.append('familyName', $scope.familyName)
		console.log(typeof($scope.tempImage))
		$http.post('http://pauldkang.com:3030/videos', formData, {
			transformRequest: angular.identity,
			headers:{
				'Content-Type' : undefined
			}
		}).then(
			function successFunction(data){
				console.log(data)
				window.location.reload()
				$location.path('/videosToTranslate')
			},
			function failedFunction(data){
				console.log("fail")
				$scope.failedUpload = 'Try Again, upload has failed'
			}
    	)
	}
});
