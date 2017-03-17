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
      		entireTranscript.sort(function(a, b){return a.startTime-b.startTime});
      		console.log(entireTranscript)
      		$scope.entireTranscript = entireTranscript
      		var timeRangeArray = []
       		$scope.entireTranscript.map((eachTranscript, index)=>{
				timeRangeArray.push({
					startTime: Math.floor(eachTranscript.startTime*100),
					endTime: Math.floor(eachTranscript.endTime*100),
					// timeFrame: timeFrame.toString()
				})				
			})
			$scope.timeRange = timeRangeArray
    	},
    	function failedFunction(onLoadData){
		} 
  	)
	$scope.videoToTranslateUrl = ''
	var tempUrl = 'http://localhost:3000/videos'
	$http({
    	method: "GET",
    	url: tempUrl
  	}).then(
    	function successFunction(videoData){
      		// console.log(videoData)
      		videoData.data.map((eachVideo, index)=>{
       		// console.log(eachVideo)
       			if(eachVideo.token == paramsId){
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
	$scope.addButtonClass = 'btn #90a4ae blue-grey darken-1'

	// Adding transcripts to video (shows on the right)
	$scope.submitEachSection = function(){
		$scope.entireTranscript.sort(function(a, b){return a.startTime-b.startTime});
		if($scope.clickedTranscriptIndex > -1){
			var date = new Date();
			var day = (date.getUTCDate()).toString();
			var month = (date.getMonth()+1).toString(); 
			var year = (date.getUTCFullYear()).toString(); 

			var startMinutes = Math.floor($scope.startTime / 60);
			if(startMinutes < 10){
				startMinutes = '0'+ startMinutes;
			}
			var startSeconds = Math.floor($scope.startTime - startMinutes * 60);
			if(startSeconds < 10){
				startSeconds = "0"+ startSeconds;
			}
			var endMinutes = Math.floor($scope.endTime / 60);
			if(endMinutes < 10){
				endMinutes =  "0"+endMinutes;
			}
			var endSeconds = Math.floor($scope.endTime - endMinutes * 60);
			if(endSeconds < 10){
				endSeconds = "0"+ endSeconds;
			}

	        $scope.entireTranscript[$scope.clickedTranscriptIndex] = {
	      		startTime: $scope.startTime,
	        	endTime: $scope.endTime,
	          	transcript: $scope.transcript,
	          	postedTime: month+'/'+day+'/'+year,
	          	startMinsSecs: startMinutes+":"+startSeconds,
				endMinsSecs: endMinutes+":"+endSeconds
	          	
	        }
	        $scope.editOrAddButton = 'Add to Transcript'
	    	$scope.addButtonClass = 'btn #90a4ae blue-grey darken-1'
	    	$scope.clickedTranscriptIndex = -1
	    	$scope.transcript = ''
			$scope.startTimes = '00:00'
			$scope.endTimes = '00:00'
		}		
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
	    	$scope.addButtonClass = 'btn #90a4ae blue-grey darken-1'
			var index = $scope.clickedTranscriptIndex
			var date = new Date();
			var day = (date.getUTCDate()).toString();
			var month = (date.getMonth()+1).toString(); 
			var year = (date.getUTCFullYear()).toString(); 

			var startMinutes = Math.floor($scope.startTime / 60);
			if(startMinutes < 10){
				startMinutes = '0'+ startMinutes;
			}
			var startSeconds = Math.floor($scope.startTime - startMinutes * 60);
			if(startSeconds < 10){
				startSeconds = "0"+ startSeconds;
			}
			var endMinutes = Math.floor($scope.endTime / 60);
			if(endMinutes < 10){
				endMinutes =  "0"+endMinutes;
			}
			var endSeconds = Math.floor($scope.endTime - endMinutes * 60);
			if(endSeconds < 10){
				endSeconds = "0"+ endSeconds;
			}

	        if(index == -1){
	        	$scope.entireTranscript.push({
					startTime: $scope.startTime,
					endTime: $scope.endTime,
					transcript: $scope.transcript,
					postedTime: month+'/'+day+'/'+year,
					startMinsSecs: startMinutes+":"+startSeconds,
					endMinsSecs: endMinutes+":"+endSeconds
				})    

			}
			$scope.clickedTranscriptIndex = -1
			$scope.transcript = ''
			$scope.startTimes = '00:00'
			$scope.endTimes = '00:00'
			// document.getElementById('translation-form').reset();
		}
		// else{
	    	// $scope.invalidRange = "Your time range is invalid, please reset"
		// }
	}	
  	
  	$scope.startTimeFunc = function(){
    	var theVid = document.getElementById("theVid")
    	$scope.startTime = theVid.currentTime.toFixed(0)
    		var startMinutes = Math.floor($scope.startTime / 60);
			if(startMinutes < 10){
				startMinutes = '0'+ startMinutes;
			}
			var startSeconds = Math.floor($scope.startTime - startMinutes * 60);
			if(startSeconds < 10){
				startSeconds = "0"+ startSeconds;
			}
			$scope.startMins = startMinutes
			$scope.startSeconds = startSeconds
			$scope.startTimes = startMinutes+":"+startSeconds
    	theVid.play(); 
  	}	 
  	$scope.endTimeFunc = function(){
		var theVid = document.getElementById("theVid")
		var endTempTime = theVid.currentTime.toFixed(0);
		if(endTempTime > $scope.startTime){
			$scope.endTime = endTempTime
			var endMinutes = Math.floor($scope.endTime / 60);
			if(endMinutes < 10){
				endMinutes =  "0"+endMinutes;
			}
			var endSeconds = Math.floor($scope.endTime - endMinutes * 60);
			if(endSeconds < 10){
				endSeconds = "0"+ endSeconds;
			}
			$scope.endMins = endMinutes
			$scope.endSecs = endSeconds
			$scope.endTimes = endMinutes+":"+endSeconds
			theVid.pause(); 
		}
		
  	}
  	$scope.rewind = function(){
    	var theVid = document.getElementById("theVid")
    	theVid.currentTime -= 3
    	theVid.currentTime = theVid.currentTime
  	}	 
  	$scope.forward = function(){
    	var theVid = document.getElementById("theVid")
    	theVid.currentTime += 3
  	}	   	
  	$scope.pause = function(){
    	var theVid = document.getElementById("theVid")
    	theVid.pause();
  	}
  	$scope.play = function(){
    	var theVid = document.getElementById("theVid")
    	theVid.play();
  	}	   	  	  		   	  	
	$scope.changeFamilyName = function(){
		$scope.familyName = $scope.tempFamilyName
		var tempDataToSend = {
			familyName : $scope.familyName,
			token: $location.$$path.slice(16)
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
	$scope.saveForm = function(){
		var transcriptUrl = 'http://localhost:3000/transcript/' + $location.$$path.slice(16)
		$http({
			method:'POST',
      		url: transcriptUrl,
      		data: $scope.entireTranscript
    	}).then(
      		function successFunction(data){
        	console.log(data)
        	console.log("form submitted!")
        	$scope.submissionStatus = "Form Saved Successfully"
	      	},
    	  	function failedFunction(data){
	    	    console.log("fail")
			}
  		)
  	} 

	$scope.submitForm = function(){
		console.log($scope.entireTranscript)
		var transcriptUrl = 'http://localhost:3000/transcript/' + $location.$$path.slice(16);
		$http({
			method:'POST',
      		url: transcriptUrl,
      		data: $scope.entireTranscript
    	}).then(
      		function successFunction(data){			
				var finishedUrl = 'http://localhost:3000/finished/' + $location.$$path.slice(16);
		// 		console.log(finishedUrl)
				var dataArray = [1]
				$http({
					method:'POST',
		      		url: finishedUrl,
		      		data: dataArray
		    	}).then(
		      		function successFunction(data){
			        	console.log(data)
			        	console.log('worked')
			        	$scope.submissionStatus = "Form submission success"
				    },
		    	  	function failedFunction(data){
			    	    console.log("fail")
			    	    $scope.submissionStatus = "Form submission NOT successful, please try again"
					}
		  		)  		
	      	},
    	  	function failedFunction(data){
	    	    console.log("fail")
			}
  		)

  	}

	$scope.editTranscript = function(index){
	    $scope.editOrAddButton = 'Edit Transcript'
	    $scope.addButtonClass = 'btn #ff6f00 amber darken-4'
	    $scope.transcript = $scope.entireTranscript[index].transcript;
	    $scope.startTime = $scope.entireTranscript[index].startTime;
	    $scope.endTime = $scope.entireTranscript[index].endTime;
	    $scope.clickedTranscriptIndex = index;
	    var endTempTime = $scope.endTime
	    	if(endTempTime > $scope.startTime){
			$scope.endTime = endTempTime
			var endMinutes = Math.floor($scope.endTime / 60);
			if(endMinutes < 10){
				endMinutes =  "0"+endMinutes;
			}
			var endSeconds = Math.floor($scope.endTime - endMinutes * 60);
			if(endSeconds < 10){
				endSeconds = "0"+ endSeconds;
			}
			$scope.endMins = endMinutes
			$scope.endSecs = endSeconds
			$scope.endTimes = endMinutes+":"+endSeconds
		}
		var startMinutes = Math.floor($scope.startTime / 60);
		if(startMinutes < 10){
			startMinutes = '0'+ startMinutes;
		}
		var startSeconds = Math.floor($scope.startTime - startMinutes * 60);
		if(startSeconds < 10){
			startSeconds = "0"+ startSeconds;
		}
		$scope.startMins = startMinutes
		$scope.startSeconds = startSeconds
		$scope.startTimes = startMinutes+":"+startSeconds		
	}

	$scope.deleteTranscript = function(index){
		var deleteThis = confirm('Are you sure you want to delete this translation?');
		if(deleteThis){
			$scope.entireTranscript.splice(index, 1)
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
	}

}]);
