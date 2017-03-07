app.controller('translateVideoController',['$scope', function($scope){
	$scope.entireTranscript = [];
	$scope.submitEachSection = function(){
        $scope.entireTranscript.push({
          startTime: $scope.startTime,
          endTime: $scope.endTime,
          transcript: $scope.transcript
        })		
	}
	$scope.startTimeFunc = function(){
		var theVid = document.getElementById("theVid")
		$scope.startTime = theVid.currentTime
	} 
	$scope.endTimeFunc = function(){
		var theVid = document.getElementById("theVid")
    	$scope.endTime = theVid.currentTime
	}     
}]);

