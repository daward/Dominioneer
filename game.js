var Deck = require('./deck.js')

module.exports.encode = function(selectedCards)
{
	var retVal = '';
	for(var index in selectedCards)
	{
		retVal = retVal + ("00" + selectedCards[index].toString(16)).slice(-2)
	}
	
	return retVal;
}

module.exports.decodeVector = function(hashCode)
{
	var selectedCards = module.exports.decode(hashCode);
	var deck = new Deck();
	var retVal = new Array(deck.cards.length);
	for(var i = 0; i < retVal.length; i++)
	{
		retVal[i] = 0;
	}
	
	for(var i in selectedCards)
	{
		retVal[selectedCards[i]] = 1;
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
