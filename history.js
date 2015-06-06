var Svm = require('node-svm');
var Game = require('./game.js');

var History = function () 
{
	this.playedGames = [];
	this.svm = new Svm.CSVC({probability : true});
	this.trained = false;
};

History.prototype.predict = function(gameHash)
{
	if(this.playedGames.length > 4 && !this.trained)
	{
		this.train();
		this.trained = true
	}
	
	var retVal = 0;
	var prediction = this.svm.predictProbabilitiesSync(Game.decodeVector(gameHash));
	for(var prop in prediction)
	{
		var value = parseInt(prop);
		retVal = retVal + value * prediction[prop];
	}
	
	return retVal;
};

History.prototype.dataset = function()
{
	var dataSet = [];
	for(var i = 0; i < this.playedGames.length; i++)
	{
		var playedGame = this.playedGames[i];
		dataSet.push([Game.decodeVector(playedGame.game), playedGame.rating]);
	}
	
	return dataSet;
};

History.prototype.train = function()
{	
	this.svm.train(this.dataset());
};

History.prototype.play = function(gameHashCode, rating)
{	
	if(rating == null)
	{
		throw "Must provide rating"
	}
	if(rating == 1 || rating == 0)
	{
		this.rating = rating;
	}
	else
	{
		throw "Invalid rating: " + rating;
	}	
	
	this.playedGames.push({game : gameHashCode, rating : rating});
};

module.exports = History;