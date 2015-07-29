/*jslint node: true */
/*jslint plusplus: true */
/*jslint node: true, stupid: true */
'use strict';

var Svm = require('node-svm');
var Game = require('./game.js');

var History = function (name, ratedGames, unratedGames, recordFn) {
	this.ratedGames = ratedGames;
	this.svm = new Svm.CSVC({probability : true});
	this.trained = false;
	this.name = name;
	this.recordFn = recordFn;
	this.unratedGames = unratedGames;
};

History.prototype.predict = function (gameHash, callback) {
	var me = this, gHash = gameHash.toLowerCase(0);
	
	// there's just not enough information to make a useful prediction
	if (this.ratedGames.length < 5) {
		callback(0);
	} else if (!this.trained) {
		this.train(function () {
			me.trained = true;
			callback(me.calculate(gHash))
		});
	} else {
		callback(me.calculate(gHash));
	}
};

History.prototype.calculate = function (gameHash) {
	var retVal = 0,
		prediction = this.svm.predictProbabilitiesSync(Game.decodeVector(gameHash)),
		prop,
		value;

	for (prop in prediction) {
		if (prediction.hasOwnProperty(prop)) {
			value = parseInt(prop, 10);
			retVal = retVal + value * prediction[prop];
		}
	}

	return retVal;
}

History.prototype.dataset = function () {
	var dataSet = [], i, playedGame;
	for (i = 0; i < this.ratedGames.length; i++) {
		playedGame = this.ratedGames[i];
		dataSet.push([Game.decodeVector(playedGame.game), playedGame.rating]);
	}

	return dataSet;
};

History.prototype.train = function (callback) {
	this.svm.train(this.dataset()).done(callback);
};

History.prototype.play = function(gameHashCode) {
	var gHash = gameHashCode.toLowerCase();
	this.unratedGames.push({game : gHash});
	this.recordFn(this.name, gHash, null);
}

History.prototype.rate = function (gameHashCode, rating) {
	var gHash = gameHashCode.toLowerCase();
	if (rating === null) {
		throw "Must provide rating";
	}

	if (rating === 1 || rating === 0 || rating === -1) {
		this.rating = rating;
	} else {
		throw "Invalid rating: " + rating;
	}

	this.ratedGames.push({game : gHash, rating : rating});
	this.recordFn(this.name, gHash, rating);
};

module.exports = History;