var express = require('express');
var router = express.Router();
var queries = require('../../db/queries');
var utils = require('../utils');


/* GET home page. */
router.get('/', async(req,res) => {
  res.render('index', { title: 'Stock App' });
});

router.post('/',async(req,res)=> {
  try{
    let response = await queries.loginUser(req.body);
  } catch(err){
    res.render('/',{title: err})
  }
  res.render('index', {title: 'Stock App'});
})

router.get('/register', async(req,res) => {
  res.render('register', {title: 'Stock App'})
})

router.post('/register', async(req,res)=> {
  try {
    let response = await queries.createUser(req.body);
  } catch(err){
    res.render('register', {title: err});
  }
  res.redirect('/');
})

module.exports = router;
