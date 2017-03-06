var app = angular.module('app', ['ui-router']);


app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    // give name to state. in this case, it is 'firstMessage'
    // as a part of the stateProvider, you need to provide a new state by doing $stateProvider.state
    $stateProvider.state('hello',{
    
        // provide options for state in between the {}
        // url is specifying the route for the state

        url:'/hello',
        // template:'<strong>This is the first message</strong>'
        templateUrl:'hello.html',
        controller: 'hello'
    })
    // console.log('hello')
    $stateProvider.state('about',{
        url:'/about',
        templateUrl:'about.html',
        controller: 'about'
    })
    // .state('root',{
    //     url:'/',
    //     template: '<strong>You are at the root route</strong>'
    // });

    $urlRouterProvider.otherwise('/');
}]);


app.controller('hello',['$scope', function($scope){
    $scope.hello = "HI"
}]);

app.controller('about',['$scope', function($scope){
    $scope.about = "ABOUT";
}]);