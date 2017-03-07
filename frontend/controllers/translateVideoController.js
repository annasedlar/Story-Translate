
app.controller('translateVideoController',['$scope', function($scope){
  $scope.paused='0'
  $scope.length = '0'
  $scope.startTime = '0'
  $scope.endTime = '0'
  $scope.entireTranscript = []
  //   $scope.submitUrl = function() {
    // $scope.videoUrl = $('#target-video').html('<iframe src=' + $scope.videoUrlInput + ' width="640" height="360" frameborder="0" style="position:block;width:50vw;height:50vh;left:0" allowfullscreen></iframe>')
  //   };
  //   $scope.pausedFunction = function(){
  //    var pausedTime = document.getElementsByTagName("video")[0].currentTime
  //    $scope.paused = $('#paused').html('You paused at' + pausedTime)
  //   }
      $scope.submitEachSection = function(){
        var startTime = $scope.startTime;
        var endTime = $scope.endTime; 
        var transcript = $scope.transcript; 
        $scope.entireTranscript.push({
          startTime: startTime,
          endTime: endTime,
          transcript: transcript
        })
        console.log($scope.entireTranscript)
      }

      $scope.startTimeFunc = function(translateNumber){
        console.log(translateNumber)
        var theVid = document.getElementById("theVid")
        console.dir(theVid);
        $scope.startTime =theVid.currentTime
        console.log($scope.startTime)
        // $scope.paused = pausedTime
        // $scope.length = vLength
      }

      $scope.endTimeFunc = function(translateNumber){
        console.log(translateNumber)
        var theVid = document.getElementById("theVid")
        console.dir(theVid);
        $scope.endTime = theVid.currentTime
        console.log($scope.endTime)
        // $scope.paused = pausedTime
        // $scope.length = vLength
      }

      $scope.addField = function(){
        $(document).ready(function(){
          var newField = '<div><button class="btn btn-info" ng-click="startTimeFunc(1)">Set Start Time</button><br/>Start Time: {{startTime}}<br/><button class="btn btn-info" ng-click="endTimeFunc(1)">Set End Time</button><br/>End Time: {{endTime}}<br />Enter Translations: <TEXTAREA NAME="Address" ROWS=10 COLS=90></TEXTAREA><input type="submit" style="display:none"/></div>' 
          var x = 1; 
          $("#addFields").click(function(){
            $('#translation-form').append(newField)
          })
        })
      }

      $scope.submitForm = function(){
        $(document).ready(function() {
          $("#submit-button").click(function() {
           $("#translation-form").submit();
          });
        });
      }
}]);

