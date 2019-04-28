let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    var randomToken = sha1(Math.random());

    ddb.put({
        TableName: 'users',
        Item: { 
            'username': event.username,
            'password': event.password,
            'authtoken': randomToken}
    }).promise().then(function (data) {
        callback(null, { "message": "user: "+event.username+" pass "+event.password+" returned data: "+data });
        //your logic goes here
    }).catch(function (err) {
        callback(null, { "message": "something went wrong "+err });
        //handle error
    });

    



}