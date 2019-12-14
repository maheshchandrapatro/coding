var express = require('express');
var router = express.Router();
var UserService=require('../services/user');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',(req,res,next) =>{
  console.log("frff")
  UserService.register(req.body, (err,result)=>{
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
})
router.post('/login',(req,res,next) =>{
  UserService.login(req.body, (err,result)=>{
    if(err){
      res.send(err);
    }else{
      res.send(result);
    }
  })
})

module.exports = router;
