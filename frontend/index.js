var app = angular.module('app', ['ui.router', 'ui.materialize', 'ngCookies', 'Authentication']);

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
 
angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'ngRoute',
    'ngCookies'
])

app.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, $sceDelegateProvider){
    $stateProvider.state('home',{
        url:'/',
        templateUrl: 'views/home.html', 
        controller: 'homeController'
    })
    $stateProvider.state('videosToTranslate',{
        url:'/videosToTranslate',
        templateUrl:'views/videosToTranslate.html',
        controller: 'videosToTranslateController'
    })
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

  
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);