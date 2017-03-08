app.controller('translateVideoController',['$scope', function($scope){
  $scope.entireTranscript = [];
  $scope.clickedTranscriptIndex=-1 
  $scope.editOrAddButton = 'Add to Transcript'
  $scope.addButtonClass = 'btn btn-primary'
  $scope.submitEachSection = function(){
    $scope.editOrAddButton = 'Add to Transcript'
    $scope.addButtonClass = 'btn btn-primary'
    var index = $scope.clickedTranscriptIndex
        if(index == -1){
          
        $scope.entireTranscript.push({
          startTime: $scope.startTime,
          endTime: $scope.endTime,
          transcript: $scope.transcript,
        })    
      }else{
        
        $scope.entireTranscript[index] = {
          startTime: $scope.startTime,
          endTime: $scope.endTime,
          transcript: $scope.transcript,
        }
      }
      $scope.clickedTranscriptIndex = -1
  }
  $scope.startTimeFunc = function(){
    var theVid = document.getElementById("theVid")
    $scope.startTime = theVid.currentTime
  } 
  $scope.endTimeFunc = function(){
    var theVid = document.getElementById("theVid")
      $scope.endTime = theVid.currentTime
  }

  // $scope.addField = function(){
  //   var theVid = document.getElementById("theVid")
  //   $scope.startTime = theVid.currentTime
  //   $scope.endTime = theVid.currentTime
  //   console.log($scope.startTime)
  //   console.log($scope.endTime)
  //   console.log($scope.entireTranscript)
  //   var newField ='<div class="new-sections">' +
  //       '<div class="col-sm-12">'+
  //         '<button class="btn btn-info" ng-click="startTimeFunc(counter)">'+
  //                       'Set Start Time'+
  //         '</button>'+
  //         '<button class="btn btn-info" ng-click="endTimeFunc(counter)">'+
  //             'Set End Time'+
  //         '</button> '+
  //       '</div>  '+ 
  //       '<div class="col-xs-6">Start Time:'+$scope.startTime+' </div><div class="col-xs-6">End Time: '+$scope.endTime+'</div>'+
  //         'Enter Translations: '+
  //           '<TEXTAREA NAME="Address" ng-model="transcript"/>'+
  //           '<button class="btn btn-primary">Add to Transcript</button>'+
  //         '</div>'+
  //       '</div>'
  //     $('#translation-form').append(newField)
  // }

  $scope.submitForm = function(){

    // somehow use ngRoute
    $(document).ready(function() {
      $("#submit-button").click(function() {
       $("#translation-form").submit();
      });
    });
  }
  $scope.makeMeClickable = function(index){
    console.log($scope.entireTranscript[index])
    $scope.editOrAddButton = 'Edit Transcript'
    $scope.addButtonClass = 'btn btn-warning'
    $scope.transcript = $scope.entireTranscript[index].transcript
    $scope.startTime = $scope.entireTranscript[index].startTime
    $scope.endTime = $scope.entireTranscript[index].endTime
    $scope.clickedTranscriptIndex = index
  }
}]);

