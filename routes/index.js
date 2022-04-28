var express = require('express');
var router = express.Router();
var helper = require('../helper/saveResponse')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('user/index');

});

router.post('/',(req,res,next)=>{
  console.log(req.body)
 helper.loadMessage(req.body).then(()=>{
   res.render('user/index',{message:true})
 })
})

module.exports = router;
    