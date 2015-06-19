/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Deck = function () {
	this.cards = require("./deck.json").cards;
};

Deck.prototype.getCardIndex = function (cardName) {
	var i;
	for (i = 0; i < this.cards.length; i++) {
		if (this.cards[i].name === cardName) {
			return i;
		}
	}
};

Deck.prototype.getCards = function (cardNumbers) {
	var retVal = [], i;
	for (i = 0; i < cardNumbers.length; i++) {
		retVal.push(this.cards[cardNumbers[i]]);
	}
	return retVal;
};

module.exports = Deck;
