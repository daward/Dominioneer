# Domioneer
Dominioneer suggests dominion games based on users ratings of previous games. 
## Version
1.0.0

## Examples

### Creating a game
```javascript
var Dominioneer = require('dominioneer');
var builder = new Dominioneer.GameBuilder();
var game = builder.createGame()
```
### Creating a game with a required set of cards
```javascript
var Dominioneer = require('dominioneer');
var builder = new Dominioneer.GameBuilder();

// Now provide a function that picks out required cards.
// The builder has one for you already.
var builder.createGame(function() { return builder.requiredCards(['Cellar', 'Witch'])}),
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
    * Card Cost
    * Card type (attack, victory, treasure, action)
