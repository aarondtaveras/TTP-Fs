var express = require('express');
var router = express.Router();
var queries = require('../../db/queries');
var utils = require('../utils');

/* GET users listing. */
router.get('/:id', async(req,res) => {
  try{
    let user = await queries.getUser(req.params.id);
    if(user){
      let raw_stocks = await queries.getOwnedStocks(user.user_id);
      let stocks = [];
      if(raw_stocks.rowCount){
        stocks = raw_stocks.rows;
      }
      res.render('portfolio',{
          id: user.user_id,
          name: user.name,
          balance: user.balance,
          owned_stocks: stocks
        }); 
    }
  } catch(err){
    res.redirect('/');
  }
});

module.exports = router;
