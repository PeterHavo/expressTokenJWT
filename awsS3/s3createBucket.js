var AWS = require("aws-sdk")
AWS.loadFromPath('./config.json')

let s3 = new AWS.S3({apiVersion: '2006-03-01'});

// Create the parameters for calling createBucket
var bucketParams = {
   Bucket : process.argv[2]
};   


 // Call S3 to create the bucket
s3.createBucket(bucketParams, function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Success", data.Location);
   }
});