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
const Pool = require('pg'),
    utils = require('../src/utils');

const pool = new Pool({
    user: 'aaron',
    host: 'localhost',
    database: 'ttp',
    password: 'password'
})


module.exports = {
    getUser,
    getTransactions,
    getOwnedStocks,  
    createUser,
    loginUser,
    updateUserBalances,
    updateUserEmail,
    updateUserPassword
}