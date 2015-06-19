/*jslint node: true */
/*jslint plusplus: true */
/*jslint node: true, stupid: true */
'use strict';

var Svm = require('node-svm');
var Game = require('./game.js');

var History = function (name, playedGames, recordFn) {
	this.playedGames = playedGames;
	this.svm = new Svm.CSVC({probability : true});
	this.trained = false;
	this.name = name;
	this.recordFn = recordFn;
};

History.prototype.predict = function (gameHash, callback) {
	var me = this;
	
	// there's just not enough information to make a useful prediction
	if (this.playedGames.length < 5) {
		callback(.5);
	} else if (!this.trained) {
		this.train(function () {
			me.trained = true;
			callback(me.calculate(gameHash))
		});
	} else {
		callback(me.calculate(gameHash));
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
	for (i = 0; i < this.playedGames.length; i++) {
		playedGame = this.playedGames[i];
		dataSet.push([Game.decodeVector(playedGame.game), playedGame.rating]);
	}

	return dataSet;
};

History.prototype.train = function (callback) {
	this.svm.train(this.dataset()).done(callback);
};

History.prototype.play = function (gameHashCode, rating) {
	if (rating === null) {
		throw "Must provide rating";
	}

	if (rating === 1 || rating === 0) {
		this.rating = rating;
	} else {
		throw "Invalid rating: " + rating;
	}

	this.playedGames.push({game : gameHashCode, rating : rating});
	this.recordFn(this.name, gameHashCode, rating);
};

module.exports = History;