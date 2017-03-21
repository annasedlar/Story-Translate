app.controller('videoProductController',  function($scope, $location, $http, $sce, $interval){
 $scope.currentlyPlaying = false;
  $scope.thisOne = true;
  $scope.currentlyPlaying = function(video){
    $scope.thisOne = false;
    console.log()
  } 
  var paramsId = $location.$$path.slice(14)
	var tempUrl = 'http://annasedlar.com:3000/videosFinished'
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
        			var myUrl = 'http://annasedlar.com:3000/' + tempVideoPath
        			$scope.productVideo = $sce.trustAsResourceUrl(myUrl)
        			var familyNameURI = encodeURI($scope.familyName)
					var transcriptUrl = 'http://annasedlar.com:3000/videosByFamilyName/' + familyNameURI
					$http({
				    	method: "GET",
				    	url: transcriptUrl
				  	}).then(
				    	function successFunction(familyData){
				    		console.log(familyData)
				      		var familyArray = familyData.data
				      		var familyVideoHTML = []
				      		familyArray.map((video, index)=>{
				      			var myUrl = 'http://annasedlar.com:3000/' + video.path.slice(7)
				      			// console.log(video)
				      			var tempSceThing = $sce.trustAsResourceUrl(myUrl)	
				      			var finishedClass = ''
				      			// var editUrl = ''
				      			var editUrl = '#/translateVideo/' + video.token
				      			var selectUrl = '#/videoProduct/' + video.token 
				      			var showOrNot = false
                    // var currentlyPlaying = "Currently Playing"
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
	var transcriptUrl = 'http://annasedlar.com:3000/transcript/' + paramsId
	$http({
    	method: "GET",
    	url: transcriptUrl
  	}).then(
    	function successFunction(transcriptData){
          var datesArray = [];
      		var transcriptArray = JSON.parse(transcriptData.data[0].transcript)
      		$scope.transcriptHTML = transcriptArray
          // $scope.lastModified = transcriptArray[0].postedTime
          // var date = Date(headers()['lastModified']);
          // $scope.lastModified['postedTime'] = date;
          // console.log(transcriptArray[1].postedTime)
          // $scope.transcriptArray.map((transcript, index)=>{
          //     datesArray.push({
          //       lastModified: transcriptArray.postedTime

          //     })
          //     $scope.lastModified = datesArray
          // })
          // console.log($scope.transcriptHTML[2].postedTime) //displays posted time for that particular transcript
          // console.log("transcript data: " + transcriptData.data[0].transcript)
    	},
    	function failedFunction(videoData){}
  	)  	
  	var video = document.getElementById('productVideoPlaying')
  	// console.dir(videoPlaying.currentTime)
  	
  	$scope.currentTranscript = ""

  	var displayInterval = $interval(function(){
  		var videoCurrentTime = Math.floor(video.currentTime*100)
  		$scope.transcriptHTML.map((video, index)=>{
  			// var parsedTranscript = JSON.parse(video.transcript)
  			// console.log(video)
  			// console.log(video.startTime)
  			if((videoCurrentTime > video.startTime * 100)&&(videoCurrentTime < video.endTime * 100)){
  				$scope.currentTranscript = video.transcript
  				// console.log($scope.)
  				console.log(video.transcript)
  			}else{
  				// $scope.currentTranscript = ''
  			}
  		})	
  	},50);
});