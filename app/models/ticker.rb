# == Schema Information
#
# Table name: tickers
#
#  id         :bigint           not null, primary key
#  ticker     :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Ticker < ApplicationRecord

    has_many :user_orders,
        foreign_key: :ticker_id,
        class_name: :UserOrder

    


end
