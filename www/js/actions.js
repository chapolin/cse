var gameData = {}, 
	scoreData = {}, 
	playerData = [],
	gamesData = [],
	HOST_API = "http://cse.futbol",
	MESSAGE_REGISTER = "Cadastro realizado com sucesso!",
	MESSAGE_ALTERATION = "Cadastro modificado com sucesso!";

var formatDate = function(date, origin) {
	var stringDate = "";
	
	console.log(date, origin);
	
	if(date) {
		date = new Date(date);

		var day = (date.getDate() <= 9 ? "0" : "") + date.getDate(),
		month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
		year = date.getFullYear();
		
		stringDate = day + "." + month + "." + year;
	}

	return stringDate;
};

var isInvalid = function(value) {
	if(value === "" || value === null || value === undefined) {
		return true;
	}

	return false;
};

Storage.prototype.setObj = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj));
};

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key));
};

var getPlayers = function($http, callback, callbackFinal, callbackError) {
	if(playerData.length === 0) {
		$http.get(HOST_API + '/players').success(function(players) {
			playerData = players;
			callback(players);
		}).finally(callbackFinal);  
	} else {
		callback(playerData);
		
		if(callbackFinal) {
			callbackFinal();
		}
	}      
};

var getGames = function($http, callback, callbackFinal, callbackError) {
	if(gamesData.length === 0) {
		$http.get(HOST_API + '/games').success(function(games) {
			gamesData = games;
			callback(games);
		}).finally(callbackFinal);	
	} else {
		callback(gamesData);
		
		if(callbackFinal) {
			callbackFinal();
		}
	}
};
