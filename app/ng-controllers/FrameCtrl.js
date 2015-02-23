lurchApp.controller('FrameCtrl', ['$scope', function ($scope) {

  // Close window
  $scope.close = function () {
    global.nwWindow.close();
  };

  // Minimize window
  $scope.minimize = function () {
    global.nwWindow.minimize();
  };

}]);
