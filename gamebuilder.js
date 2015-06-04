var Deck = require('./deck.js');
var Game = require('./game.js');

var GameBuilder = function () 
{
	this.deck = new Deck();
};

GameBuilder.prototype.createGame = function (arrayFn) 
{
	var startArrayFn = arrayFn || function() { return [] }
	var selected = selectVector(startArrayFn(), this.deck)
	return Game.encode(selected);
}

GameBuilder.prototype.startArray = function(requiredCards)
{
	var vector = []
	for(var i = 0; i < requiredCards.length; i++)
	{
		vector.push(this.deck.getCardIndex(requiredCards[i]));
	}
	
	return vector;
};

GameBuilder.prototype.createBestGame = function(arrayFn, trialSize, histories)
{
	var games = new Array(trialSize);
	var bestGame = null;
	var bestRating = -1
	
	for(var i = 0; i < trialSize; i++)
	{
		var game = this.createGame(arrayFn)
		var rating = this.predict(game, histories)
		
		if(rating > bestRating)
		{
			bestGame = game;
			bestRating = rating;
		}
	}
	
	return bestGame;	
};

GameBuilder.prototype.predict = function(game, histories)
{
	var total = 0;
	var len = 0;
	for(var history in histories)
	{
		total = total + histories[history].predict(game);
		len++;
	}
	return total / len;
};

module.exports = GameBuilder;

function selectVector(vector, deck)
{	
	while(vector.length < 10)
	{
		var index = Math.floor(Math.random() * deck.cards.length)
		var found=false;
	  
		for(var i in vector)
		{
			if(vector[i] == index)
			{
				found = true;
				break;
			}
		}		
		
		if(!found)
		{
			vector.push(index)
		}
	}
	
	//a sorted game removes a lot of unnecessary permutations
	return vector.sort(function(a, b) { return a - b});
};
