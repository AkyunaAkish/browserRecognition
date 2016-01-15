require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var browsers = db.get('browsers');

router.get('/getBrowsers', function(req,res,next){
  browsers.find({}, function(err, docs){
    res.json(docs);
  })
})

router.post('/addBrowser', function(req,res,next){
  browsers.findOne({browser: req.body.browser}, function(err, doc){
    if(doc && doc.isMobile == req.body.isMobile){
      res.json({exists: true});
    } else{
      browsers.insert({isMobile: req.body.isMobile, browser: req.body.browser}, function(err, doc){
        res.json('Inserted document', doc);
      })
    }
  })
})

router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  })
})

module.exports = router;
