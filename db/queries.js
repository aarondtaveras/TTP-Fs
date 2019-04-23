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
    pool.query(query)
    .catch(e => {
        throw new Error(e);
    })
    return {message: "Success!"};
}

async function getTransactions(id){

}

async function getOwnedStocks(id){

}

async function createUser(body){
    // Our database has a unique constraint on our emails, so if there are duplicates we will catch the error and throw a new one.
    var query = {
        text: 'INSERT INTO users(name,password,email) VALUES($1,$2,$3)',
        values: [body.name,body.password,body.email]
    }
    pool.query(query)
    .catch(e => {
        throw new Error(e);
    });
    return {message: "Success!"};
}

// Log the user in by checking for the correct username and password.
async function loginUser(body){
    let msg = "Success!";
    var query = {
        text: 'SELECT * from users WHERE email=$1 AND password=$2',
        values: [body.email,body.password]
    }
    pool.query(query)
    .then(res => {
        if(!res.rowCount){
            msg = "Invalid email/password.";
            // throw new Error("Invalid email/password.");
        }
    })
    return {message: msg};
}

// User balances can only decrease since we do not allow for selling of stock yet.
async function updateUserBalances(id, amount){
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

async function buyStock(id, ticker, quantity){

}

module.exports = {
    getUser,
    getTransactions,
    getOwnedStocks,  
    createUser,
    loginUser,
    updateUserBalances,
    buyStock
}