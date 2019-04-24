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

router.get('/:id/transactions', async(req,res) => {
  try{
    let user = await queries.getUser(req.params.id);
    if(user){
      let raw_trans = await queries.getTransactions(user.user_id);
      let _transactions = [];
      if(raw_trans.rowCount){
        _transactions = raw_trans.rows;
      }
      console.log(_transactions);
      res.render('transactions',{
          id: user.user_id,
          name: user.name,
          transactions: _transactions
        }); 
    }
  } catch(err){
    res.redirect('/s');
  }
});

router.post('/:id', async(req,res)=> {
  try{
    let can_buy = await queries.buyStock(req.params.id,req.body.ticker,req.body.quantity);
    res.redirect('back');
  } catch(err){
    res.render('error',{message:err});
  }
})

module.exports = router;
