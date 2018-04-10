const router = require('express').Router();

// Connection avec google
router.get('/google',(req,res)=>{
 // handle with passport
    res.send('connection avec Google+')
});

// Connection avec Linkedin
router.get('/linkedin',(req,res)=>{
    // handle with passport
       res.send('connection avec Linkedin')
   });

   // Connection avec Twitter
router.get('/twitter',(req,res)=>{
    // handle with passport
       res.send('connection avec Twitter')
   });

   // Connection avec Facebook
router.get('/facebook',(req,res)=>{
    // handle with passport
       res.send('connection avec Facebook')
   });

module.exports = router