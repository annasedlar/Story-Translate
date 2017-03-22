app.controller('videosToTranslateController',['$scope','$http','$sce', function($scope, $http,$sce){
   $scope.videoToBeTranslatedArray = [];
   var colors = [];
    var tempUrl = 'http://annasedlar.com:3000/videos'
    // $scope.imagePath = 'http://image.tmdb.org/t/p/w300/';
    $scope.videoToBeTranslatedArray = [];
    var colors = [];
	var tempUrl = 'http://annasedlar.com:3000/videos'
	// $scope.imagePath = 'http://image.tmdb.org/t/p/w300/';
    $http({
        method: "GET",
        url: tempUrl
    }).then(
        function successFunction(videoData){
            // console.log(videoData)
            videoData.data.sort(function(a, b){
                if(a.familyName < b.familyName) return -1;
                if(a.familyName > b.familyName) return 1;
                return 0;
            })                

            $scope.videoData = videoData

            var tempFamilyName = '';
            $scope.videoData.data.map((video, index)=>{
                var myUrl = 'http://annasedlar.com:3000/videos/' + video.name
                video.name = $sce.trustAsResourceUrl(myUrl)
                if(!index){
                    tempFamilyName = video.familyName
                    // video.skipClass = 'hide-class'
                }else if(video.familyName.toUpperCase() == tempFamilyName.toUpperCase()){
                    video.familyName = ''
                    video.skipClass = 'hide-class'
                
                }else{
                    tempFamilyName = video.familyName
                    video.skipClass = 'nothing'
                    
                }
                if(video.finished){
                    video.finished = ''
                    video.classStyle = 'video-complete'
                    video.checkItOutClass = ''
                    
                }else{
                    video.finished = 'Incomplete'
                    video.classStyle = 'video-incomplete'
                    video.checkItOutClass = 'displayNone'
                   
                }

            })
            console.log($scope.videoData.data[0].classStyle)
            // $scope.videoToBeTranslatedArray.push(videoData.data)
            // $scope.tempArray = []

            // videoData.data.map((eachVideo, index)=>{
            //     console.log(eachVideo)
            //     $scope.videoToBeTranslatedArray.push(eachVideo.name)
            // })
        },
        function failedFunction(videoData){
            // console.log(videoData)
        }
    )

    $scope.deleteVideo = function(video){
        var deleteVid = confirm("Delete Video?")
        if(deleteVid){
            var tempDataToSend = {
                token: video.token
            }
            $scope.videoData.data.map((vid, index)=>{
                if(vid.token == video.token){
                    $scope.videoData.data.splice(index,1)
                }
            })
            console.log($scope.videoData.data['video'])
            // console.log(tempDataToSend.token)
            $http({
                method:'POST',
                url: 'http://annasedlar.com:3000/deleteVideo/',
                data: tempDataToSend
            }).then(
                function successFunction(data){
                    // console.log(data)
                  },
                function failedFunction(data){
                    // console.log("fail")
                }
            )
        }
    }   
    $scope.indexArray = [];
    $scope.deleteFamily = function(familyName){
        
        var deletedFam = confirm("Are you sure you want to delete all videos for " + familyName + "?")
        if(deletedFam){
            var dataToSend =  {
                familyName: familyName
            }
            $http({
                method: "GET",
                url: 'http://annasedlar.com:3000/videos/'
            }).then(
                function successFunction(videoData){
                    videoData.data.map((video, index)=>{
                        if(video.familyName == familyName){
                            $scope.videoData.data.map((vid,index2)=>{
                                if(vid.id == video.id){
                                    $scope.videoData.data.splice(index2,1)
                                }
                            })
                        }
                    })
                },
                function failedFunction(data){
                // console.log("fail")
                }   
            )            
            $http({
                method:'POST',
                url: 'http://annasedlar.com:3000/deleteFamily/',
                data: dataToSend
            }).then(
                function successFunction(data){
                    console.log('successfully deleted family')
                  },
                function failedFunction(data){
                    // console.log("fail")
                }
            )
        }
    }
}]);

































