# Domioneer
Dominioneer suggests dominion games based on users ratings of previous games. 

## Examples

### Creating a game
```javascript
var Dominioneer = require('dominioneer'),
	deck = new Dominioneer.Deck(null),
	builder = new Dominioneer.GameBuilder(),
	game = builder.createGame(deck, null)
```
### Creating a game with a required set of cards
```javascript
var Dominioneer = require('dominioneer'),
	builder = new Dominioneer.GameBuilder(),
	deck = new Dominioneer.Deck(null),

// Now provide a function that picks out required cards.
// The builder has one for you already.
var builder.createGame(deck, ['Cellar', 'Witch']),
```
### Rating a game
Assuming you have created a game as, in above, its pretty easy!

```javascript
// if you want to store the results permanently, history builder can
// take a reference to an AWS.dynamodb
var histories = new Dominioneer.HistoryBuilder(null);

histories.get("Dana", function (history) {
    // 0 (dislike) or 1 (liked) is allowed
	history.play(game, 1);
});
```
### Decide how much you will like a game
```javascript
var histories = new Dominioneer.HistoryBuilder(null);

histories.get("Dana", function (history) {

	// note that prediction is asynchronous
	history.predict(game, function(rating) { console.log(rating) });
});
```

## Installation

```sh
npm install dominioneer
```

## Todo's
* Improve predictions at lower sample sizes
* Allow more variety of parameters to control random games
    * Expansion weight
	* Better prediction at small sample size