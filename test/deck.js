/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var Dominioneer = require('../dominioneer.js');

exports['test a full deck'] = function (test) {

	var deck = new Dominioneer.Deck(null);
	test.equal(226, deck.getAvailableCards().length, "Got the expected number of cards");
	test.done();
};

exports['test a single set'] = function (test) {

	var deck = new Dominioneer.Deck(["standard"]);
	test.equal(25, deck.getAvailableCards().length, "Got the expected number of cards");
	test.done();
};

exports['test a two sets'] = function (test) {

	var deck = new Dominioneer.Deck(["standard", "intrigue"]);
	test.equal(50, deck.getAvailableCards().length, "Got the expected number of cards");
	test.done();
};

exports['test type weights'] = function (test) {

	var deck = new Dominioneer.Deck(["standard", "intrigue"]);
	test.equal(6, deck.getTypeWeights().Victory, "Got the expected number of cards");
	test.done();
};