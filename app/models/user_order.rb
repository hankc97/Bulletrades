# == Schema Information
#
# Table name: user_orders
#
#  id               :bigint           not null, primary key
#  user_id          :integer          not null
#  ticker_id        :integer          not null
#  quantity         :float            default(0.0), not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  avg_ticker_price :float            default(0.0), not null
#
class UserOrder < ApplicationRecord
    # add default quantity: 0 
    validates :user_id, :ticker_id, :quantity, :avg_ticker_price, presence: true

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
    
    belongs_to :ticker, 
        foreign_key: :ticker_id,
        class_name: :Ticker
    

end
