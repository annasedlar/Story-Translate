<a href='http://www.annasedlar.com/Story-Translate/frontend/#/'><div class='go-home3'><span class='glyphicon glyphicon-home'></span></div></a>

<div class="final-product-header"><h1>Click a video to translate or view</h1></div>
<div>
<!-- style="position:fixed; margin-top:20%; margin-left:4%; width:200px; z-index:6; background-color:lightgrey; height:70px; border-radius: 50%"> -->
{{deletedMessage}}</div>
    <div ng-repeat="video in videoData.data" class='translate-background'> 
        <div ng-class='video.skipClass' class='col-xs-12 skip-placeholder '>
            &nbsp;
        </div>
        <div ng-class='video.skipClass' class='col-xs-12 video-data-1'>{{video.familyName}}</div>
        <div class='col-lg-4 col-sm-6 col-xs-12 each-video-row'>
            <div class='card-panel card-class'>
                <button class='delete-button' ng-click='deleteVideo(video)'>x</button>
                <div class='each-video-description video-data-2' '>
                    <a ng-href='#/translateVideo/{{video.token}}'>
                        <video ng-src="{{video.name}}"></video>
                        <div class='translate-letter'>TRANSLATE</div>
                    </a>
                </div>
                <!-- <div>{{deletedMessage}}</div> -->
                <div class='each-video-description video-data-3' ng-class='video.classStyle'>
                    {{video.finished}}
                    <a ng-class='video.checkItOutClass' ng-href='#/videoProduct/{{video.token}}'>
                        <button class='btn teal accent-4 watch-button'>Complete</button>
                    </a>
                </div>
            </div>
        </div>








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
}]);