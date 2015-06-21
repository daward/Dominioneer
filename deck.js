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
	
	for(i = 0; i < availableCards.length; i++) {
		cardType = availableCards[i].type;

		for(j = 0; j < cardType.length; j++) {
			if(!retVal[cardType[j]]) {
				retVal[cardType[j]] = 1;
			} else {
				retVal[cardType[j]]++;
			}
		}
	}
	
	return retVal;
}

Deck.prototype.getAvailableCardIndicies = function() {
	var retVal = [];
	
	this.getActive(function (index) {
		retVal.push(index)
	});
	
	return retVal;	
}

Deck.prototype.getAvailableCards = function() {	
	var retVal = [];
	var me = this;
	this.getActive(function (index) {
		retVal.push(me.allCards[index])
	});
	
	return retVal;
}

Deck.prototype.getActive = function(callback) {
	var i, j;
	
	for(i = 0; i < this.allCards.length; i++) {
		if(!this.sets || this.sets.length == 0) {
			callback(i)
		} else {
			for(j = 0; j < this.sets.length; j++) {
				if(this.allCards[i].set === this.sets[j]) {
					callback(i)
				}			
			}
		}
	}
}

module.exports = Deck;
