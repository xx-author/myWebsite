var express = require('express');
const req = require('express/lib/request');
var router = express.Router();
var helper = require('../helper/saveResponse')

const verifyLogin = ((req,res,next)=>{
  if(req.session.loggedIn){
    next()
  }else{
    res.redirect('/admin')
  }
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/admin')
});

router.post('/login',(req,res,next)=>{
  console.log(req.body)
  //helper.sample(req.body).then()
 helper.loginCheck(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true
      req.session.user = response.user
      helper.getMessages().then((data)=>{
        console.log(data)
        res.render('admin/table',{data})
      })
      
    }else{
      let message = response.message
      res.render('admin/admin',{message})
    }
  })
 
})

router.get('/logout',(req,res)=>{
  req.session.destroy()
  res.redirect('/admin')
})


module.exports = router;
    