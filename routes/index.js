require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var browsers = db.get('browsers');

router.post('/addBrowser', function(req,res,next){
  browsers.findOne({browser: req.body.browser, isMobile: req.body.isMobile}, function(err, doc){
    if(doc && doc.isMobile == req.body.isMobile){
      res.json(doc);
    } else{
      if (!doc) {
        browsers.insert({isMobile: req.body.isMobile, browser: req.body.browser}, function(err, doc){
          res.json(doc);
        })
      }
    }
  })
})

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
})

module.exports = router;
