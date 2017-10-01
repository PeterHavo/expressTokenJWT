// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create S3 service object
let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// set the parameters for S3.getBucketCors
var bucketParams = {Bucket: process.argv[2]};

// call S3 to retrieve CORS configuration for selected bucket
s3.getBucketCors(bucketParams, function(err, data) {
  if (err) {
    console.log(err);
  } else if (data) {
    console.log(JSON.stringify(data.CORSRules));
    console.log('-------------', data.CORSRules)
  }
});