/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Dominioneer = require('../dominioneer.js');

exports['test a game can be created'] = function (test) {

	test.expect(1);
	var builder = new Dominioneer.GameBuilder(),
		game = builder.createGame();

	test.equal(10, Dominioneer.Game.decode(game).length, "length correct");
	test.done();
};

exports['test a game can be created with a specific card'] = function (test) {

	var builder = new Dominioneer.GameBuilder(),
		game = builder.createGame(function () { return builder.requiredCards(['Witch']); }),
		cards = Dominioneer.deck.getCards(Dominioneer.Game.decode(game)),
		found = false,
		i;

	for (i = 0; i < cards.length; i++) {
		if (cards[i].name === 'Witch') { found = true; break; }
	}

	test.equal(true, found, "found the expected card");
	test.done();
};

exports['test a game can be rated'] = function (test) {
	var builder = new Dominioneer.GameBuilder(),
		game = builder.createGame();
		
	var histories = new Dominioneer.HistoryBuilder(null);
	
	histories.get("Dana", function (history) {
		history.play(game, 1);
	});
	
	histories.get("Dana", function(history) {
		test.equal(1, history.playedGames.length, "a game is now in the users history")
	});
	
	test.done();
}

exports['test a game can be predicted'] = function (test)
{
	var builder = new Dominioneer.GameBuilder(),
		game = builder.createGame();
		
	var histories = new Dominioneer.HistoryBuilder(null);
	
	histories.get("Dana", function (history) {
		
		for(var i = 0; i < 30; i++) {
			history.play(builder.createGame(), 1);
		}
		
		history.predict(builder.createGame(), function (prediction) {
			test.ok(prediction >= 0 && prediction <= 1, "Value was not in the expected range");			
			test.done();
		});		
	});
}

exports['test a game can be predicted at low test input quantities'] = function (test)
{
	var builder = new Dominioneer.GameBuilder(),
		game = builder.createGame();
		
	var histories = new Dominioneer.HistoryBuilder(null);
	
	histories.get("Dana", function (history) {
		
		history.play(builder.createGame(), 1);

		history.predict(builder.createGame(), function (prediction) {
			test.ok(prediction >= 0 && prediction <= 1, "Value was not in the expected range");			
			test.done();
		});		
	})
}

exports['test game prediction is effective'] = function (test)
{	
	var builder = new Dominioneer.GameBuilder(),
		game = builder.createGame(),
		histories = new Dominioneer.HistoryBuilder(null);
		
	histories.get("Dana", function (history) {
		
		for(var i = 0; i < 30; i++) {
			history.play(builder.createGame(function () { return builder.requiredCards(['Cellar'])}), 1);
			history.play(builder.createGame(function () { return builder.requiredCards(['Witch'])}), 0);
		}
		
		history.predict(builder.createGame(function () { return builder.requiredCards(['Cellar'])}), function (shouldLike) {
			history.predict(builder.createGame(function () { return builder.requiredCards(['Witch'])}), function (shouldDislike) {
				test.ok(shouldLike >= shouldDislike, "Prediction was ineffective");			
				test.done();
			});
		});		
	});
}

require('nodeunit').reporters.default.run(['test']);