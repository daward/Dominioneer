/*jslint node: true */
/*jslint plusplus: true */
'use strict';

var History = require('./history.js');

var HistoryBuilder = function (database) {
	this.database = database;
	this.histories = [];
	this.tableName = "DominionPlayerHistory";
};

HistoryBuilder.prototype.getAll = function (names, callback) {
	var me = this;
	
	var gameFetch = function(names, index, retVal, cont, callback) {
		if(index < names.length) {
			me.get(names[index], function(history) {
				retVal.push(history);
				index++;
				cont(names, index, retVal, cont, callback);
			});
		} else {
			callback(retVal);
		}
	};
	
	gameFetch(names, 0, [], gameFetch, callback);
}

HistoryBuilder.prototype.get = function (name, callback) {
	var retVal = this.histories[name], me = this;

	// we already know about this history, so we can just send it back
	if (retVal) {
		callback(retVal);
	} else {
		this.loadHistory(name, function (data) {
			var retVal = new History(
				name,
				data,
				function (name, game, rating) {
					me.record(name, game, rating);
				}
			);

			me.histories[name] = retVal;

			// once loaded it can be sent back
			callback(retVal);
		});
	}
};

HistoryBuilder.prototype.setupDb = function () {
	var me = this;
	if (!this.database) { throw "No database provided to setup"; }

	this.database.listTables({}, function (err, data) {
		var tableName, found = false;
		if (err) {
			console.log(err);
		} else {
			for (tableName in data.TableNames) {
				if (data.TableNames[tableName] === me.tableName) {
					found = true;
					break;
				}
			}

			if (!found) {
				console.log("Creating the tables");
				me.createGameStorage();
			}
		}
	});
};

HistoryBuilder.prototype.createGameStorage = function () {
	var params = {
		TableName: this.tableName,
		KeySchema: [ // The type of of schema.  Must start with a HASH type, with an optional second RANGE.
			{ // Required HASH type attribute
				AttributeName: 'userId',
				KeyType: 'HASH'
			},
			{ // Required HASH type attribute
				AttributeName: 'gameId',
				KeyType: 'RANGE'
			}
		],
		AttributeDefinitions: [ // The names and types of all primary and index key attributes only
			{
				AttributeName: 'userId',
				AttributeType: 'S'
			},
			{
				AttributeName: 'gameId',
				AttributeType: 'S'
			}

			// ... more attributes ...
		],
		ProvisionedThroughput: { // required provisioned throughput for the table
			ReadCapacityUnits: 1,
			WriteCapacityUnits: 1
		}
	};

	this.database.createTable(params, function (err, data) {
		if (err) {
			console.log(err);
		} else {
			console.log(data);
		}
	});
};

HistoryBuilder.prototype.record = function (name, game, rating) {
	// if no database was provided, then we don't need to do anything
	if (this.database) {
		var params = {
			Item: {
				userId: {S: name },
				gameId: {S: game },
				rating: {N: rating.toString() }
			},
			TableName: this.tableName
		};

		this.database.putItem(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				console.log(data);
			}
		});
	}
};

HistoryBuilder.prototype.loadHistory = function (name, callback) {
	
	if (!this.database) { callback([]); return; }

	var params = {
		TableName: this.tableName,
		KeyConditions: {
			userId: {
				ComparisonOperator: 'EQ',
				AttributeValueList: [{S: name}]
			}
		}
	};

	this.database.query(params, function (err, data) {
		var i, retVal = [];
		if (err) {
			console.log(err);
		} else {
			for (i = 0; i < data.Items.length; i++) {
				retVal.push({game : data.Items[i].gameId, rating: data.Items[i].rating.N});
			}
			callback(retVal);
		}
	});
};

module.exports = HistoryBuilder;