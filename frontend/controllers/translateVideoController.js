app.controller('translateVideoController',['$scope', '$location', '$http', '$sce', function($scope, $location, $http, $sce){
  // console.log($location.$$path.slice(16))
  var paramsId = $location.$$path.slice(16)
  $scope.videoToTranslateUrl = ''
  var tempUrl = 'http://localhost:3000/videosToTranslate'
  $http({
    method: "GET",
    url: tempUrl
  }).then(
    function successFunction(videoData){
      $scope.videoData = videoData
      console.log(videoData.data[0].id)
      $scope.tempVideoPath = ''
      videoData.data.map((eachVideo, index)=>{
       // console.log(eachVideo)
       if(eachVideo.id == paramsId){
        var tempVideoPath = eachVideo.path.slice(7)
        // console.log(eachVideo.path.slice(7))
        // console.log(tempVideoPath)
        var myUrl = 'http://localhost:3000/' + tempVideoPath
        $scope.pleasWork = $sce.trustAsResourceUrl(myUrl)
       }
      })
    },
    function failedFunction(videoData){
      // console.log(videoData)
    }
  )


  $scope.entireTranscript = [];
  $scope.clickedTranscriptIndex=-1 
  $scope.editOrAddButton = 'Add to Transcript'
  $scope.addButtonClass = 'btn btn-primary'
  $scope.submitEachSection = function(){
    $scope.editOrAddButton = 'Add to Transcript'
    $scope.addButtonClass = 'btn btn-primary'
    var index = $scope.clickedTranscriptIndex
    var date = new Date();
    console.log(date)
        if(index == -1){
          
        $scope.entireTranscript.push({
          startTime: $scope.startTime,
          endTime: $scope.endTime,
          transcript: $scope.transcript,
          postedTime: date.toString().slice(0,21)
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
    $scope.startTime = theVid.currentTime.toFixed(2)
    // theVid.currentTime = 10
  } 
  $scope.endTimeFunc = function(){
    var theVid = document.getElementById("theVid")
      $scope.endTime = theVid.currentTime.toFixed(2)
  }


  $scope.submitForm = function(){

    $http({
      method:'POST',
      url: 'http://localhost:3000/transcript/',
      data: $scope.entireTranscript
    }).then(
      function successFunction(data){
        console.log(data)
      },
      function failedFunction(data){
        console.log("fail")
      }
    )
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

