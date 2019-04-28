let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    callback(null, { "message": "Successfully executed" });


    ddb.put({
        TableName: 'users',
        Item: { 'username': event.username, 'password': event.password }
    }).promise().then(function (data) {
        //your logic goes here
    }).catch(function (err) {
        //handle error
    });

    



}