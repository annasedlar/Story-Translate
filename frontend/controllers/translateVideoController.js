
app.controller('translateVideoController',['$scope', function($scope){
    $scope.about = "ABOUT";
    $scope.videoURL = $('#target-video').html('<iframe src="https://www.youtube.com/embed/PeonBmeFR8o?ecver=2" width="640" height="360" frameborder="0" style="position:absolute;width:100%;height:100%;left:0" allowfullscreen></iframe>')
}]);


