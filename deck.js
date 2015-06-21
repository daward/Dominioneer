/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Deck = function (sets) {
	this.sets = sets;
	this.allCards = require("./deck.json").cards;
};

Deck.prototype.getCardIndex = function (cardName) {
	var i;
	for (i = 0; i < this.allCards.length; i++) {
		if (this.allCards[i].name === cardName) {
			return i;
		}
	}
};

Deck.prototype.getCards = function (cardNumbers) {
	var retVal = [], i;
	for (i = 0; i < cardNumbers.length; i++) {
		retVal.push(this.allCards[cardNumbers[i]]);
	}
	return retVal;
};

Deck.prototype.getTypeWeights = function() {
	var retVal = {}, 
		i, 
		j, 
		cardType,
		availableCards = this.getAvailableCards();
	
	for(i = 0; i < availableCards.length; i++)
	{
		cardType = availableCards[i].type;
		for(j = 0; j < cardType.length; j++)
		{
			if(!retVal[cardType[j]]) {
				retVal[cardType[j]] = 1;
			} else {
				retVal[cardType[j]]++;
			}
		}
	}
	
	return retVal;
}

Deck.prototype.getAvailableCards = function()
{	
	if(!this.sets || this.sets.length == 0)
	{
		return this.allCards;
	}
	
	var i, j, retVal = [];
	for(i = 0; i < this.allCards.length; i++) {
		for(j = 0; j < this.sets.length; j++) {
			if(this.allCards[i].set === this.sets[j]) {
				retVal.push(this.allCards[i])
			}
		}
	}
	return retVal;
}

module.exports = Deck;
