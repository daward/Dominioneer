/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Deck = require('./deck.js');
var Game = require('./game.js');

function selectVector(vector, deck) {
	while (vector.length < 10) {
		var index = Math.floor(Math.random() * deck.getAvailableCards().length),
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

};

GameBuilder.prototype.createGame = function (deck, requiredCards) {
	var vector = [], i;
	
	if(requiredCards) {
		for (i = 0; i < requiredCards.length; i++) {
			vector.push(deck.getCardIndex(requiredCards[i]));
		}
	}

	return Game.encode(selectVector(vector, deck));
};

GameBuilder.prototype.createBestGame = function (deck, requiredCards, trialSize, histories, callback) {
	var candidateGames = [],
		i,
		j,
		finished = 0,
		predict = function (candidate, history) {
			var i = 0;
			history.predict(candidate.game, function (rating) {
				finished++;
				candidate.ratingTotal += rating;
				
				if(finished === histories.length * candidateGames.length) {
					candidateGames.sort(function (a, b) {
						return b.ratingTotal - a.ratingTotal;
					});
					
					for(i = 0; i < candidateGames.length; i++) {
						candidateGames[i].ratingTotal = candidateGames[i].ratingTotal / histories.length;
					}					
					callback(candidateGames[0]);
				}
			});
		};

	// build a candidate set of games
	for (i = 0; i < trialSize; i++) {
		candidateGames.push({
			game : this.createGame(deck, requiredCards),
			ratingTotal : 0
		});
	}
	
	// spin off a bunch of asynchronous predictions that eventually call the callback
	for(i = 0; i < candidateGames.length; i++) {
		for (j = 0; j < histories.length; j++) {
			predict(candidateGames[i], histories[j]);
		}
	}
};

module.exports = GameBuilder;