var express = require('express');
var router = express.Router();

router.get('/random', function(req,res,next){
  res.json('HIIIIII');
})

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
})

module.exports = router;
