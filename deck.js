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
	if(arrayFn)
	{
		var arrDescriptor = arrayFn();
		return new Game(selectVector(arrDescriptor.vector, arrDescriptor.selected));
	}
	
	return new Game(selectVector(new Array(cards.length), 0));
}

Deck.prototype.startArray = function(requiredCards)
{
	var vector = new Array(cards.length);
	var numSelected = 0;
	for(var i = 0; i < requiredCards.length; i++)
	{
		vector[this.getCardIndex(requiredCards[i])] = true;
		numSelected++
	}
	
	return { vector : vector, selected : numSelected};
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

function selectVector(vector, numSelected)
{
	while(numSelected < 10)
	{
		var index = Math.floor(Math.random() * vector.length)
		var found=false;
	  
		if(!vector[index])
		{
			vector[index] = true;
			numSelected++;
		}
	}
	
	return vector;
}
