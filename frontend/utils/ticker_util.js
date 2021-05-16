export const fetchAllTickers = () => {
    return $.ajax({
        method: "GET",
        url: 'api/tickers'
    })
}

export const fetchUpdatedTickerWatchlistRelation = (_watchlist_id, ticker_name) => {
    return $.ajax({
        method: "PATCH",
        url: `api/tickers/${ticker_name}`,
        data: {_watchlist_id}
    })
}

export const fetchShowTickerWatchlistRelation = (ticker_name) => {
    return $.ajax({
        method: "GET",
        url: `api/tickers/${ticker_name}`,
    })
}