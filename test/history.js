/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Dominioneer = require('../dominioneer.js'),
	builder = new Dominioneer.GameBuilder(),
	deck = new Dominioneer.Deck(null),
	histories = new Dominioneer.HistoryBuilder(null);

exports['test a game can be rated'] = function (test) {
	var game = builder.createGame(deck, null);
		
	histories.get("Dana", function (history) {
		history.rate(game, 1);
	});
	
	histories.get("Dana", function(history) {
		test.equal(1, history.ratedGames.length, "a game is now in the users history")
	});
	
	test.done();
}

exports['test a game can be predicted'] = function (test)
{			
	histories.get("Dana", function (history) {
		
		for(var i = 0; i < 30; i++) {
			history.rate(builder.createGame(deck, null), 1);
		}
		
		history.predict(builder.createGame(deck, null), function (prediction) {
			test.ok(prediction >= 0 && prediction <= 1, "Value was not in the expected range");			
			test.done();
		});		
	});
}

exports['test a game can be predicted at low test input quantities'] = function (test)
{		
	histories.get("Dana", function (history) {
		
		history.rate(builder.createGame(deck, null), 1);

		history.predict(builder.createGame(deck, null), function (prediction) {
			test.ok(prediction >= 0 && prediction <= 1, "Value was not in the expected range");			
			test.done();
		});		
	})
}

exports['a game can be played, but not rated'] = function(test) {
	var game = builder.createGame(deck, null);
		
	histories.get("Dana", function (history) {
		history.play(game);
	});
	
	histories.get("Dana", function(history) {
		test.equal(1, history.unratedGames.length, "a game is now in the users history")
	});
	
	test.done();
	
}

exports['test game prediction is effective'] = function (test)
{			
	histories.get("Dana", function (history) {
		for(var i = 0; i < 30; i++) {
			history.rate(builder.createGame(deck, ['Cellar']), 1);
			history.rate(builder.createGame(deck, ['Witch']), -1);
		}
		
		history.predict(builder.createGame(deck, ['Cellar']), function (shouldLike) {
			history.predict(builder.createGame(deck, ['Witch']), function (shouldDislike) {
				test.ok(shouldLike >= shouldDislike, "Prediction was ineffective");			
				test.done();
			});
		});		
	});
}