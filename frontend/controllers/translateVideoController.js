app.controller('translateVideoController',['$scope', function($scope){
  $scope.entireTranscript = [];
  $scope.counter = 1; 
  $scope.submitEachSection = function(){
        $scope.entireTranscript.push({
          startTime: $scope.startTime,
          endTime: $scope.endTime,
          transcript: $scope.transcript,
          counter: $scope.counter
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

  $scope.addField = function(){
    var theVid = document.getElementById("theVid")
    $scope.startTime = theVid.currentTime
    $scope.endTime = theVid.currentTime
    $scope.counter += 1;
    var newField = '<div class="new-sections">' +
        '<div class="col-sm-12">'+
          '<button class="btn btn-info" ng-click="startTimeFunc(counter)">'+
                        'Set Start Time'+
          '</button>'+
          '<button class="btn btn-info" ng-click="endTimeFunc(counter)">'+
              'Set End Time'+
          '</button> '+
        '</div>  '+ 
        '<div class="col-xs-6">Start Time: '+ $scope.startTime+'</div><div class="col-xs-6">End Time: '+$scope.endTime+'</div>'+
          'Enter Translations: '+
            '<TEXTAREA NAME="Address" ng-model="transcript"/>'+
            '<button class="btn btn-primary">Add to Transcript</button>'+
          '</div>'+
        '</div>'
    $("#addFields").click(function(){
      $('#translation-form').append(newField)
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

