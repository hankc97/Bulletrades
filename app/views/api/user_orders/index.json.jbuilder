@user_orders.each do |user_order|
    json.set! user_order.ticker.ticker do
        json.partial! 'api/user_orders/user_order', user_order: user_order
    end
end