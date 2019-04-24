/** 
 *  4/22/19 - Aaron D. Taveras, Lead Developer
 * 
 *  Querying functions to be performed on our database. The queries defined here
 *  will be called within our routing functions in order to perform the necessary
 *  database operations. 
 * 
 *  The general approach is to start almost atomically, and to build incrementally.
 *  This will allow us to perform complex queries in a simplified manner.
 * 
 */
const { Pool } = require('pg'),
    utils = require('../src/utils');

const pool = new Pool({
    user: 'aaron',
    host: 'localhost',
    database: 'ttp',
    password: 'adt62497'
})

async function getUser(id){
    var query = {
        text: 'SELECT * FROM users WHERE user_id=$1',
        values: [id]
    }
    let res = await pool.query(query);
    if(!res.rowCount){
        throw new Error("User not found");
    }
    return res.rows[0];
}

async function getTransactions(id){
    var query = {
        text: 'SELECT * FROM transactions WHERE user_id=$1',
        values: [id]
    }
    try{
        let res = await pool.query(query);
    } catch(err){
        throw new Error(err);
    }
    return await pool.query(query);
}

async function getOwnedStocks(id){
    var query = {
        text: 'SELECT * FROM owned_stock WHERE user_id=$1',
        values: [id]
    }
    try{
        let res = await pool.query(query);
    } catch(err){
        throw new Error(err);
    }
    return await pool.query(query);
}

async function createUser(body){
    // Our database has a unique constraint on our emails, so if there are duplicates we will catch the error and throw a new one.
    var query = {
        text: 'INSERT INTO users(name,password,email) VALUES($1,$2,$3)',
        values: [body.name,body.password,body.email]
    }
    try {
        let res = pool.query(query);
    } catch(err){
        console.log("err caught");
    }
    
    return {message: "Success!"};
}

// Log the user in by checking for the correct username and password.
async function loginUser(body){
    var query = {
        text: 'SELECT * from users WHERE email=$1 AND password=$2',
        values: [body.email,body.password]
    }
    let res = await pool.query(query);
    if(!res.rowCount){
        throw new Error("Invalid email/password.");
    }
    return {message: res.rows[0].user_id.toString()};
    // console.log("return fired");
}


// User balances can only decrease since we do not allow for selling of stock yet.
async function updateUserBalances(id, ticker,quantity){
    let price = await utils.getCurrentPrice(ticker);
    let amount = price * quantity;
    let user = await getUser(id);
    if(amount > user.balance) throw new Error("You don't have enough money!");
    var query = {
        text: 'UPDATE users SET balance=balance-$1 WHERE user_id=$2',
        values: [amount,id]
    }
    pool.query(query)
    .catch(e => {
        throw new Error(e);
    })
    return {message: "Success!"};
}

async function addTransaction(id,ticker,quantity){
    // business logic for retrieving price of stock
    let price = await utils.getCurrentPrice(ticker);
    var query = {
        text: 'INSERT INTO transactions(user_id, ticker,quantity,price) VALUES($1,$2,$3,$4)',
        values: [id,ticker,quantity,price]
    }
    pool.query(query)
    .catch(e => {
        throw new Error(e);
    })
    return {message: "Success!"};
}

async function addStockToPorfolio(id,ticker,quantity){
    var query = {
        text: 'INSERT INTO owned_stock(user_id,ticker,quantity) VALUES($1,$2,$3)',
        values: [id,ticker,quantity]
    }
    pool.query(query)
    .catch(e => {
        throw new Error(e);
    })
    return {message: "Success!"};
}

// Export function that we will use to buy the stock in one go. Uses several helper functions to accomplish its task.
async function buyStock(id, ticker, quantity){
    try {
        let success = await Promise.all([
           updateUserBalances(id,ticker,quantity), // First see if the balances can update correctly
           addTransaction(id,ticker,quantity), // Then we add the transaction to our DB 
           addStockToPorfolio(id,ticker,quantity) // Then we add the stock to the user's portfolio
        ]);
    } catch (err) {
        throw new Error(err);
    }
    
    return {message: "Success!"};
}

module.exports = {
    getUser,
    getTransactions,
    getOwnedStocks,  
    createUser,
    loginUser,
    buyStock
}