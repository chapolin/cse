angular.module('cse.controller.game.defails', [])

.controller('GameDetailsCtrl', function($scope, $http, $stateParams, Game) {
    $scope.formatDate = formatDate;
    
    Game.get($scope, $http, $stateParams.gameId);
});
