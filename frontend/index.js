var app = angular.module('app', ['ui.router', 'ui.materialize', 'ngCookies']);

//declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('BasicHttpAuthExample', ['Authentication', 'Home','ngCookies']);

app.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$AuthenticationService' function($stateProvider, $urlRouterProvider, $sceDelegateProvider, AuthenticationService){
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
    $stateProvider.state('videoProduct/',{
        url:'/videoProduct/:id',
        templateUrl:'views/videoProduct.html',
        controller: 'videoProductController'
    })        
    $stateProvider.state('login',{
        url:'/login',
        templateUrl: 'views/login.html',
        controller: 'loginController'
    })
    $urlRouterProvider.otherwise('/');
}]);

app.filter('trustUrl',function($sce){
    return function(url){
        return $sce.trustAsResourceUrl(url);
    }
})

app.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
  
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
