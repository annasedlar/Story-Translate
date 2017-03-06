
app.controller('translateVideoController',['$scope', function($scope){
  $scope.paused='0'
  $scope.length = '0'
  $scope.startTime = '0'
  $scope.endTime = '0'
  //   $scope.submitUrl = function() {
    // $scope.videoUrl = $('#target-video').html('<iframe src=' + $scope.videoUrlInput + ' width="640" height="360" frameborder="0" style="position:block;width:50vw;height:50vh;left:0" allowfullscreen></iframe>')
  //   };
  //   $scope.pausedFunction = function(){
  //    var pausedTime = document.getElementsByTagName("video")[0].currentTime
  //    $scope.paused = $('#paused').html('You paused at' + pausedTime)
  //   }
      $scope.startTimeFunc = function(){
        var theVid = document.getElementById("theVid")
        console.dir(theVid);
        $scope.startTime =theVid.currentTime
        console.log(startTime)
        // $scope.paused = pausedTime
        // $scope.length = vLength

      }
      $scope.endTimeFunc = function(){
        var theVid = document.getElementById("theVid")
        console.dir(theVid);
        $scope.endTime = theVid.currentTime
        console.log(endTime)
        // $scope.paused = pausedTime
        // $scope.length = vLength

      }
}]);

