let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    ddb.get({
        TableName: 'users',
        Key: { 'username': event.username }
    }).promise().then(function (data) {
        if (event.password == data.password) {
            callback(null, { "message": data.authtoken });
        } else {
            callback(null, { "message": "bad password" + JSON.stringify(data) });
        }
    }).catch(function (err) {

        callback(null, { "message": "some weird error: " + err });
    });




}