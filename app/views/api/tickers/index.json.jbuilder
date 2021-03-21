@tickers.each do |ticker|
    json.key_format! :upcase
    json.set! ticker.ticker do 
        json.extract! ticker, :id
    end
end