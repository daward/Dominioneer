var Game = require('./game.js');

var cards = [
{name : 'Cellar', 		type : 'Action'},
{name : 'Chapel', 		type : 'Action'},
{name : 'Moat', 		type : 'Defense'},
{name : 'Chancelor', 	type : 'Action'},
{name : 'Village', 		type : 'Action'},
{name : 'Woodcutter', 	type : 'Action'},
{name : 'Workshop', 	type : 'Action'},
{name : 'Bureaucrat', 	type : 'Attack'},
{name : 'Feast', 		type : 'Action'},
{name : 'Gardens', 		type : 'Victory'},
{name : 'Militia', 		type : 'Attack'},
{name : 'Moneylender', 	type : 'Action'},
{name : 'Remodel', 		type : 'Action'},
{name : 'Smithy', 		type : 'Action'},
{name : 'Spy', 			type : 'Attack'},
{name : 'Thief', 		type : 'Attack'},
{name : 'Throne Room', 	type : 'Action'},
{name : 'Council Room', type : 'Action'},
{name : 'Festival', 	type : 'Action'},
{name : 'Laboratory', 	type : 'Action'},
{name : 'Library', 		type : 'Action'},
{name : 'Market', 		type : 'Action'},
{name : 'Mine', 		type : 'Action'},
{name : 'Witch', 		type : 'Attack'},
{name : 'Adventurer', 	type : 'Action'}
]

var Deck = function () 
{
};

Deck.prototype.createGame = function (arrayFn) 
{
	var startArrayFn = arrayFn || function() { return [] }
	var selected = selectVector(startArrayFn())
	return new Game.Game(Game.encode(selected));
}

Deck.prototype.activeCards = function(gameHash) 
{
	var cardNums = Game.decode(gameHash);
	var retVal = [];
	for(var i in cardNums)
	{
		retVal.push(cards[cardNums[i]])
	}
	
	return retVal;
};

Deck.prototype.startArray = function(requiredCards)
{
	var vector = []
	for(var i = 0; i < requiredCards.length; i++)
	{
		vector.push(this.getCardIndex(requiredCards[i]));
	}
	
	return vector;
}

Deck.prototype.createBestGame = function(arrayFn, trialSize, histories)
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
}

Deck.prototype.getCardIndex = function(cardName)
{
	for(var i = 0; i < this.cards.length; i++)
	{
		if(this.cards[i].name == cardName)
		{
			return i;
		}
	}
}

Deck.prototype.predict = function(game, histories)
{
	var total = 0;
	var len = 0;
	for(var history in histories)
	{
		total = total + histories[history].predict(game);
		len++;
	}
	return total / len;
}

Deck.prototype.cards = cards;

module.exports = Deck;

function selectVector(vector)
{	
	while(vector.length < 10)
	{
		var index = Math.floor(Math.random() * cards.length)
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
}
