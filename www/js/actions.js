var gameData = {}, 
	HOST_API = "http://cse.futbol"
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
