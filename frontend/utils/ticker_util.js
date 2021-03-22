export const fetchAllTickers = () => {
    return $.ajax({
        method: "GET",
        url: 'api/tickers'
    })
}

