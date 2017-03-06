// app.controller('uploadRawVideoController',function($scope, $http){
//     $scope.uploadVideo = function() {
// 		// $http({
// 		// 	method: "POST",
// 		// 	url: 'localhost:3000/uploadVideo',
// 		// 	data: whateverobject
// 		// }).then(
// 		// // takes two parameters
// 		// 	// first argument is the success method
// 			// function successFunction(movieData){
// 			// 	$scope.movieData = movieData
// 			// 	console.log(movieData)
// 			// },
// 			// function failedFunction(movieData){
// 			// 	console.log(movieData)
// 			// }
// 		// )		
// 		var formData = new FormData;
// 		var file = $('#uploadedVideo')[0].files[0];
// 		console.log(file)
// 		formData.append('video',file);
// 		$http({
// 			method: 'POST',
// 			url:'http://localhost:3000/videos',
// 			data: formData
// 		}).then(
// 		// 	transformRequest: angular.identity,
// 		// 	headers: {
// 		// 		'Content-Type':undefined,
// 		// 	}
// 		// })
// 			function successFunction(response){
// 				// $scope.movieData = movieData
// 				console.log(response)
// 			},
// 			function failedFunction(response){
// 				console.log(response)
// 			}		

// 		)
//     };    
// });


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
		$http.post('http://localhost:3000/products', formData, {
			transformRequest: angular.identity,
			headers:{
				'Content-Type' : undefined
			}
		}).then(function(res){

		})
	}
});
