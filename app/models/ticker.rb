# == Schema Information
#
# Table name: tickers
#
#  id          :bigint           not null, primary key
#  ticker      :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  description :string
#
class Ticker < ApplicationRecord
    validates :ticker, presence: true

    has_many :user_orders,
        foreign_key: :ticker_id,
        class_name: :UserOrder

    has_many :join_lists,
        foreign_key: :ticker_id,
        class_name: :JoinList

    has_many :watchlists, 
        through: :join_lists

    def self.update_ticker_watchlist_association(watchlist_ids_array, ticker_name)
        ticker = Ticker.find_by(ticker: ticker_name)
        all_associations = ticker.join_lists
        all_associations.each do |association|
            count = 0
            watchlist_ids_array.each_with_index do |id, index|
                if association.watchlist_id == id.to_i
                    count+=1
                    watchlist_ids_array.delete_at(index)
                end
            end
            if count == 0 
                association.delete
            end
        end
        watchlist_ids_array.each do |id|
            ticker.watchlists << Watchlist.find_by(id: id)
        end
    end

end
