
app.controller('translateVideoController',['$scope', function($scope){
	$scope.paused='0'
    $scope.submitUrl = function() {
		$scope.videoUrl = $('#target-video').html('<iframe src=' + $scope.videoUrlInput + ' width="640" height="360" frameborder="0" style="position:block;width:50vw;height:50vh;left:0" allowfullscreen></iframe>')
    };
    $scope.pausedFunction = function(){
    	var pausedTime = document.getElementsByTagName("video")[0].currentTime
    	$scope.paused = $('#paused').html('You paused at' + pausedTime)
    }
}]);

