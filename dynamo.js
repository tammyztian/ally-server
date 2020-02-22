const AWS_CONFIG = require('./aws-config');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();


let AWS = require('aws-sdk');
let express = require('express');
let router = express.Router();

AWS.config.update(AWS_CONFIG);

   let docClient = new AWS.DynamoDB.DocumentClient();

   let table = 'Users'


   
router.get('/:phoneNumber', jsonParser,(req, res,next) => {

    let params = {
        TableName: table,
        Key: {
            PhoneNumber: req.params.phoneNumber
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


router.put('/addContacts',jsonParser, (req, res,next) => {
    console.log(`addContacts hit`);
    console.log(`this is request`, req);

  let { phoneNumber, firstName, lastName, contacts} = req.body;

var item = {
 PhoneNumber : phoneNumber,
  UserFirstName : firstName,
   UserLastName : lastName,
 contacts : contacts

 }

   var params = {
                    TableName: table,
                    Item : item
                };

     docClient.put(params, function(err, data) {
           if (err) {
                       console.log(err);
                       handleError(err, res);
                   } else {
                       console.log(data.Item);
                       handleSuccess(data.Item, res);
                   }
        });

    });


router.post('/register',jsonParser, (req, res,next) => {

    console.log(`register hit`);
    console.log(`this is request`, req);

  let { phoneNumber, firstName, lastName } = req.body;

var item = {
 PhoneNumber : phoneNumber,
  UserFirstName : firstName,
  UserLastName : lastName

 }

   var params = {
                    TableName: table,
                    Item : item
                };

     docClient.put(params, function(err, data) {
           if (err) {
                       console.log(err);
                       handleError(err, res);
                   } else {
                       console.log(data.Item);
                       handleSuccess(data.Item, res);
                   }
        });

    });

router.get('/:phoneNumber', (req, res) => {

    let params = {
        TableName: table,
        Key: {
            PhoneNumber: req.params.phoneNumber
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