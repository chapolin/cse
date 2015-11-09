angular.module('starter.services', [])
.factory('Game', function() {
  return {
    get: function($scope, $http, $gameId) {
      $http.get(HOST_API + '/game/' + $gameId).success(function(game) {
        game.date = formatDate(game.date);

        $scope.game = game;

        $("#loading-game").addClass("hide");
      });
    },
    all: function($scope, $http) {
      $http.get(HOST_API + '/games').success(function(data) {
        if(data[0] && !data[0]._id) {
          data = [];
        }

        for(var i in data) {
            data[i].date = formatDate(data[i].date);  
        }  

        $scope.games = data;

        $("#loading-games").addClass("hide");
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete')
     });
    },
    allJogadores: function($scope, $http) {
      $http.get(HOST_API + '/players').success(function(data) {
        for(var i in data) {
          data[i].checked = false;
        }

        $scope.jogadores = data;

        $("#loading-players").addClass("hide");
      }).finally(function() {
        $scope.$broadcast('scroll.refreshComplete')
     });      
    },
    saveInformation: function($key, $value) {
      gameData[$key] = $value;
    },
    sendInformations: function($http, $state) {
      var postData = {
        players: [], 
        place: gameData.match.place, 
        date: gameData.match.date,
        time: gameData.match.time,
        versus: gameData.match.versus,
        friendly: gameData.match.friendly === true
      };

      for(var i in gameData.players) {
        if(gameData.players[i].checked) {
          postData.players.push(gameData.players[i]._id);
        }
      }

      $http.post(HOST_API + '/game', postData).then(function(response) {
        $state.go("tab.game");
      });
    },
    remove: function($http, $state, $game) {
      $http.delete(HOST_API + '/game/' + $game._id).then(function() {
        $state.reload("tab.game");
      });
    },
    doScore: function($http, $scope, $state, callback, params) {
      $http.post(HOST_API + '/score', params).then(function(response) {
        callback();

        for(var i in $scope.jogadores) {
          $scope.jogadores[i].checked = false;
        }

        $scope.ownScore = true;

        $state.go("tab.game-details", {gameId: params.game});
      });
    }
  };
});
