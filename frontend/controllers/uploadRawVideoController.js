app.controller('uploadRawVideoController',function($scope, $location, $http){
	$scope.product = {};
	$scope.tempImage
	 // this gets thumbanil pic of submission
	document.getElementById('file').addEventListener('change', function(event) {
			  var file = event.target.files[0];
			  var fileReader = new FileReader();
			  if (file.type.match('image')) {
			    fileReader.onload = function() {
			      var img = document.createElement('img');
			      img.src = fileReader.result;
			      document.getElementsByTagName('div')[0].appendChild(img);
			    };
			    fileReader.readAsDataURL(file);
			  } else {
			    fileReader.onload = function() {
			      var blob = new Blob([fileReader.result], {type: file.type});
			      var url = URL.createObjectURL(blob);
			      var video = document.createElement('video');
			      var timeupdate = function() {
			        if (snapImage()) {
			          video.removeEventListener('timeupdate', timeupdate);
			          video.pause();
			        }
			      };
			      video.addEventListener('loadeddata', function() {
			        if (snapImage()) {
			          video.removeEventListener('timeupdate', timeupdate);
			        }
			      });
			      var snapImage = function() {
			        var canvas = document.createElement('canvas');
			        canvas.width = video.videoWidth;
			        canvas.height = video.videoHeight;
			        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
			        var image = canvas.toDataURL();
			        var success = image.length > 100000;
			        if (success) {
			          var img = document.createElement('img');
			          img.src = image;
			          $scope.tempImage = image
			          // console.dir($scope.tempImage)
			          document.getElementById('thumbnailGoesHere').appendChild(img)
			          URL.revokeObjectURL(url);
			        }
			        return success;
			      };
			      video.addEventListener('timeupdate', timeupdate);
			      video.preload = 'metadata';
			      video.src = url;
			      // Load video in Safari / IE11
			      video.muted = true;
			      video.playsInline = true;
			      video.play();
			    };
			    fileReader.readAsArrayBuffer(file);
			  }
			});

	$scope.submit = function(){
		// Posting video to the backend
		var formData = new FormData;
		for(key in $scope.product){
			formData.append(key, $scope.product[key])
		}
		var file = $('#file')[0].files[0];
		formData.append('video', file);
		// formData.append('thumbnail', $scope.tempImage);
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
				document.getElementById('thumbnailGoesHere').removeChild(0)
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
