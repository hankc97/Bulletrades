json.currentUser do 
    json.extract! current_user, :id, :first_name, :last_name, :buying_power
end

json.formatted_lifetime_trades @format_lifetime_trades

