var Dominioneer = require('./dominioneer.js');
var AWS = require('aws-sdk');

var builder = new Dominioneer.GameBuilder();
var histories = new Dominioneer.HistoryBuilder();
histories.setupDb();

var cellarGames = 
[
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])}),
	builder.createGame(function() { return builder.startArray(['Cellar'])})
];

var witchGames =
[
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])}),
	builder.createGame(function() { return builder.startArray(['Witch'])})
];

histories.get("Dana", function(history)
{
	history.play(cellarGames[0], 1);
});

// for(var i = 0; i < cellarGames.length; i++)
// {
	// histories["Dana"].play(cellarGames[i], 1);
	// histories["Sam"].play(cellarGames[i], 1);
	// histories["Tony"].play(cellarGames[i], 1);
	// histories["Charles"].play(cellarGames[i], 0);
// }

// for(var i = 0; i < witchGames.length; i++)
// {
	// histories["Dana"].play(witchGames[i], 0);
	// histories["Sam"].play(witchGames[i], 1);
	// histories["Tony"].play(witchGames[i], 0);
	// histories["Charles"].play(witchGames[i], 0);
// }

// histories["Dana"].train();
// histories["Sam"].train();
// histories["Tony"].train();
// histories["Charles"].train();

module.exports.builder = builder;
module.exports.histories = histories;