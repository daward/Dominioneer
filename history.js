var Svm = require('node-svm');

var History = function () 
{
	this.playedGames = [];
	this.svm = new Svm.CSVC({probability : true});
};

History.prototype.predict = function(game)
{
	var retVal = 0;
	var prediction = this.svm.predictProbabilitiesSync(game.selectionVector());
	for(var prop in prediction)
	{
		var value = parseInt(prop);
		retVal = retVal + value * prediction[prop];
	}
	
	return retVal;
}

History.prototype.dataset = function()
{
	var dataSet = [];
	for(var i = 0; i < this.playedGames.length; i++)
	{
		var game = this.playedGames[i];
		dataSet.push([game.game.selectionVector(), game.rating])
	}
	
	return dataSet;
}

History.prototype.train = function()
{	
	this.svm.train(this.dataset())
}

History.prototype.play = function(game, rating)
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
	
	this.playedGames.push({game : game, rating : rating});
}

module.exports = History;