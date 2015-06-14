var GameBuilder = require('./gamebuilder.js');
var HistoryBuilder = require('./historyBuilder.js');
var Deck = require('./deck.js');
var Game = require('./game.js');

module.exports.GameBuilder = GameBuilder;
module.exports.HistoryBuilder = HistoryBuilder;
module.exports.deck = new Deck();
module.exports.Game = Game;