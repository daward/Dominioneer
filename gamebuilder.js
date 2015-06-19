/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Deck = require('./deck.js');
var Game = require('./game.js');

function selectVector(vector, deck) {
	while (vector.length < 10) {
		var index = Math.floor(Math.random() * deck.cards.length),
			found = false,
			i;

		for (i = 0; i < vector.length; i++) {
			if (vector[i] === index) {
				found = true;
				break;
			}
		}

		if (!found) {
			vector.push(index);
		}
	}

	//a sorted game removes a lot of unnecessary permutations
	return vector.sort(function (a, b) { return a - b; });
}

var GameBuilder = function () {
	this.deck = new Deck();
};

GameBuilder.prototype.createGame = function (arrayFn) {
	var startArrayFn = arrayFn || function () { return []; },
		selected = selectVector(startArrayFn(), this.deck);

	return Game.encode(selected);
};

GameBuilder.prototype.requiredCards = function (requiredCards) {
	var vector = [], i;
	for (i = 0; i < requiredCards.length; i++) {
		vector.push(this.deck.getCardIndex(requiredCards[i]));
	}

	return vector;
};

GameBuilder.prototype.createBestGame = function (arrayFn, trialSize, histories) {
	var bestGame = null,
		bestRating = -1,
		i,
		game,
		rating;

	for (i = 0; i < trialSize; i++) {
		game = this.createGame(arrayFn);
		rating = this.predict(game, histories);

		if (rating > bestRating) {
			bestGame = game;
			bestRating = rating;
		}
	}

	return bestGame;
};

GameBuilder.prototype.predict = function (game, histories) {
	var total = 0,
		len = 0,
		i;

	for (i = 0; i < histories.length; i++) {
		total = total + histories[i].predict(game);
		len++;
	}

	return total / len;
};

module.exports = GameBuilder;