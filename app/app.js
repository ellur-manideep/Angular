var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactController'
    })
    .when('/contact-success', {
      templateUrl: 'views/contact-success.html',
      controller: 'contactController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    }).otherwise({
      redirectTo: '/home'
    });

}]);

myNinjaApp.directive("randomNinja", [function(){

  return {
    restrict: 'E',
    scope: {
      ninjas: "=",
      title: "="
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope){
      $scope.random = Math.floor(Math.random() * 4);
    }
  };

}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http){

  $scope.removeNinja = function(ninja){
    var removedNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removedNinja, 1);
  };

  $scope.addNinja = function(){
    $scope.ninjas.push({
      name: $scope.newNinja.name,
      belt: $scope.newNinja.belt,
      rate: parseInt($scope.newNinja.rate),
      available: true
    });
    $scope.newNinja.name = "";
    $scope.newNinja.belt = "";
    $scope.newNinja.rate = "";



  };

  $scope.removeAll = function(){
    $scope.ninjas=[];


  };

/*  $http.get('data/ninjas.json').success(function(res){
      $scope.ninjas = res;
  });*/
  $http({
     method: "GET",
     url: "./data/ninjas.json"
   }).then(function successCallback(response) {
       /* this callback will be called asynchronously when the response is available */
     $scope.ninjas = response.data;
   }, function errorCallback(response) {
     /* called asynchronously if an error occurs or server returns response with an error status. */
     console.log("Error " + response.status + ": " + response.data)
  });

}]);

myNinjaApp.controller("contactController", ['$scope', '$location', function($scope, $location){
  $scope.sendMessage = function(){
    $location.path('/contact-success');
  };
}]);
