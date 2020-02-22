const AWS_CONFIG = require('./aws-config');



let AWS = require('aws-sdk');
let express = require('express');
let router = express.Router();


const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


AWS.config.update(AWS_CONFIG);

   let docClient = new AWS.DynamoDB.DocumentClient();

   let table = 'ally_users'


   
router.get('/', jsonParser, (req, res) => {

    let params = {
        TableName: table,
        Key: {
            PhoneNumber: 123
          }
    
    };
    
    docClient.get(params, function (err, data) {
        if (err) {
            console.log(err);
            handleError(err, res);
        } else {
            console.log(data.Item);
            handleSuccess(data.Item, res);
        }
     });
    });



    function handleError(err, res) {
        res.json({ 'message': 'server side error', statusCode: 500, error: 
        err });
    }
    
    function handleSuccess(data, res) {
        res.json({ message: 'success', statusCode: 200, data: data })
    }

    module.exports = {router};