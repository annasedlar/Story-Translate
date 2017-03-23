app.controller('videoProductController',  function($scope, $location, $http, $sce, $interval){
 $scope.transcriptHTML = []
  var paramsId = $location.$$path.slice(14)
	var tempUrl = 'http://localhost:3000/videosFinished'
	$http({
    	method: "GET",
    	url: tempUrl
  	}).then(
    	function successFunction(videoData){
    		$scope.videoData = videoData
      		videoData.data.map((eachVideo, index)=>{
       			if(eachVideo.token == paramsId){
        			var tempVideoPath = eachVideo.path.slice(7)
        			$scope.familyName = eachVideo.familyName
        			var myUrl = 'http://localhost:3000/' + tempVideoPath
        			$scope.productVideo = $sce.trustAsResourceUrl(myUrl)
        			var familyNameURI = encodeURI($scope.familyName)
					var transcriptUrl = 'http://localhost:3000/videosByFamilyName/' + familyNameURI
					$http({
				    	method: "GET",
				    	url: transcriptUrl
				  	}).then(
				    	function successFunction(familyData){
				    		console.log(familyData)
				      		var familyArray = familyData.data
				      		var familyVideoHTML = []
				      		familyArray.map((video, index)=>{
				      			var myUrl = 'http://localhost:3000/' + video.path.slice(7)
                    var showCPorNot = ''
                    if(video.token == $location.$$path.slice(14)){
                      showCPorNot = 'displayCP'
                      console.log(video.token)
                    }else{
                      showCPorNot = 'hideCP'
                    }
				      			var tempSceThing = $sce.trustAsResourceUrl(myUrl)	
				      			var finishedClass = ''
				      			var editUrl = '#/translateVideo/' + video.token
				      			var selectUrl = '#/videoProduct/' + video.token 
				      			var showOrNot = false
				      			if(video.finished){
				      				finishedClass = 'greenClass';
				      				showOrNot = true;
				      			}else{
				      				finishedClass = 'redClass';
				      			}
				      			familyVideoHTML.push({
				      				sce: tempSceThing,
				      				editUrl : editUrl,
				      				finishedClass: finishedClass,
				      				showOrNot: showOrNot,
                      selectUrl: selectUrl,
                      showCPorNot: showCPorNot
				      			})
				      		})
				      		$scope.familyVideoHTML = familyVideoHTML
				    	},
				    	function failedFunction(videoData){}
				  	)  	  		        			
       			}
      		})
    	},
    	function failedFunction(videoData){}
  	)
	var transcriptUrl = 'http://localhost:3000/transcript/' + paramsId
	$http({
    	method: "GET",
    	url: transcriptUrl
  	}).then(
    	function successFunction(transcriptData){
          var datesArray = [];
      		var transcriptArray = JSON.parse(transcriptData.data[0].transcript)
          transcriptArray.sort(function(a, b){return a.startTime-b.startTime});
          transcriptArray.map((transcript, index)=>{
            var date = new Date();
            var day = (date.getUTCDate()).toString();
            var month = (date.getMonth()+1).toString(); 
            var year = (date.getUTCFullYear()).toString(); 
            var startMinutes = Math.floor(transcript.startTime / 60);
            if(startMinutes < 10){
              startMinutes = '0'+ startMinutes;
            }
            var startSeconds = Math.floor(transcript.startTime - startMinutes * 60);
            if(startSeconds < 10){
              startSeconds = "0"+ startSeconds;
            }
            var endMinutes = Math.floor(transcript.endTime / 60);
            if(endMinutes < 10){
              endMinutes =  "0"+endMinutes;
            }
            var endSeconds = Math.floor(transcript.endTime - endMinutes * 60);
            if(endSeconds < 10){
              endSeconds = "0"+ endSeconds;
            }
            transcript.startTimes = startMinutes+":"+startSeconds,
            transcript.endTimes = endMinutes+":"+endSeconds
          })                 
      		$scope.transcriptHTML = transcriptArray

    	},
    	function failedFunction(videoData){}
  	)  	
  	var video = document.getElementById('productVideoPlaying')
  	$scope.currentTranscript = ""
    var counter = 0
  	var displayInterval = $interval(function(){
  		var videoCurrentTime = Math.floor(video.currentTime*100)
  		$scope.transcriptHTML.map((video, index)=>{
  			if((videoCurrentTime > video.startTime * 100)&&(videoCurrentTime < video.endTime * 100)){
          counter = 0;
  				$scope.currentTranscript = video.transcript
  			}else if(counter>100){
          $scope.currentTranscript = ''
        }else{
          counter++
  			}
  		})	
  	},50);
});