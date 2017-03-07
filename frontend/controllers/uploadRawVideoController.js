app.controller('uploadRawVideoController',function($scope, $http){
	$scope.product = {};

	$scope.submit = function(){
		var formData = new FormData;
		for(key in $scope.product){
			formData.append(key, $scope.product[key])
		}
		// image file
		var file = $('#file')[0].files[0];
		formData.append('video', file);

		// post 
		$http.post('http://localhost:3000/videos', formData, {
			transformRequest: angular.identity,
			headers:{
				'Content-Type' : undefined
			}
		}).then(function(res){
			
		})
	}
});
