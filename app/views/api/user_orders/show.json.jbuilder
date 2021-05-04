json.userOrder do    
    @current_user_single_order.each do |order|
        json.array! [[order.avg_ticker_price, order.quantity]]
    end 
end

json.currentUser do 
    json.extract! current_user, :id, :first_name, :last_name, :buying_power
end

