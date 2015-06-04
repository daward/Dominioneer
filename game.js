var Game = function (hashCode) 
{
	this.hashCode = hashCode;
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

module.exports.Game = Game;

module.exports.encode = function(selectedCards)
{
	var retVal = '';
	for(var index in selectedCards)
	{
		retVal = retVal + ("00" + selectedCards[index].toString(16)).slice(-2)
	}
	
	return retVal;
}

module.exports.decode = function(hashCode)
{
	var retVal = []
	hex = hashCode.match(/.{1,2}/g)
	for(var index in hex)
	{
		retVal.push(parseInt(hex[index], 16))
	}
	
	return retVal;
}