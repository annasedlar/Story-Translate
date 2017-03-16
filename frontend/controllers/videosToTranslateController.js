app.controller('videosToTranslateController',['$scope','$http','$sce', function($scope, $http,$sce){
   $scope.videoToBeTranslatedArray = [];
   var colors = [];
    var tempUrl = 'http://localhost:3000/videos'
    // $scope.imagePath = 'http://image.tmdb.org/t/p/w300/';
    $scope.videoToBeTranslatedArray = [];
    var colors = [];
	var tempUrl = 'http://localhost:3000/videos'
	// $scope.imagePath = 'http://image.tmdb.org/t/p/w300/';

    $http({
        method: "GET",
        url: tempUrl
    }).then(
        function successFunction(videoData){
            console.log(videoData)
            videoData.data.sort(function(a, b){
                if(a.familyName < b.familyName) return -1;
                if(a.familyName > b.familyName) return 1;
                return 0;
            })                

            $scope.videoData = videoData

            var tempFamilyName = '';
            $scope.videoData.data.map((video, index)=>{
                var myUrl = 'http://localhost:3000/videos/' + video.name
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
}]);