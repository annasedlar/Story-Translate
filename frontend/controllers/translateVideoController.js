app.controller('translateVideoController',['$scope', '$location', '$http', '$sce', function($scope, $location, $http, $sce){
	var paramsId = $location.$$path.slice(16)
	var onLoadUrl = 'http://localhost:3000/transcript/' + paramsId
	$http({
    	method: "GET",
    	url: onLoadUrl
  	}).then(
    	function successFunction(onLoadData){
      		var transcriptString = onLoadData.data[0].transcript
      		// console.log(JSON.parse(transcriptString)[0])
      		var entireTranscript = JSON.parse(transcriptString)
      		$scope.entireTranscript = entireTranscript
      		var timeRangeArray = []
      		$scope.entireTranscript.map((eachTranscript, index)=>{
				timeRangeArray.push({
					startTime: Math.floor(eachTranscript.startTime*100),
					endTime: Math.floor(eachTranscript.endTime*100)
				})				
			})
			$scope.timeRange = timeRangeArray
    	},
    	function failedFunction(onLoadData){
		}
  	)

	$scope.videoToTranslateUrl = ''
	var tempUrl = 'http://localhost:3000/videosToTranslate'
	$http({
    	method: "GET",
    	url: tempUrl
  	}).then(
    	function successFunction(videoData){
      		// console.log(videoData)
      		videoData.data.map((eachVideo, index)=>{
       		// console.log(eachVideo)
       			if(eachVideo.id == paramsId){
        			var tempVideoPath = eachVideo.path.slice(7)
        			$scope.familyName = eachVideo.familyName
			        // console.log(eachVideo.path.slice(7))
			        console.log(tempVideoPath)
        			var myUrl = 'http://localhost:3000/' + tempVideoPath
        		$scope.pleasWork = $sce.trustAsResourceUrl(myUrl)
       			}
      		})
    	},
    	function failedFunction(videoData){
		}
  	)
  	$scope.rangePossible = false;
	$scope.entireTranscript = [];
	$scope.clickedTranscriptIndex=-1 
	$scope.editOrAddButton = 'Add to Transcript'
	$scope.addButtonClass = 'btn btn-primary'

	// Adding transcripts to video (shows on the right)
	$scope.submitEachSection = function(){
	  var tempRange = []
	  var timeRangeArray = $scope.timeRange
	  var startTime = Math.floor($scope.startTime*100)
	  var endTime = Math.floor($scope.endTime*100)
	  for(let i = 0; i < timeRangeArray.length; i++){
	    if(startTime < timeRangeArray[i].endTime){
	      tempRange.push(timeRangeArray[i])
	    }
	  }
	  
	  var inBetween = true
	  for(let j = 0; j<tempRange.length; j++){
	    if(endTime < tempRange[j].startTime){
	    }else{
	    	inBetween = false
	    }
	  }  
	  
	  var beforeEverything = true;
	  for(let i = 0; i < timeRangeArray.length; i++){
	    if((endTime < timeRangeArray[i].startTime)&&(endTime < timeRangeArray[i].endTime)){
	    }else{
	    	beforeEverything = false;
	    }
	  }
	  
	  var afterEverything = true;
	  for(let i = 0; i<timeRangeArray.length; i++){
	    if((startTime > timeRangeArray[i].startTime)&&(startTime > timeRangeArray[i].endTime)){
	    }else{
	    	afterEverything = false;
	    }
	  }  
	  console.log(inBetween, beforeEverything, afterEverything)
	  if(((inBetween)||(beforeEverything)||(afterEverything))&&(startTime < endTime)){
	    timeRangeArray.push({
	    	startTime: startTime,
	    	endTime: endTime
	    })
	    $scope.timeRange = timeRangeArray;
			$scope.editOrAddButton = 'Add to Transcript'
	    	$scope.addButtonClass = 'btn btn-primary'
			var index = $scope.clickedTranscriptIndex
			var date = new Date();
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
	}	
  	
  	$scope.startTimeFunc = function(){
    	var theVid = document.getElementById("theVid")
    	$scope.startTime = theVid.currentTime.toFixed(2)
    	// theVid.currentTime = 5
  	}	 
  	$scope.endTimeFunc = function(){
		var theVid = document.getElementById("theVid")
		var endTempTime = theVid.currentTime.toFixed(2);
		if(endTempTime > $scope.startTime){
			$scope.endTime = endTempTime
		}
  	}

	$scope.changeFamilyName = function(){
		$scope.familyName = $scope.tempFamilyName
		var tempDataToSend = {
			familyName : $scope.familyName,
			id: $location.$$path.slice(16)
		}
  	    $http({
			method:'POST',
      		url: 'http://localhost:3000/changeFamilyName/',
      		data: tempDataToSend
    	}).then(
	      	function successFunction(data){
		        console.log(data)
    		  },
      		function failedFunction(data){
        		console.log("fail")
      		}
    	)
  	}

  	// send transcript to the backend
	$scope.submitForm = function(){
		var transcriptUrl = 'http://localhost:3000/transcript/' + $location.$$path.slice(16)
		$http({
			method:'POST',
      		url: transcriptUrl,
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

	$scope.editTranscript = function(index){
	    $scope.editOrAddButton = 'Edit Transcript'
	    $scope.addButtonClass = 'btn btn-warning'
	    $scope.transcript = $scope.entireTranscript[index].transcript
	    $scope.startTime = $scope.entireTranscript[index].startTime
	    $scope.endTime = $scope.entireTranscript[index].endTime
	    $scope.clickedTranscriptIndex = index
	}

	$scope.deleteTranscript = function(index){
		$scope.entireTranscript.splice(index, 1)
	}

}]);
