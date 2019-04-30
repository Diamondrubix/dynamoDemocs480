let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    

    ddb.query({
        TableName: 'users'
        , ExpressionAttributeValues: { ':username': event.username }
    }).promise().then(function (data) {
        callback(null, { "message": data.Item.songs });
    }).catch(function (err) {
        callback(null, { "message": "some weird error: " + err });
    });



}