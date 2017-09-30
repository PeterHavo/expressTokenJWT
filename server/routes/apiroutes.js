const express = require("express");
const router = express.Router();
const User = require("../models/user");
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens






router.post('/autheticate', (req, res) => {
    User.find({name: req.body.name},
        (err, user) => {
            console.log('is user object', typeof(user))
            if(err)
            throw err.message
            if(!user){
                console.log('could not find any user')
            } else if (user){
                
                if(user.password  !== req.body.password) {
                    res.json({success: false, message:'authetication failed'})
                } else {
                    
                     var token = jwt.sign({_id : user._id, 
                      username: user.username, 
                      password: user.password
                     }, 'superSecret', {expiresIn: 604800});

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: 'JWT' + token,
          user:{username: user.name, spyUrl: 'spyUrl'}
        });
                    
                }
                
            }
            
            
        }
    )
    
})  


// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------

router.use((req, res, next) => {
    
    //check header body param for token
    var token = req.body.token || req.param.token || req.headers['x-access-token']
        
        if(token) {
             //decode token
            jwt.verify(token, 'superSecret', (err, decoded) => {
                if(err){
                    res.json({message: 'token is not correct'})
                } else {
                    req.decoded = decoded
                    next()
                }
                
            })
        } else {
            
            res.status(403).send({success: false, message: 'missing token'})
        }
    })

// ---------------------------------------------------------
// authenticated routes
// ---------------------------------------------------------

router.get('/', (req, res) => {
    res.json({message:'this is awesome api route'})
})

router.get('/users', (req, res) => {
  User.find({}, function(err, users) {
      if(err){
          console.log(err)
      }
    res.json(users);
  });
});


module.exports = router