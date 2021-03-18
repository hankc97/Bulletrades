# == Schema Information
#
# Table name: user_orders
#
#  id                 :bigint           not null, primary key
#  user_id            :integer          not null
#  ticker_id          :integer          not null
#  quantity           :float            not null
#  stocks_owned_array :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#
class UserOrder < ApplicationRecord
    # add default quantity: 0 

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to :ticker, 
        foreign_key: :ticker_id,
        class_name: :Ticker
    



end
