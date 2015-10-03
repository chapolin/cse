var gameData = {}, HOST_API = "http://cse.futbol";

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