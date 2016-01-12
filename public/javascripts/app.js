var app = angular.module('galvanizeGazette', ['ngRoute', 'ngResource']);

app.factory('Story', function($resource) {
  return $resource('/api/story/:storyId')
})

app.controller("HomeController", function($scope, $http, Story) {

  $scope.stories = Story.query(function() {
    console.log("yay!" + $scope.stories);
  });

  $scope.storyData = {};
  $scope.newStory = function() {
    var story = new Post($scope.storyData);
    story.$save();
  }
  
})

app.controller("StoryController", function($scope, $http, $routeParams) {
  // $scope.storyId = $routeParams.storyId;
})

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'partials/home.html',
    controller: 'HomeController'
  })
  .when('/story/:id', {
    templateUrl: 'partials/story.html',
    controller: 'StoryController'
  })
}])