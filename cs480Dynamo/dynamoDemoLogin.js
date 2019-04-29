let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = function (event, context, callback) {

    
        ddb.get({
            TableName: 'users',
            Key: { 'username': event.username }
        }).promise().then(function (data) {
            if (event.password == data.Item.password) {
                callback(null, { "message": data.Item.authtoken });
            } else {
                callback(null, { "message": "bad password" + JSON.stringify(data) });
            }
        }).catch(function (err) {
    
            callback(null, { "message": "some weird error: " + err });
        });
        
/*
    ddb.query({
        TableName: 'users'
        , ExpressionAttributeValues: { ':username': 'TEST', ':favoriteFood': 'padThai' }, KeyConditionExpression: ' S :username and  S :favoriteFood', FilterExpression: 'password S :favoriteFood'
    }).promise().then(function (data) {
        //your logic goes here
    }).catch(function (err) {
        //handle error
    });


    ddb.query({
        TableName: 'users'
    }).promise().then(function (data) {

        callback(null, { "message": JSON.stringify(data) });
    }).catch(function (err) {
        //handle error
        callback(null, { "message": err });
    });

    */

    /*
        ddb.scan({
            TableName: 'users'
        }).promise().then(function (data) {
             callback(null, { "message": JSON.stringify(data)});
        }).catch(function (err) {
             callback(null, { "message": err});
        });
        */




}