var express = require('express');
var router = express.Router();
var queries = require('../../db/queries');
var utils = require('../utils');


/* GET home page. */
router.get('/', async(req,res) => {
  res.render('index', { title: 'Stock App' });
});

// Login function
router.post('/',async(req,res)=> {
  try {
    let response = await queries.loginUser(req.body);
    if(response.message) res.redirect('/users/' + response.message);
  } catch(err){
    res.render('error',{message: err})
  }
})

// Get registration page
router.get('/register', async(req,res) => {
  res.render('register', {title: 'Stock App'})
})

// Registration function
router.post('/register', async(req,res)=> {
  try {
    let response = await queries.createUser(req.body);
    if(response.message) res.redirect('/');
  } catch(err){
    res.render('error', {message: err});
  }
})


module.exports = router;
