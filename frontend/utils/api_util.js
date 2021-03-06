const apiKey = "Tsk_6b961e8b1aa940d2a1bd1b56c08f54d8"

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

export const fetchAllQuotes = (tickerArr) => {
    return $.ajax({
        method: "GET",
        url: `https://sandbox.iexapis.com/stable/stock/market/batch?&types=price,intraday-prices&symbols=${tickerArr.join(',')}&token=${apiKey}`,
    })
}

