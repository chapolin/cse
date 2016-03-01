angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('GameCtrl', function($scope, $http, $ionicPopup, $state, Game) {
  $scope.$on('$ionicView.enter', function() {
    Game.allGames($scope, $http);
    Game.saveInformation("players", null);
    Game.saveInformation("match", null);
  });
  
  $scope.go = function (path) {
    $state.go(path);
  };

  $scope.doRefresh = function() {
    Game.allGames($scope, $http);
  };

  $scope.remove = function(game) {
    $ionicPopup.confirm({
      title: "Atenção!",
      template: "Você realmente deseja excluir este jogo?",
      cancelText: "Não",
      okText: "Sim",
      okType: "button-dark"
    }).then(function(res) {
      if(res) {
        Game.remove($http, $state, game);
      }
    });
  };
})

.controller('GameStep1Ctrl', function($scope, $state, $http, $ionicPopup, Game) {
  $scope.$on('$ionicView.enter', function() {
    Game.allPlayers($scope, $http);

    Game.saveInformation("players", null);
  });

  $scope.doRefresh = function() {
    Game.allPlayers($scope, $http);
  };

  $scope.goGameStep2 = function(players) {
    var isOk = false;

    Game.saveInformation("players", players);

    for(var i in gameData.players) {
      if(gameData.players[i].checked === true) {
        isOk = true;

        break;
      }
    }

    if(isOk) {
      $state.go("tab.game-2");
    } else {
      showAlert();
    }
  };

  var showAlert = function() {
    $ionicPopup.alert({
      title: "Atenção!",
      template: "Selecione os jogadores para a partida :)",
      okText: "Ok, Entendi!",
      okType: "button-dark"
    });
  };
})

.controller('GameStep2Ctrl', function($scope, $state, $http, $ionicPopup, Game) {
  $scope.$on('$ionicView.enter', function() {
    $scope.match = {};

    Game.saveInformation("match", null);
  });

  $scope.salvar = function(match) {
    Game.saveInformation("match", match);

    if(isInvalid(gameData.match.place) || isInvalid(gameData.match.date) || 
       isInvalid(gameData.match.time) || isInvalid(gameData.match.versus)) {
      
      warningFields();
    } else {
      Game.sendInformations($http, $state);
    }
  };

  var warningFields = function() {
    $ionicPopup.alert({
      title: "Atenção!",
      subTitle: "Os campos abaixo, são obrigatórios:",
      template: "- Local da partida<br />- Data do jogo<br />- Hora do jogo<br />- Adversário",
      okText: "Ok, Entendi!",
      okType: "button-dark"
    });
  };
})

.controller('ScoreCtrl', function($scope, $http, $ionicPopup, $state, $stateParams, Game) {  
  $scope.ownScore = true;

  Game.allPlayers($scope, $http);

  $scope.doRefresh = function() {
    Game.allPlayers($scope, $http);
  };

  $scope.doScore = function(players, ownScore) {
    var player = null, game = $stateParams.gameId;

    for(var i in players) {
      if(players[i].checked === true) {
        player = players[i]._id;

        break;
      }
    }

    if(player || !ownScore) {
      if(!ownScore) {
        player = "000000000000";
      }

      Game.doScore($http, $scope, $state, scoreOk, {
        game: game,
        player: player,
        from: ownScore === true ? "own" : "versus",
        score: "+"
      });
    } else {
      showAlert();
    }
  };

  var showAlert = function() {
    $ionicPopup.alert({
      title: "Atenção!",
      template: "Selecione o jogador que marcou o gol",
      okText: "Ok, Entendi!",
      okType: "button-dark"
    });
  };

  var scoreOk = function() {
    $ionicPopup.alert({
      title: "Gol marcado!",
      okText: "OK",
      okType: "button-dark"
    });
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
