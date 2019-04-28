let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    ddb.get({
        TableName: 'users',
        Key: { 'username': event.username }
    }).promise().then(function (data) {
        if(event.password == data.password){
            callback(null, { "message": data.authtoken });
        }else{
            allback(null, { "message": "bad password" });
        }
    }).catch(function (err) {
        
    callback(null, { "message": "some weird error: "+err });
    });



}