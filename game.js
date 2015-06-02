var Game = function (selection) 
{
	this.selection = selection;
};

Game.prototype.cards = function() 
{
	var cards = [];
	for(var i = 0; i < this.selection.length; i++)
	{
		if(this.selection[i])
		{
			cards.push(this.deck.cards[i])
		}
	}
	
	return cards;
};

Game.prototype.selectionVector = function()
{
	var selectionVector = []
	for(var i = 0; i < this.selection.length; i++)
	{
		if(this.selection[i])
		{
			selectionVector.push(1);
		}
		else
		{
			selectionVector.push(0);
		}
	}
	
	return selectionVector;
}

module.exports = Game;