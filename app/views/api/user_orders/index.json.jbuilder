@current_user_orders.each do |user_order|
    json.array! [[user_order[0].ticker, user_order[1]]]
end