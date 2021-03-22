// import {apiKey, accessToken} from './secret'
const apiKey = "Tpk_0f8b8964750d4e3bb1dd782eef66d578"

// export const fetchSingleTickerQuote = ticker => (
//     $.ajax({
//         method: "GET",
//         url: `https://api.tdameritrade.com/v1/marketdata/${ticker}/quotes?apikey=${apiKey}`,
//         headers: {
//             "Authorization": `Bearer ${accessToken}`
//         }
//     })
// )

export const fetchSingleTickerQuote = (ticker) => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/batch?types=quote,intraday-prices&token=${apiKey}`
    });
};