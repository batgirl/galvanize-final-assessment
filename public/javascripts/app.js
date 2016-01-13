var app = angular.module('galvanizeGazette', ['ngRoute', 'ngResource', 'angular.filter']);

app.factory('Story', function($resource) {
  return $resource('/api/story/:id', {id: "@_id"})
})

app.controller("HomeController", function($scope, Story) {

  $scope.stories = Story.query(function() {
    console.log("yay!" + $scope.stories);
  });

  $scope.storyData = {};
  $scope.newStory = function() {
    var story = new Story($scope.storyData);
    story.opinions = [];
    story.$save();
    $scope.stories.push(story);
    $scope.storyData = {};
  }

})

app.controller("StoryController", function($scope, $routeParams, Story) {

    function wordCounter() {
      var opinionArray = $scope.story.opinions.join(" ").match(/[^_\W]+/g).join(" ").toLowerCase().split(" ");
      console.log(opinionArray);

      $scope.words = {};

      for (var i = 0; i < opinionArray.length; i++) {
        opinionArray[i].trim();
        if (opinionArray[i] != "the" ||
            opinionArray[i] != "a" ||
            opinionArray[i] != "i" ||
            opinionArray[i] != "it" ||
            opinionArray[i] != "of" ||
            opinionArray[i] != "not") {
          if (!$scope.words[opinionArray[i]]) {
            $scope.words[opinionArray[i]] = 1;
          } else {
            $scope.words[opinionArray[i]]++;
          }
        }
      }
    }

  $scope.story = Story.get({ id: $routeParams.id }, function() {
    wordCounter();
  })


  $scope.tmpOpinion = "";

  $scope.addOpinion = function() {
    if ($scope.tmpOpinion != "") {
      $scope.story.opinions.push($scope.tmpOpinion);
      wordCounter();
      $scope.story.$save();
    }
    $scope.tmpOpinion = "";
  }

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