angular.module('starter.services', [])
.factory('Game', function() {
  return {
    get: function($scope, $http, $gameId) {
      $http.get(HOST_API + '/game/' + $gameId).success(function(game) {
        getPlayers($http, function(players) {
          $scope.game = game;
          $scope.selectedsPlayers = [];
          
          for(var i in players) {
            if($.inArray(players[i]._id, game.players) != -1) {
              $scope.selectedsPlayers.push(players[i]);
            }
          }

          $("#loading-game").addClass("hide");
        });
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
    allGames: function($scope, $http) {
      getGames($http, function(games) {
        console.log(games);
        
    		if(games && games[0] && !games[0]._id) {
    			games = [];
    		}

    		for(var i in games) {
    				//games[i].date = formatDate(games[i].date);
    		}  

    		$scope.games = games;

    		$("#loading-games").addClass("hide");
    	}, function() {
    	   $scope.$broadcast('scroll.refreshComplete');
    	});
    },
    allPlayers: function($scope, $http) {
      getPlayers($http, function(players) {
        for(var i in players) {
          players[i].checked = false;
        }

        $scope.players = players;

        $("#loading-players").addClass("hide");
      }, function() {
        $scope.$broadcast('scroll.refreshComplete');
     });
    },
    doScore: function($http, $scope, $state, callback, params) {
      $http.post(HOST_API + '/score', params).then(function(response) {
        callback();

        for(var i in $scope.players) {
          $scope.players[i].checked = false;
        }

        $scope.ownScore = true;
        
        var nRand = new Date();
        
        $state.go("tab.game-details", {gameId: params.game, noCache: nRand.getTime()});
      });
    }
  };
});
