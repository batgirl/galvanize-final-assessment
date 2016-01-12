var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');
var Stories = db.get('Stories');

router.get('/api/story', function(req, res) {
  Stories.find({}, function(err, docs) {
    res.json(docs);
  })
})

router.post('/api/story', function(req, res) {
  Stories.insert({ title: req.body.title, link: req.body.link, 
    image: req.body.image, summary: req.body.summary, 
    opinions: req.body.opinions }, function(err, docs) {
      res.json(docs);
  })
})

router.get('/api/story/:id', function(req, res) {
  Stories.findOne({ _id: req.params.id }, function(err, docs) {
    res.json(docs);
  })
})

router.post('/api/story/:id', function(req, res) {
  Stories.update({ _id: req.params.id }, { _id: req.params.id, title: req.body.title, link: req.body.link, 
    image: req.body.image, summary: req.body.summary, 
    opinions: req.body.opinions }, function(err, docs) {
    console.log("worked");
  })
})

router.get('*', function(req, res, next) {
  res.sendFile('public/index.html');
});

module.exports = router;
