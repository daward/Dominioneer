var cards = [
	{name : 'Cellar', 		type : 'Action'},
	{name : 'Chapel', 		type : 'Action'},
	{name : 'Moat', 		type : 'Defense'},
	{name : 'Chancelor', 	type : 'Action'},
	{name : 'Village', 		type : 'Action'},
	{name : 'Woodcutter', 	type : 'Action'},
	{name : 'Workshop', 	type : 'Action'},
	{name : 'Bureaucrat', 	type : 'Attack'},
	{name : 'Feast', 		type : 'Action'},
	{name : 'Gardens', 		type : 'Victory'},
	{name : 'Militia', 		type : 'Attack'},
	{name : 'Moneylender', 	type : 'Action'},
	{name : 'Remodel', 		type : 'Action'},
	{name : 'Smithy', 		type : 'Action'},
	{name : 'Spy', 			type : 'Attack'},
	{name : 'Thief', 		type : 'Attack'},
	{name : 'Throne Room', 	type : 'Action'},
	{name : 'Council Room', type : 'Action'},
	{name : 'Festival', 	type : 'Action'},
	{name : 'Laboratory', 	type : 'Action'},
	{name : 'Library', 		type : 'Action'},
	{name : 'Market', 		type : 'Action'},
	{name : 'Mine', 		type : 'Action'},
	{name : 'Witch', 		type : 'Attack'},
	{name : 'Adventurer', 	type : 'Action'}
];

var Deck = function () 
{
};

Deck.prototype.getCardIndex = function(cardName)
{
	for(var i = 0; i < this.cards.length; i++)
	{
		if(this.cards[i].name == cardName)
		{
			return i;
		}
	}
};

Deck.prototype.getCards = function(cardNumbers)
{
	var retVal = [];
	for(var i in cardNumbers)
	{
		retVal.push(cards[cardNumbers[i]])
	}
	
	return retVal;
}

Deck.prototype.cards = cards;
module.exports = Deck;
