var app = angular.module('galvanizeGazette', ['ngRoute', 'ngResource']);

app.factory('Story', function($resource) {
  return $resource('/api/story/:id')
})

app.controller("HomeController", function($scope, $http, Story) {

  $scope.stories = Story.query(function() {
    console.log("yay!" + $scope.stories);
  });

  $scope.storyData = {};
  $scope.newStory = function() {
    var story = new Story($scope.storyData);
    story.$save();
    $scope.stories.push(story);
  }

})

app.controller("StoryController", function($scope, $http, $routeParams, Story) {
  // $scope.storyId = $routeParams.storyId;

  $scope.story = Story.get({ id: $routeParams.id }, function() {
    console.log($scope.story)
  })

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