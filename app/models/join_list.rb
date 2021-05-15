# == Schema Information
#
# Table name: join_lists
#
#  id           :bigint           not null, primary key
#  watchlist_id :integer          not null
#  ticker_id    :integer          not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class JoinList < ApplicationRecord
    belongs_to :tickers,
        foreign_key: :ticker_id,
        class_name: :Ticker
    
    belongs_to :watchlists, 
        foreign_key: :watchlist_id,
        class_name: :Watchlist
end
