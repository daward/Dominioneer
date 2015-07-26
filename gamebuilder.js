/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Deck = require('./deck.js');
var CardSelector = require('./cardSelector.js');

var GameBuilder = function () {};

GameBuilder.prototype.createGame = function (deck, requiredCards) {
	var vector = [], i, hash = {}, cardSelector = new CardSelector(deck);
	
	if(requiredCards) {
		
		// ensure the supplied cards are unique as the index is fetched
		for (i = 0; i < requiredCards.length; i++) {
			var card = requiredCards[i];
			if(!hash[card])	{
				hash[card] = true;
				cardSelector.addCardByName(requiredCards[i])
			}
		}
	}

	return cardSelector.getId();
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