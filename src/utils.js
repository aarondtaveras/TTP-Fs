/** 
 *  4/22/19 - Aaron D. Taveras, Lead Developer
 * 
 *  Miscellaneous functions to be consumed by higher level functions.
 * 
 */

const request = require('request-promise');
const url = "https://api.iextrading.com/1.0";

 // Tells us whether or not the entered stock is valid (exists)
async function isValidTicker(ticker){

}

async function getOpeningPrice(ticker){
    let response = await getQuote(ticker);
    if(response.open) return response.open;
    else throw new Error("Could not retrieve opening price for stock.");
}

async function getCurrentPrice(ticker){
    let response = await getQuote(ticker);
    if(response.latestPrice) return response.latestPrice;
    else throw new Error("Could not retrieve current price for stock.");
}


async function getQuote(ticker){
    var options = {
        method: 'GET',
        uri: url + "/stock/" + ticker + "/quote",
        json: true
    }
    let response = await request(options);
    if(response) return response;
    else throw new Error("Could not retrieve quote for stock.");
}

// This function returns a string that indicates what our stock's performance is:
// either:
// GREEN if current price > OPENING
// RED if current price < OPENING
// GREY if current price == OPENING
function getStockPerformance(ticker){
    if(getOpeningPrice(ticker)< getCurrentPrice(ticker)){return "RED";}
    else if(getOpeningPrice(ticker) > getCurrentPrice(ticker)){return "GREEN";}
    else return "GREY";
} 

 module.exports = {
    isValidTicker,
    getCurrentPrice,
    getOpeningPrice,
    getStockPerformance
 }