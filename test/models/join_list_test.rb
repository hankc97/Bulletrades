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
require 'test_helper'

class JoinListTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
