@current_user_single_order.each do |order|
    json.array! [[order.avg_ticker_price, order.quantity]]
end 
