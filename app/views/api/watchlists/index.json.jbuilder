json.watchlist @all_watchlists.each do |watchlist|
    json.id watchlist.id
    json.name watchlist.name
    watchlist_stocks = watchlist.tickers.map { |item| item.ticker}
    json.tickers watchlist_stocks
end