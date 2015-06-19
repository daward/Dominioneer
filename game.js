/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Deck = require('./deck.js');

module.exports.encode = function (selectedCards) {
	var retVal = '', index;
	for (index = 0; index < selectedCards.length; index++) {
		retVal = retVal + ("00" + selectedCards[index].toString(16)).slice(-2);
	}

	return retVal;
};

module.exports.decodeVector = function (hashCode) {
	var selectedCards = module.exports.decode(hashCode),
		deck = new Deck(),
		retVal = [],
		i;

	for (i = 0; i < deck.cards.length; i++) {
		retVal[i] = 0;
	}

	for (i = 0; i < selectedCards.length; i++) {
		retVal[selectedCards[i]] = 1;
	}

	return retVal;
};

module.exports.decode = function (hashCode) {
	var retVal = [],
		hex = hashCode.match(/[0-9a-fA-F]{1,2}/g),
		index;

	for (index = 0; index < hex.length; index++) {
		retVal.push(parseInt(hex[index], 16));
	}

	return retVal;
};
