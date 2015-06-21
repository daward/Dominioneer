/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Dominioneer = require('../dominioneer.js'),
	builder = new Dominioneer.GameBuilder(),
	deck = new Dominioneer.Deck(null);

exports['test a game can be created'] = function (test) {

	test.expect(1);
	var game = builder.createGame(deck, null);

	test.equal(10, Dominioneer.Game.decode(game).length, "length correct");
	test.done();
};

exports['test a game can be created with a specific card'] = function (test) {

	var game = builder.createGame(deck, ['Witch']),
		cards = deck.getCards(Dominioneer.Game.decode(game)),
		found = false,
		i;

	for (i = 0; i < cards.length; i++) {
		if (cards[i].name === 'Witch') { found = true; break; }
	}

	test.equal(true, found, "found the expected card");
	test.done();
};

exports['test game suggestions are effective'] = function (test) {

	var histories = new Dominioneer.HistoryBuilder(null);
	histories.get("Dana", function (history) {
		for(var i = 0; i < 30; i++) {
			history.play(builder.createGame(deck, ['Cellar']), 1);
			history.play(builder.createGame(deck, ['Witch']), -1);
		}
	});
	
	histories.get("Tony", function (history) {
		for(var i = 0; i < 30; i++) {
			history.play(builder.createGame(deck, ['Chapel']), 1);
			history.play(builder.createGame(deck, ['Witch']), 0);
		}
	});
	
	histories.getAll(["Dana", "Tony"], function (historySet) {
		builder.createBestGame(deck, null, 4, historySet, function(bestGame){
			console.log(bestGame);	
			test.ok(bestGame.game, "Makes sure a game was generated");
			test.done();
		})
	});
};