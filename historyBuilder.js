var AWS = require('aws-sdk');
var History = require('./history.js')

var HistoryBuilder = function () 
{
	AWS.config.region = 'us-west-1';
	this.dyn = new AWS.DynamoDB({ endpoint: new AWS.Endpoint('http://localhost:8000') });
	this.histories = [];
};

HistoryBuilder.prototype.get = function(name, callback)
{
	var retVal = this.histories[name];
	
	// we already know about this history, so we can just send it back
	if(retVal)
	{
		callback(history);				
	}
	else
	{
		var me = this;
		this.loadHistory(name, function(data)
		{
			var retVal = new History(
				name,  
				data,
				function(name, game, rating)
				{
					me.record(name, game, rating)
				});			
			
			me.histories[name] = retVal;
			
			// once loaded it can be sent back
			callback(retVal);
		});
	}	
}

HistoryBuilder.prototype.setupDb = function()
{	
	var pDrop = {
		TableName: 'DominionPlayerHistory',
	};
	this.dyn.deleteTable(pDrop, function(err, data) {
		if (err) console.log(err); // an error occurred
		else console.log(data); // successful response
	});
	
	var params = 
	{
		TableName: 'DominionPlayerHistory',
		KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
			{ // Required HASH type attribute
				AttributeName: 'userId',
				KeyType: 'HASH',
			},
			{ // Required HASH type attribute
				AttributeName: 'gameId',
				KeyType: 'RANGE',
			},
		],
		AttributeDefinitions: [ // The names and types of all primary and index key attributes only
			{
				AttributeName: 'userId',
				AttributeType: 'S', 
			},
			{
				AttributeName: 'gameId',
				AttributeType: 'S', 
			},
			
			// ... more attributes ...
		],
		ProvisionedThroughput: { // required provisioned throughput for the table
			ReadCapacityUnits: 1, 
			WriteCapacityUnits: 1, 
		}
	};
	
	this.dyn.createTable(params, function(err, data) {
		if (err) console.log(err); // an error occurred
		else console.log(data); // successful response

	});
}

HistoryBuilder.prototype.record = function(name, game, rating)
{
	var params = {
		Item: {
			userId: {S: name },
			gameId: {S: game },
			rating: {N: rating.toString() }
		},
		TableName: "DominionPlayerHistory"
	}
	
	this.dyn.putItem(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else     console.log(data);           // successful response
	});
}

HistoryBuilder.prototype.loadHistory = function(name, callback)
{
	var params = {
		TableName: 'DominionPlayerHistory',
		KeyConditionExpression: "userId = :userId",
		ExpressionAttributeValues:  
		{
			"userId" : {S: 'Dana'}
		}
	};
	
	this.dyn.query(params, function(err, data) {
		if (err) console.log(err); // an error occurred
		else 
		{
			console.log("GOOOOOOD Stuff");
			var retVal = []
			for(var i in data.Items)
			{
				var item = data.Items[i];
				console.log('----------');
				console.log(item);
				retVal.push({game : item.gameId, rating: item.rating})
			}
			callback(retVal);
		}
	});
}

module.exports = HistoryBuilder;