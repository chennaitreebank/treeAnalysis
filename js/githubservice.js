(function() {
  var githubService = function($http) {

    var createFile = function(url, data) {
      return $http.put(url, data)
        .then(
          function(response) {
            return response.content;
          });
    };

    var updateFile = function(url, data) {
      return $http.put(url, data)
        .then(
          function(response) {
            return true;
          },
          function(response) {
            return false;
          });
    };

    var getFileContents = function(url) {
      return $http.get(url)
        .success(
          function(response) {
            return response.content;
          });
    };

    return {
      createFile: createFile,
      updateFile: updateFile,
      getFileContents: getFileContents
    };

  };
   var module = angular.module("treeAnalysis");
    module.factory("githubService", githubService);
}());