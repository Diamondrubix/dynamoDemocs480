let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    
 ddb.update({
    TableName: 'users',
     Key: { 'username': event.username},
    ReturnValues: 'ALL_NEW',
    ConditionExpression: 'attribute_exists(username)',
    UpdateExpression: 'set #songs = list_append(if_not_exists(#songs, :empty_list), :location)',
    ExpressionAttributeNames: {
      '#songs': 'songs'
    },
    ExpressionAttributeValues: {
      ':location': [event.song],
      ':empty_list': []
    }
  }).promise().then(function (data){
      callback(null, { "message": "Successfully executed" });
  }).catch(function(err){
      callback(null, { "message": "err: "+err});
  })





}


/*
   ddb.update({
        TableName: 'MusicUsers',
        Key: { 'Username': event.username, 'AuthToken': event.authtoken }
        , ExpressionAttributeValues: { ':songs': 'test' }
    }).promise().then(function (data) {
        //your logic goes here
    }).catch(function (err) {
        //handle error
    });
*/