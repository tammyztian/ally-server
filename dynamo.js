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
                   }
        });
        // add subscriptions
        var sns = new AWS.SNS();

         params = {
          Protocol: 'SMS',
          TopicArn: 'arn:aws:sns:us-east-1:121394995974:'+ firstName + '-' + lastName,
          Endpoint: '+19522612290',
          ReturnSubscriptionArn: true
        };
        sns.subscribe(params, function(err, data) {
          if (err) {
                                                console.log(err);
                                                handleError(err, res);
                                            } else {
                                                console.log("created Topic");
                                                handleSuccess(data.Item, res);
                                            }
        });

    });


router.post('/register',jsonParser, (req, res,next) => {

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
                   }
        });

        //  subscribe them to corresponding topic
        var sns = new AWS.SNS();

                 params = {
                  Name: firstName + '-' +lastName

                };
                sns.createTopic(params, function(err, data) {
                 if (err) {
                                       console.log(err);
                                       handleError(err, res);
                                   } else {
                                       console.log("created Topic");
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



router.get('/publishMessage/:firstName/:LastName', (req, res) => {

   var params = {
     Message: 'I am in trouble please help me',
     TopicArn: 'arn:aws:sns:us-east-1:121394995974:'+ req.params.firstName + '-' + req.params.LastName
   };

   var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

   // Handle promise's fulfilled/rejected states
   publishTextPromise.then(
     function(data) {
       console.log(`Message ${params.Message} send sent to the topic ${params.TopicArn}`);
       console.log("MessageID is " + data.MessageId);
        handleSuccess(data, res);

     }).catch(
       function(err) {
       console.error(err, err.stack);
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