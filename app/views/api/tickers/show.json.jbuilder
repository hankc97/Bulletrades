
json.allWatchlists @all_watchlists.each do |watchlist|
    json.id watchlist.id
    json.name watchlist.name
    json.numberOfItemsInList watchlist.tickers.count
end

json.checkWatchlistsForCurrentTicker do
    @checked_watchlists.each do |checked|
        json.array! [checked.id]
    end
end