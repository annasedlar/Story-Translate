var app = angular.module('app', ['ui.router']);


app.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $sceDelegateProvider){
    // give name to state. in this case, it is 'firstMessage'
    // as a part of the stateProvider, you need to provide a new state by doing $stateProvider.state
    $stateProvider.state('home',{
        url:'/',
        templateUrl: 'views/home.html', 
        controller: 'homeController'

    })
    $stateProvider.state('videosToTranslate',{
    
        // provide options for state in between the {}
        // url is specifying the route for the state

        url:'/videosToTranslate',
        // template:'<strong>This is the first message</strong>'
        templateUrl:'views/videosToTranslate.html',
        controller: 'videosToTranslateController'
    })
    // console.log('hello')
    $stateProvider.state('translateVideo/',{
        url:'/translateVideo/:id',
        templateUrl:'views/translateVideo.html',
        controller: 'translateVideoController'
    })
    $stateProvider.state('uploadRawVideo',{
        url:'/uploadRawVideo',
        templateUrl:'views/uploadRawVideo.html',
        controller: 'uploadRawVideoController'
    })
    $stateProvider.state('finishedVideos',{
        url:'/finishedVideos',
        templateUrl:'views/finishedVideos.html',
        controller: 'finishedVideosController'
    })
    $stateProvider.state('videoProduct',{
        url:'/videoProduct',
        templateUrl:'views/videoProduct.html',
        controller: 'videoProductController'
    })        
    $urlRouterProvider.otherwise('/');
}]);

app.filter('trustUrl',function($sce){
    return function(url){
        return $sce.trustAsResourceUrl(url);
    }
})


