@tickers.each do |ticker|
    json.array! [[ticker.ticker, ticker.description]]
end