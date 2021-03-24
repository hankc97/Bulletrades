json.userOrder do    
    json.partial! 'api/user_orders/user_order', user_order: @user_order
end

json.currentUser do 
    json.extract! current_user, :id, :first_name, :last_name, :buying_power
end

