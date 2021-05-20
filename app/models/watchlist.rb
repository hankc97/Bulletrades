# == Schema Information
#
# Table name: watchlists
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Watchlist < ApplicationRecord
    validates :name, :user_id, presence: true
    validates_uniqueness_of :name, :scope => :user_id

    belongs_to :user,
        foreign_key: :user_id,
        class_name: :User
    
    has_many :join_lists,
        foreign_key: :watchlist_id,
        class_name: :JoinList

    has_many :tickers, 
        through: :join_lists
end
