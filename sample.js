var Deck = require('./deck.js')
var History = require('./history.js')

var deck = new Deck();
var histories = new Array();
histories["Dana"] = new History();
histories["Sam"] = new History();
histories["Tony"] = new History();
histories["Charles"] = new History();

var cellarGames = 
[
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])}),
	deck.createGame(function() { return deck.startArray(['Cellar'])})
]

var witchGames =
[
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])}),
	deck.createGame(function() { return deck.startArray(['Witch'])})
]

for(var i = 0; i < cellarGames.length; i++)
{
	histories["Dana"].play(cellarGames[i], 1)
	histories["Sam"].play(cellarGames[i], 1)
	histories["Tony"].play(cellarGames[i], 1)
	histories["Charles"].play(cellarGames[i], 0)
}

for(var i = 0; i < witchGames.length; i++)
{
	histories["Dana"].play(witchGames[i], 0)
	histories["Sam"].play(witchGames[i], 1)
	histories["Tony"].play(witchGames[i], 0)
	histories["Charles"].play(witchGames[i], 0)
}

histories["Dana"].train()
histories["Sam"].train()
histories["Tony"].train()
histories["Charles"].train()

module.exports.deck = deck;
module.exports.histories = histories;