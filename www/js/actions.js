var gameData = {}, 
	scoreData = {}, 
	playerData = [],
	HOST_API = "http://cse.futbol",
	MESSAGE_REGISTER = "Cadastro realizado com sucesso!",
	MESSAGE_ALTERATION = "Cadastro modificado com sucesso!";

var formatDate = function(date) {
	date = new Date(date);

	var day = (date.getDate() <= 9 ? "0" : "") + date.getDate(),
	month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
	year = date.getFullYear();

	return day + "." + month + "." + year;
};

var isInvalid = function(value) {
	if(value == "" || value == null || value == undefined) {
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

var getJogadores = function($http, callback, callbackFinal, callbackError) {
	if(playerData.length === 0) {
		$http.get(HOST_API + '/players').success(function(jogadores) {
			console.log("Pegou do servico");
			
			playerData = jogadores;
			callback(jogadores);
		}).finally(callbackFinal);  
	} else {
		console.log("Pegou do localStorage");
		
		callback(playerData);
		
		if(callbackFinal) {
			callbackFinal();
		}
	}      
};
