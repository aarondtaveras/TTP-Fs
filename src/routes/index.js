var express = require('express');
var router = express.Router();
var queries = require('../../db/queries');
var utils = require('../utils');


/* GET home page. */
router.get('/', async(req,res) => {
  res.render('index', { title: 'Stock App' });
});

router.post('/',async(req,res)=> {
  res.render('index', {title: 'Stock App'});

})

router.get('/register', async(req,res) => {
  res.render('register', {title: 'Stock App'})
})

module.exports = router;
