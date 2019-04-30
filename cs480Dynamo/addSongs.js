let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    
    ddb.update({
        TableName: 'MusicUsers',
        ReturnValues: 'ALL_NEW',
        Key: { 'Username': event.username, 'AuthToken': event.authtoken }
        , ExpressionAttributeValues: { ':songs': 'test' }
    }).promise().then(function (data) {
        //your logic goes here
    }).catch(function (err) {
        //handle error
    });

function appendMarkedLocation (personId, location) {
  return DB.update({
    TableName: 'people',
    Key: { id: personId },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'set #songs = list_append(if_not_exists(#songs, :empty_list), :location)',
    ExpressionAttributeNames: {
      '#songs': 'songs'
    },
    ExpressionAttributeValues: {
      ':location': [location],
      ':empty_list': []
    }
  }).promise().then(function (data){
      callback(null, { "message": "Successfully executed" });
  }).catch(function(err){
      callback(null, { "message": "err: "+err });
  })
}

appendMarkedLocation(event.username, event.song).then(console.log)


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