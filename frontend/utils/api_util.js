// import {apiKey, accessToken} from './secret'
const apiKey = "Tpk_762ae0e58c2447c3b0b13730886c4b6a"

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
    })
}

export const fetchSingleTickerKeyStat = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/${ticker}/stats?token=${apiKey}`
    })
}

export const fetchSingleTickerCompany = ticker => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable//stock/${ticker}/company?token=${apiKey}`
    })
}

export const fetchTickerQuotes = arrTickers => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${arrTickers}&types=quote,intraday-prices&token=${apiKey}`
    })
}

export const fetchHistoricalTickerQuote = (ticker, date) => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=chart&range=${date}&token=${apiKey}`
    })
}