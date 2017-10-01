//Displaying a List of Amazon S3 Buckets

require('dotenv').config()
var AWS = require("aws-sdk")
// Load credentials and set region from JSON file
AWS.config.loadFromPath('./config.json');

// Create S3 service object
let s3 = new AWS.S3({apiVersion: '2006-03-01'});
                    
// Call S3 to list current buckets
s3.listBuckets(function(err, data) {
   if (err) {
      console.log("Error", err);
   } else {
      console.log("Bucket List", data.Buckets);
   }
});

