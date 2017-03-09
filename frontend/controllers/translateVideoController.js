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
    	},
    	function failedFunction(onLoadData){
      // console.log(videoData)
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

	// Adding transcripts to video (shows on the right)
	$scope.submitEachSection = function(){
		if(addRange(Math.floor($scope.startTime*100), Math.floor($scope.endTime*100), $scope)){
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
  	}	 
  	$scope.endTimeFunc = function(){
		var theVid = document.getElementById("theVid")
		$scope.endTime = theVid.currentTime.toFixed(2)
		$scope.timeValidation = $scope.endTime	
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
		console.log(transcriptUrl)
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


var range = []

function addRange(startTime, endTime, $scope){
	if((range.indexOf(startTime) > -1)||(
		range.indexOf(endTime) > -1)){
		$scope.invalidRange = 'Invalid Range of Video'
		return false
	}else{
		for(let i = startTime; i < endTime; i++){
			range.push(i)
		}
		console.log('valid range')		
		$scope.invalidRange = ''
		return true
	}
	console.log(range)
}
