app.controller('videoProductController',  function($scope, $location, $http, $sce, $interval){
	var paramsId = $location.$$path.slice(14)
	var tempUrl = 'http://annasedlar.com:3003/videosFinished'
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
        			var myUrl = 'http://annasedlar.com:3003/' + tempVideoPath
        			$scope.productVideo = $sce.trustAsResourceUrl(myUrl)
        			var familyNameURI = encodeURI($scope.familyName)
					var transcriptUrl = 'http://annasedlar.com:3003/videosByFamilyName/' + familyNameURI
					$http({
				    	method: "GET",
				    	url: transcriptUrl
				  	}).then(
				    	function successFunction(familyData){
				    		console.log(familyData)
				      		var familyArray = familyData.data
				      		var familyVideoHTML = []
				      		familyArray.map((video, index)=>{
				      			var myUrl = 'http://annasedlar.com:3003/' + video.path.slice(7)
				      			// console.log(video)
				      			var tempSceThing = $sce.trustAsResourceUrl(myUrl)	
				      			var finishedClass = ''
				      			// var editUrl = ''
				      			var editUrl = '#/translateVideo/' + video.id 
				      			var selectUrl = '#/videoProduct/' + video.id 
				      			var showOrNot = false
				      			if(video.finished){
				      				finishedClass = 'greenClass'
				      				showOrNot = true;
				      			}else{
				      				finishedClass = 'redClass'
				      			}
				      			familyVideoHTML.push({
				      				sce: tempSceThing,
				      				editUrl : editUrl,
				      				finishedClass: finishedClass,
				      				showOrNot: showOrNot,
                      selectUrl: selectUrl
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
	var transcriptUrl = 'http://annasedlar.com:3003/transcript/' + paramsId
	$http({
    	method: "GET",
    	url: transcriptUrl
  	}).then(
    	function successFunction(transcriptData){
      		var transcriptArray = JSON.parse(transcriptData.data[0].transcript)
      		$scope.transcriptHTML = transcriptArray
      		
      		
    	},
    	function failedFunction(videoData){}
  	)  	
  	var video = document.getElementById('productVideoPlaying')
  	// console.dir(videoPlaying.currentTime)
  	
  	$scope.currentTranscript = "Translation: "

  	var displayInterval = $interval(function(){
  		var videoCurrentTime = Math.floor(video.currentTime*100)
  		$scope.transcriptHTML.map((video, index)=>{
  			// var parsedTranscript = JSON.parse(video.transcript)
  			// console.log(video)
  			// console.log(video.startTime)
  			if((videoCurrentTime > video.startTime * 100)&&(videoCurrentTime < video.endTime * 100)){
  				$scope.currentTranscript = "Translation: " +video.transcript
  				// console.log($scope.)
  				console.log(video.transcript)
  			}else{
  				// $scope.currentTranscript = ''
  			}
  		})	
  	},50);
});