app.controller('videosToTranslateController',['$scope','$http','$sce', function($scope, $http,$sce){
   $scope.videoToBeTranslatedArray = [];
   var colors = [];
    var tempUrl = 'http://pauldkang.com:3030/videos'
    $scope.videoToBeTranslatedArray = [];
    var colors = [];
	var tempUrl = 'http://pauldkang.com:3030/videos'
    $http({
        method: "GET",
        url: tempUrl
    }).then(
        function successFunction(videoData){
            videoData.data.sort(function(a, b){
                if(a.familyName < b.familyName) return -1;
                if(a.familyName > b.familyName) return 1;
                return 0;
            })                
            $scope.videoData = videoData
            var tempFamilyName = 'no name';
            $scope.videoData.data.map((video, index)=>{
                var myUrl = 'http://pauldkang.com:3030/videos/' + video.name
                video.name = $sce.trustAsResourceUrl(myUrl)
                if(!index){
                    tempFamilyName = video.familyName
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
            $
        },
        function failedFunction(videoData){
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
            $http({
                method:'POST',
                url: 'http://pauldkang.com:3030/deleteVideo/',
                data: tempDataToSend
            }).then(
                function successFunction(data){
                  },
                function failedFunction(data){
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
                url: 'http://pauldkang.com:3030/videos/'
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
                }   
            )            
            $http({
                method:'POST',
                url: 'http://pauldkang.com:3030/deleteFamily/',
                data: dataToSend
            }).then(
                function successFunction(data){
                    console.log('successfully deleted family')
                  },
                function failedFunction(data){
                }
            )
        }
    }
}]);

































