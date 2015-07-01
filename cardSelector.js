/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Game = require('./game.js');

var CardSelector = function (deck) {
	this.cardChoices = deck.getAvailableCardIndicies();
	this.deck = deck;
	this.vector = [];
};

CardSelector.prototype.addRandomCard = function() {
	var index = Math.floor(Math.random() * this.cardChoices.length);
	
	// add it to the selection, remove it from the set of choices
	this.vector.push(this.cardChoices[index]);
	this.cardChoices.splice(index, 1);
}	

CardSelector.prototype.addCardByName = function(cardName) {
	var index = this.deck.getCardIndex(cardName), i;
	
	if(index === undefined) {
		throw "Unknown card " + cardName;
	}
	
	for(i = 0; i < this.cardChoices.length; i++) {
		if(this.cardChoices[i] === index) {
			this.vector.push(this.cardChoices[i]);
			this.cardChoices.splice(i, 1);
			return;
		}
	}
}

CardSelector.prototype.getId = function() {
	// can't call this twice
	this.getId = null;
	while(this.vector.length < 10) {
		this.addRandomCard();
	}
	this.vector.sort(function (a, b) { return a - b; });
	return Game.encode(this.vector);	
}

module.exports = CardSelector;