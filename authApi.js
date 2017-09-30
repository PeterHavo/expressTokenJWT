/* Generate the secret signing key
1 Authenticate the user
2 Prepare the claims
3 Generate the token
4 Send the token to the client */
 
 //1
 /*
 To be secure, we want to sign our tokens with a secret signing key. This key should be kept confidential and only accessible to your server. It should be highly random and not guessable. In our example, we’ll use the node-uuid library to create a random key for us:
 */
 
 
 let uuid = require("node-uuid")
 let secretkey = uuid.v4().split("-", 2)[0]
 
 