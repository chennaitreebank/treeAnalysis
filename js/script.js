(function() {

  var app = angular.module("treeAnalysis", []);
  var githubController = function($scope, githubService) {
    var apiUrl = "https://api.github.com/repos/chennaitreebank/treeAnalysis/contents";
    var lstFilePath = "/data/treelist.json";
    var analysisDataPath = "/data/analysisFiles/";
    $scope.lstTrees = {};
	$scope.commonname= "";
    var ongetFileSuccess = function(response) {
            $scope.lstTrees =JSON.parse( atob(response.content));
            $scope.sha = response.sha;
    };

    $scope.createFileClick = function() {
      var url = apiUrl + lstFilePath + "?access_token=c44e6deef5e10a31a6ffbba296601beed501cc82";
      $scope.lstTrees.push({"commonname" : $scope.commonname,"botanicalname":$scope.botanicalname, "filename":$scope.botanicalname +".json"});
      //Update the Json List trees file with the new tree 
      

      var updatedData = {
        path: "/data/treelist.json",
        message: "Update the trees list json file",
        content: btoa(angular.toJson($scope.lstTrees)),
        branch: "master",
        sha: $scope.sha
      };

      githubService.updateFile(url, updatedData);
      
      //Create a New file
      var newFileData = {
        message: "New file request",
        content: btoa(angular.toJson($scope.lstTrees)),
        contenttype: "application/json",
        branch: "master"
      };

      githubService.createFile(url, newFileData);
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };

    $scope.getFileContentClick = function() {
      var url = apiUrl + analysisDataPath + "?access_token=c44e6deef5e10a31a6ffbba296601beed501cc82";
      githubService.getFileContents(url)
        .then(
          function(data) {
            $scope.fileData = data;
          });
    };
	
	$scope.getTreeInformationFile = function(){
		var url = apiUrl+analysisDataPath+$scope.filename + "?access_token=c44e6deef5e10a31a6ffbba296601beed501cc82";
		githubService.getFileContents(url).then(
          function(response) {
            $scope.treeData = data;
          },
          function(response) {
            
          })
		
	}

    $scope.getListOfTrees = function() {
      var url = apiUrl + lstFilePath + "?access_token=c44e6deef5e10a31a6ffbba296601beed501cc82";
      githubService.getFileContents(url)
        .success(ongetFileSuccess);
    };


    $scope.updateButtonClick = function() {
      var url = "https://api.github.com/repos/chennaitreebank/poc/contents/test4.txt?access_token=c44e6deef5e10a31a6ffbba296601beed501cc82";

      var data = {
        path: "test4.txt",
        message: "New file request",
        content: "WwogICB7CiAgICAgICJOYW1lIiA6ICJNYWhlc2ggUGFyYXNoYXIiLAogICAg\nICAiUm9sbE5vIiA6IDEwMSwKICAgICAgIlBlcmNlbnRhZ2UiIDogIjgwJSIK\nICAgfSwKCQogICB7CiAgICAgICJOYW1lIiA6ICJEaW5rYXIgS2FkIiwKICAg\nICAgIlJvbGxObyIgOiAyMDEsCiAgICAgICJQZXJjZW50YWdlIiA6ICI3MCUi\nCiAgIH0sCgkKICAgewogICAgICAiTmFtZSIgOiAiUm9iZXJ0IiwKICAgICAg\nIlJvbGxObyIgOiAxOTEsCiAgICAgICJQZXJjZW50YWdlIiA6ICI3NSUiCiAg\nIH0sCgkKICAgewogICAgICAiTmFtZSIgOiAiSnVsaWFuIEpvZSIsCiAgICAg\nICJSb2xsTm8iIDogMTExLAogICAgICAiUGVyY2VudGFnZSIgOiAiNzclIgog\nICB9Cl0K\n",
        branch: "master",
        sha: "4a576e515fb4ff404798666feab9b206744349fd"
      };

      githubService.updateFile(url, data);
    };

    $scope.getListOfTrees();
  };
  app.controller("githubController", githubController);
}());